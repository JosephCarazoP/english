/* ── FLASHCARD STATE ── */
let deck = [];
let cursor = 0;
let isFlipped = false;
let correct = 0;
let skipped = 0;
let currentFilter = "all";

/* ── PRÁCTICA DE ERRORES (round) ── */
let skippedDeck = [];   // verbos marcados como skipped en la ronda actual
let practiceMode = false; // true cuando estamos repasando los skipped
let originalDeckLen = 0;     // tamaño del mazo original (para el resumen final)

/* ── HELPERS ── */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function colorIdx(verb) { return ALL_VERBS.indexOf(verb) % 10; }

/* Audio playback speed (1 = normal). Persisted across the session. */
let currentSpeed = 1;
let preferredEnglishVoice = null;

function refreshSpeechVoices() {
  if (!("speechSynthesis" in window)) return [];
  const voices = window.speechSynthesis.getVoices() || [];
  preferredEnglishVoice = chooseEnglishVoice(voices);
  return voices;
}

function chooseEnglishVoice(voices) {
  const englishVoices = voices.filter(voice => /^en([-_]|$)/i.test(voice.lang || ""));
  if (!englishVoices.length) return null;

  const preferredNameParts = [
    "natural", "neural", "premium", "enhanced",
    "google us english", "google uk english",
    "microsoft jenny", "microsoft aria", "microsoft guy",
    "samantha", "alex", "daniel", "karen"
  ];

  return englishVoices
    .map(voice => {
      const name = (voice.name || "").toLowerCase();
      const lang = (voice.lang || "").toLowerCase();
      let score = 0;
      preferredNameParts.forEach((part, idx) => {
        if (name.includes(part)) score += 50 - idx;
      });
      if (lang === "en-us") score += 18;
      if (lang.startsWith("en-us")) score += 12;
      if (lang.startsWith("en-gb")) score += 8;
      if (voice.localService === false) score += 5;
      if (name.includes("zira") || name.includes("david")) score -= 8;
      return { voice, score };
    })
    .sort((a, b) => b.score - a.score)[0].voice;
}

if ("speechSynthesis" in window) {
  refreshSpeechVoices();
  window.speechSynthesis.onvoiceschanged = refreshSpeechVoices;
}

function resolveSpeechRate(speedValue, kind) {
  const speed = parseFloat(speedValue);
  const isSentence = kind === "sentence";
  if (speed <= 0.55) return isSentence ? 0.42 : 0.28;
  if (speed <= 0.75) return isSentence ? 0.48 : 0.34;
  if (speed >= 1.15) return isSentence ? 1.14 : 1.18;
  return isSentence ? 0.88 : 0.9;
}

function prepareSpeechText(text, kind) {
  const cleaned = String(text || "")
    .replace(/\s*\/\s*/g, " or ")
    .replace(/\s+/g, " ")
    .trim();
  if (!cleaned) return "";
  if (kind === "sentence" || /[.!?]$/.test(cleaned)) return cleaned;
  return `${cleaned}.`;
}

/**
 * Speak a phrase using the Web Speech API.
 *  - text: string to read
 *  - opts.rate: "normal" | "slow" | number (overrides currentSpeed)
 *  - opts.lang: BCP-47 (defaults to en-US)
 */
function speakVerb(text, opts) {
  if (!("speechSynthesis" in window) || !text) return null;
  opts = opts || {};
  const kind = opts.kind || "word";
  const speechText = prepareSpeechText(text, kind);
  if (!speechText) return null;

  let rate;
  if (typeof opts.rate === "number") {
    rate = opts.rate;
  } else if (opts.rate === "slow") {
    rate = kind === "sentence" ? 0.42 : 0.28;
  } else {
    rate = resolveSpeechRate(currentSpeed, kind);
  }
  // Web Speech rate is clamped 0.1–2. Stay in safe range.
  rate = Math.min(2, Math.max(0.18, rate));

  const utter = new SpeechSynthesisUtterance(speechText);
  utter.lang = opts.lang || "en-US";
  utter.rate = rate;
  utter.pitch = kind === "sentence" ? 1.02 : 1.04;
  utter.volume = 1;

  const voice = preferredEnglishVoice || refreshSpeechVoices().find(v => /^en([-_]|$)/i.test(v.lang || ""));
  if (voice) utter.voice = voice;

  window.speechSynthesis.cancel();
  window.speechSynthesis.resume();
  window.speechSynthesis.speak(utter);
  return utter;
}

/* Strip simple HTML to get clean text for TTS (removes <b>, etc.) */
function stripHtml(html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html || "";
  return (tmp.textContent || tmp.innerText || "").trim();
}

function hideSwipeGhosts() {
  const ok = document.getElementById("qGhostOk");
  const no = document.getElementById("qGhostNo");
  if (ok) { ok.style.opacity = "0"; ok.textContent = ""; }
  if (no) { no.style.opacity = "0"; no.textContent = ""; }
}

function hideActions() {
  document.getElementById("actions").classList.remove("visible");
}

/* ── SHARE RESULTS ── */
function showShareToast(msg) {
  const toast = document.getElementById("shareToast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showShareToast._t);
  showShareToast._t = setTimeout(() => toast.classList.remove("show"), 2600);
}

function buildShareText(kind) {
  const url = (typeof location !== "undefined" && location.href) ? location.href.split("#")[0] : "";
  if (kind === "quiz") {
    const total = quizOriginalTotal || quizQuestions.length || 0;
    const pct = total ? Math.round((quizOk / total) * 100) : 0;
    const emoji = pct >= 90 ? "🏆" : pct >= 70 ? "🎉" : pct >= 50 ? "💪" : "📚";
    return (
      `${emoji} Verb Flashcards – Final Quiz\n` +
      `✅ Correct: ${quizOk}/${total}\n` +
      `❌ Wrong:   ${quizNo}/${total}\n` +
      `🎯 Score:   ${pct}%\n` +
      (url ? `\nTry it: ${url}` : "")
    );
  }
  // round complete (flashcards)
  const total = originalDeckLen || deck.length || 0;
  const pct = total ? Math.round((correct / total) * 100) : 0;
  const emoji = pct >= 80 ? "🎉" : pct >= 50 ? "💪" : "📚";
  return (
    `${emoji} Verb Flashcards – Round complete!\n` +
    `📚 Learned: ${correct}/${total}\n` +
    `⏭️ Skipped: ${skipped}/${total}\n` +
    `🎯 Mastery: ${pct}%\n` +
    (url ? `\nTry it: ${url}` : "")
  );
}

function getShareStats(kind) {
  if (kind === "quiz") {
    const total = quizOriginalTotal || quizQuestions.length || 0;
    const pct = total ? Math.round((quizOk / total) * 100) : 0;
    return {
      kind,
      title: "Final Quiz",
      subtitle: "Verb Flashcards",
      primaryLabel: "Score",
      primaryValue: pct,
      leftLabel: "Correct",
      leftValue: quizOk,
      rightLabel: "Wrong",
      rightValue: quizNo,
      total,
      accent: "#7c5cfc",
      accent2: "#0dbfa0",
      warning: "#f43f5e",
    };
  }

  const total = originalDeckLen || deck.length || 0;
  const pct = total ? Math.round((correct / total) * 100) : 0;
  return {
    kind,
    title: "Round Complete",
    subtitle: "Verb Flashcards",
    primaryLabel: "Mastery",
    primaryValue: pct,
    leftLabel: "Learned",
    leftValue: correct,
    rightLabel: "Skipped",
    rightValue: skipped,
    total,
    accent: "#ff6b35",
    accent2: "#7c5cfc",
    warning: "#9a9690",
  };
}

function canvasRoundRect(ctx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function canvasFillRoundRect(ctx, x, y, w, h, r, fill) {
  canvasRoundRect(ctx, x, y, w, h, r);
  ctx.fillStyle = fill;
  ctx.fill();
}

function canvasStrokeRoundRect(ctx, x, y, w, h, r, stroke, lineWidth) {
  canvasRoundRect(ctx, x, y, w, h, r);
  ctx.strokeStyle = stroke;
  ctx.lineWidth = lineWidth || 1;
  ctx.stroke();
}

function drawCenteredText(ctx, text, x, y, maxWidth, fontSize, weight, color) {
  let size = fontSize;
  do {
    ctx.font = `${weight || 700} ${size}px "DM Sans", Arial, sans-serif`;
    if (ctx.measureText(text).width <= maxWidth || size <= 18) break;
    size -= 2;
  } while (size > 18);
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
}

function canvasShadow(ctx, color, blur, offsetY) {
  ctx.shadowColor = color;
  ctx.shadowBlur = blur;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = offsetY || 0;
}

function drawFittedText(ctx, text, x, y, maxWidth, fontSize, weight, color, align) {
  let size = fontSize;
  do {
    ctx.font = `${weight || 700} ${size}px "DM Sans", Arial, sans-serif`;
    if (ctx.measureText(text).width <= maxWidth || size <= 20) break;
    size -= 2;
  } while (size > 20);
  ctx.fillStyle = color;
  ctx.textAlign = align || "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(text, x, y);
}

function drawSharePill(ctx, x, y, w, h, text, fill, color, align) {
  canvasFillRoundRect(ctx, x, y, w, h, h / 2, fill);
  ctx.fillStyle = color;
  ctx.font = '800 22px "DM Mono", Consolas, monospace';
  ctx.textAlign = align || "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text.toUpperCase(), align === "left" ? x + 28 : x + w / 2, y + h / 2 + 1);
}

function drawShareMetricCard(ctx, x, y, w, h, label, value, color, note) {
  ctx.save();
  canvasShadow(ctx, "rgba(26,25,22,0.08)", 22, 10);
  canvasFillRoundRect(ctx, x, y, w, h, 30, "#ffffff");
  ctx.restore();
  canvasStrokeRoundRect(ctx, x, y, w, h, 30, "rgba(26,25,22,0.08)", 2);
  canvasFillRoundRect(ctx, x + 22, y + 24, 10, h - 48, 999, color);

  ctx.fillStyle = "#1a1916";
  ctx.font = '900 60px "DM Sans", Arial, sans-serif';
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(String(value), x + 56, y + 78);
  ctx.fillStyle = "#7a756d";
  ctx.font = '800 22px "DM Mono", Consolas, monospace';
  ctx.fillText(label.toUpperCase(), x + 58, y + 116);
  if (note) {
    ctx.fillStyle = "#9a9690";
    ctx.font = '600 20px "DM Sans", Arial, sans-serif';
    ctx.fillText(note, x + 58, y + 148);
  }
}

function drawShareLogo(ctx, x, y, size, accent, accent2) {
  const logoGrad = ctx.createLinearGradient(x, y, x + size, y + size);
  logoGrad.addColorStop(0, accent);
  logoGrad.addColorStop(1, accent2);

  ctx.save();
  canvasShadow(ctx, "rgba(124,92,252,0.22)", 20, 8);
  canvasFillRoundRect(ctx, x, y, size, size, 26, logoGrad);
  ctx.restore();

  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(x + 30, y + 52);
  ctx.lineTo(x + 30, y + 26);
  ctx.lineTo(x + 58, y + 26);
  ctx.moveTo(x + 30, y + 52);
  ctx.lineTo(x + 66, y + 52);
  ctx.stroke();
}

function drawShareDashboard(kind) {
  const stats = getShareStats(kind);
  const W = 1200;
  const H = 1600;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#fff7ed");
  bg.addColorStop(0.32, "#faf8f5");
  bg.addColorStop(0.72, "#f0ecff");
  bg.addColorStop(1, "#e6faf7");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  ctx.save();
  ctx.globalAlpha = 0.16;
  ctx.strokeStyle = "#1a1916";
  ctx.lineWidth = 2;
  for (let x = 90; x <= 1110; x += 78) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x - 420, H);
    ctx.stroke();
  }
  ctx.globalAlpha = 0.28;
  ctx.fillStyle = stats.accent;
  ctx.fillRect(0, 0, W, 16);
  ctx.fillStyle = stats.accent2;
  ctx.fillRect(0, 16, W, 10);
  ctx.restore();

  ctx.save();
  canvasShadow(ctx, "rgba(26,25,22,0.13)", 42, 18);
  canvasFillRoundRect(ctx, 70, 66, 1060, 1468, 58, "rgba(255,255,255,0.92)");
  ctx.restore();
  canvasStrokeRoundRect(ctx, 70, 66, 1060, 1468, 58, "rgba(26,25,22,0.09)", 2);

  drawShareLogo(ctx, 130, 126, 92, stats.accent, stats.accent2);

  ctx.fillStyle = "#1a1916";
  ctx.font = '900 60px "DM Sans", Arial, sans-serif';
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(stats.title, 250, 174);
  ctx.fillStyle = "#7a756d";
  ctx.font = '800 24px "DM Mono", Consolas, monospace';
  ctx.fillText(stats.subtitle.toUpperCase(), 252, 216);

  const dateText = new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  drawSharePill(ctx, 818, 134, 252, 58, dateText, "#f4f0ea", "#6b6760");

  const hero = ctx.createLinearGradient(130, 284, 1070, 874);
  hero.addColorStop(0, stats.accent);
  hero.addColorStop(0.56, stats.accent2);
  hero.addColorStop(1, stats.accent2);
  ctx.save();
  canvasShadow(ctx, "rgba(124,92,252,0.24)", 34, 16);
  canvasFillRoundRect(ctx, 130, 276, 940, 604, 46, hero);
  ctx.restore();

  ctx.save();
  canvasRoundRect(ctx, 130, 276, 940, 604, 46);
  ctx.clip();
  ctx.globalAlpha = 0.18;
  ctx.fillStyle = "#fff";
  for (let y = 318; y < 840; y += 76) {
    ctx.fillRect(158, y, 884, 2);
  }
  ctx.globalAlpha = 0.12;
  ctx.translate(832, 194);
  ctx.rotate(-0.18);
  canvasFillRoundRect(ctx, 0, 0, 360, 560, 46, "#ffffff");
  ctx.translate(-690, 492);
  ctx.rotate(0.28);
  canvasFillRoundRect(ctx, 0, 0, 330, 420, 46, "#ffffff");
  ctx.restore();

  drawSharePill(ctx, 184, 346, 220, 54, stats.primaryLabel, "rgba(255,255,255,0.20)", "#ffffff");
  drawFittedText(ctx, `${stats.primaryValue}%`, 184, 514, 420, 142, 900, "#ffffff");
  ctx.fillStyle = "rgba(255,255,255,0.78)";
  ctx.font = '700 30px "DM Sans", Arial, sans-serif';
  ctx.fillText(kind === "quiz" ? "final quiz score" : "round mastery", 190, 572);

  ctx.fillStyle = "rgba(255,255,255,0.74)";
  ctx.font = '600 25px "DM Sans", Arial, sans-serif';
  ctx.fillText(`${stats.leftValue} ${stats.leftLabel.toLowerCase()} of ${stats.total} total verbs`, 190, 646);

  canvasFillRoundRect(ctx, 184, 714, 428, 32, 16, "rgba(255,255,255,0.22)");
  const barW = Math.max(24, 428 * (stats.primaryValue / 100));
  canvasFillRoundRect(ctx, 184, 714, barW, 32, 16, "#ffffff");

  const cx = 806;
  const cy = 588;
  const radius = 170;
  ctx.save();
  canvasShadow(ctx, "rgba(26,25,22,0.12)", 28, 12);
  canvasFillRoundRect(ctx, cx - 214, cy - 214, 428, 428, 44, "rgba(255,255,255,0.17)");
  ctx.restore();
  ctx.lineWidth = 36;
  ctx.strokeStyle = "rgba(255,255,255,0.30)";
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();

  const start = -Math.PI / 2;
  const end = start + Math.PI * 2 * (stats.primaryValue / 100);
  ctx.strokeStyle = "#ffffff";
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(cx, cy, radius, start, end);
  ctx.stroke();

  drawCenteredText(ctx, `${stats.primaryValue}%`, cx, cy - 4, 300, 98, 900, "#ffffff");
  drawCenteredText(ctx, "COMPLETE", cx, cy + 82, 260, 22, 800, "rgba(255,255,255,0.74)");

  canvasFillRoundRect(ctx, 184, 792, 830, 46, 23, "rgba(255,255,255,0.18)");
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.font = '800 22px "DM Mono", Consolas, monospace';
  ctx.textAlign = "center";
  ctx.fillText(`${stats.leftLabel}: ${stats.leftValue}   /   ${stats.rightLabel}: ${stats.rightValue}`, 600, 822);

  const totalNote = kind === "quiz" ? "questions answered" : "cards reviewed";
  drawShareMetricCard(ctx, 130, 946, 286, 174, stats.leftLabel, stats.leftValue, stats.accent2, "kept moving");
  drawShareMetricCard(ctx, 456, 946, 286, 174, stats.rightLabel, stats.rightValue, stats.warning, "to review");
  drawShareMetricCard(ctx, 782, 946, 288, 174, "Total", stats.total, stats.accent, totalNote);

  ctx.save();
  canvasShadow(ctx, "rgba(26,25,22,0.14)", 24, 10);
  canvasFillRoundRect(ctx, 130, 1188, 940, 164, 36, "#1a1916");
  ctx.restore();
  canvasFillRoundRect(ctx, 164, 1224, 78, 78, 22, stats.accent);
  ctx.fillStyle = "#faf8f5";
  ctx.font = '900 38px "DM Sans", Arial, sans-serif';
  ctx.textAlign = "left";
  ctx.fillText(kind === "quiz" ? "Quiz snapshot" : "Practice snapshot", 270, 1252);
  ctx.fillStyle = "rgba(250,248,245,0.70)";
  ctx.font = '650 24px "DM Sans", Arial, sans-serif';
  ctx.fillText("Practice, review, repeat. Tiny reps add up.", 272, 1296);
  ctx.fillStyle = "#ffffff";
  ctx.font = '900 40px "DM Sans", Arial, sans-serif';
  ctx.textAlign = "center";
  ctx.fillText("VF", 203, 1277);

  const url = (typeof location !== "undefined" && location.href) ? location.href.split("#")[0] : "";
  const cleanUrl = url ? url.replace(/^https?:\/\//, "").replace(/\/$/, "") : "Verb Flashcards";
  ctx.fillStyle = "#7a756d";
  ctx.font = '800 21px "DM Mono", Consolas, monospace';
  ctx.textAlign = "center";
  drawFittedText(ctx, cleanUrl, 600, 1438, 860, 21, 800, "#7a756d", "center");
  ctx.fillStyle = "#1a1916";
  ctx.font = '900 30px "DM Sans", Arial, sans-serif';
  ctx.fillText("Made by Joseph Carazo", 600, 1486);

  return canvas;
}

function canvasToPngFile(canvas, name) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (!blob) {
        reject(new Error("No se pudo crear la imagen."));
        return;
      }
      resolve(new File([blob], name, { type: "image/png" }));
    }, "image/png", 0.96);
  });
}

function downloadShareImage(file) {
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function shareResults(kind) {
  const text = buildShareText(kind);
  const title = kind === "quiz" ? "My Final Quiz Results" : "My Flashcards Round";
  const url = (typeof location !== "undefined" && location.href) ? location.href.split("#")[0] : undefined;
  let imageFile = null;

  try {
    const canvas = drawShareDashboard(kind);
    imageFile = await canvasToPngFile(canvas, `verb-flashcards-${kind}-results.png`);
  } catch (err) {
    imageFile = null;
  }

  // 1. Try native Web Share API with a generated PNG dashboard.
  if (imageFile && navigator.share) {
    try {
      const payload = { title, text, files: [imageFile] };
      if (!navigator.canShare || navigator.canShare(payload)) {
        await navigator.share(payload);
        return;
      }
    } catch (err) {
      if (err && err.name === "AbortError") return;
    }
  }

  // 2. Fallback: copy the image to clipboard when supported.
  if (imageFile && navigator.clipboard && window.ClipboardItem) {
    try {
      await navigator.clipboard.write([new ClipboardItem({ "image/png": imageFile })]);
      showShareToast("Image copied to clipboard ✓");
      return;
    } catch (err) { /* ignore */ }
  }

  // 3. Fallback: download the dashboard image.
  if (imageFile) {
    downloadShareImage(imageFile);
    showShareToast("Dashboard image downloaded ✓");
    return;
  }

  // 4. Last fallback: share/copy text.
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return;
    } catch (err) {
      if (err && err.name === "AbortError") return;
    }
  }

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      showShareToast("Results copied to clipboard ✓");
      return;
    }
  } catch (err) { /* ignore */ }

  // 3. Last-resort fallback: legacy execCommand
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    showShareToast("Results copied to clipboard ✓");
  } catch (err) {
    showShareToast("Couldn't share – try selecting and copying manually.");
  }
}


const SETTINGS_KEY = "vfc_settings";
const DEFAULT_SETTINGS = {
  theme: "auto",
  animations: "on",
  audioSpeed: "1",
  autoPlay: "off",
  verbMode: "all",
  verbsPerDay: "10",
  verbsPerDayCustom: "10",
  dailyStartDate: ""
};

function loadVFCSettings() {
  try { return Object.assign({}, DEFAULT_SETTINGS, JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}")); }
  catch { return { ...DEFAULT_SETTINGS }; }
}
function saveVFCSettings(s) { try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); } catch { } }

function _todayIsoLocal() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function _dailyProgressStartDate(s, persistIfMissing = false) {
  const raw = (s && typeof s.dailyStartDate === "string") ? s.dailyStartDate : "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    const [y, m, d] = raw.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  const todayIso = _todayIsoLocal();
  if (persistIfMissing && s) {
    s.dailyStartDate = todayIso;
    saveVFCSettings(s);
  }
  const [y, m, d] = todayIso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function applyVFCSettings(s) {
  // Tema
  if (s.theme === "dark") { dark = true; applyTheme(); }
  else if (s.theme === "light") { dark = false; applyTheme(); }
  // Animaciones
  if (s.animations === "off") document.documentElement.classList.add("no-animations");
  else document.documentElement.classList.remove("no-animations");
  // Audio speed
  const v = parseFloat(s.audioSpeed || "1");
  if (!isNaN(v) && v > 0) {
    currentSpeed = (v > 0.55 && v <= 0.75) ? 0.45 : v;
    document.querySelectorAll(".speed-chip").forEach(chip => {
      const active = Math.abs(parseFloat(chip.dataset.speed) - currentSpeed) < 0.01;
      chip.classList.toggle("active", active);
      chip.setAttribute("aria-checked", String(active));
    });
  }
}

/* ── DECK CON PROGRESIÓN DIARIA ── */
function updateDeck() {
  const s = loadVFCSettings();
  const mode = s.verbMode || "all";

  if (mode === "all") {
    deck = ALL_VERBS.slice();
    return;
  }

  let perDay = parseInt(s.verbsPerDay, 10) || 10;
  if (s.verbsPerDay === "custom") {
    perDay = Math.max(1, Math.min(ALL_VERBS.length, parseInt(s.verbsPerDayCustom, 10) || 10));
  }

  const today = new Date();
  const startDate = _dailyProgressStartDate(s, true);
  const daysDiff = Math.max(0, Math.floor((today - startDate) / (1000 * 60 * 60 * 24)));
  const verbsToUnlock = Math.min(ALL_VERBS.length, (daysDiff + 1) * perDay);
  deck = ALL_VERBS.slice(0, verbsToUnlock);
}

function buildDeck() {
  document.body.classList.remove("is-card-review", "is-quiz-review");
  updateDeck();
  const base = currentFilter === "all"
    ? deck
    : deck.filter(v => v.type === currentFilter);
  deck = shuffle(base);
  cursor = 0; correct = 0; skipped = 0; isFlipped = false;
  skippedDeck = [];
  practiceMode = false;
  originalDeckLen = deck.length;
}
