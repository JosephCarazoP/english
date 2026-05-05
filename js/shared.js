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

function drawMetricCard(ctx, x, y, w, h, label, value, color) {
  canvasFillRoundRect(ctx, x, y, w, h, 28, "rgba(255,255,255,0.82)");
  canvasStrokeRoundRect(ctx, x, y, w, h, 28, "rgba(26,25,22,0.08)", 2);
  ctx.fillStyle = color;
  ctx.font = '800 54px "DM Sans", Arial, sans-serif';
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(String(value), x + 34, y + 70);
  ctx.fillStyle = "#7a756d";
  ctx.font = '700 24px "DM Mono", Consolas, monospace';
  ctx.fillText(label.toUpperCase(), x + 34, y + 112);
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
  bg.addColorStop(0.42, "#faf8f5");
  bg.addColorStop(1, "#eef9f6");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.fillStyle = stats.accent;
  ctx.beginPath();
  ctx.arc(980, 190, 300, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = stats.accent2;
  ctx.beginPath();
  ctx.arc(170, 1290, 330, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  canvasFillRoundRect(ctx, 78, 78, 1044, 1444, 48, "rgba(255,255,255,0.78)");
  canvasStrokeRoundRect(ctx, 78, 78, 1044, 1444, 48, "rgba(26,25,22,0.10)", 2);

  const hero = ctx.createLinearGradient(130, 270, 1070, 850);
  hero.addColorStop(0, stats.accent);
  hero.addColorStop(1, stats.accent2);
  canvasFillRoundRect(ctx, 130, 280, 940, 560, 44, hero);
  ctx.save();
  ctx.globalAlpha = 0.12;
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(930, 360, 180, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(245, 790, 220, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  canvasFillRoundRect(ctx, 130, 130, 92, 92, 26, stats.accent);
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(166, 180);
  ctx.lineTo(166, 154);
  ctx.lineTo(194, 154);
  ctx.moveTo(166, 180);
  ctx.lineTo(202, 180);
  ctx.stroke();

  ctx.fillStyle = "#1a1916";
  ctx.font = '800 58px "DM Sans", Arial, sans-serif';
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(stats.title, 250, 180);
  ctx.fillStyle = "#7a756d";
  ctx.font = '700 25px "DM Mono", Consolas, monospace';
  ctx.fillText(stats.subtitle.toUpperCase(), 252, 222);

  const dateText = new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  ctx.textAlign = "right";
  ctx.fillStyle = "#7c5cfc";
  ctx.font = '800 28px "DM Sans", Arial, sans-serif';
  ctx.fillText(dateText, 1060, 177);

  const cx = 600;
  const cy = 560;
  const radius = 185;
  ctx.lineWidth = 34;
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

  drawCenteredText(ctx, `${stats.primaryValue}%`, cx, cy - 8, 340, 118, 800, "#ffffff");
  drawCenteredText(ctx, stats.primaryLabel.toUpperCase(), cx, cy + 90, 320, 25, 800, "rgba(255,255,255,0.76)");

  canvasFillRoundRect(ctx, 190, 755, 820, 52, 26, "rgba(255,255,255,0.18)");
  ctx.fillStyle = "#ffffff";
  ctx.font = '700 24px "DM Sans", Arial, sans-serif';
  ctx.textAlign = "center";
  ctx.fillText(`${stats.leftValue} ${stats.leftLabel.toLowerCase()}  /  ${stats.rightValue} ${stats.rightLabel.toLowerCase()}`, 600, 790);

  drawMetricCard(ctx, 150, 895, 430, 164, stats.leftLabel, stats.leftValue, stats.accent2);
  drawMetricCard(ctx, 620, 895, 430, 164, stats.rightLabel, stats.rightValue, stats.warning);

  canvasFillRoundRect(ctx, 150, 1115, 900, 150, 34, "#1a1916");
  ctx.fillStyle = "#faf8f5";
  ctx.font = '800 42px "DM Sans", Arial, sans-serif';
  ctx.textAlign = "left";
  ctx.fillText(`${stats.total} total verbs`, 198, 1178);
  ctx.fillStyle = "rgba(250,248,245,0.70)";
  ctx.font = '600 24px "DM Sans", Arial, sans-serif';
  ctx.fillText("Practice, review, repeat.", 200, 1222);

  const url = (typeof location !== "undefined" && location.href) ? location.href.split("#")[0] : "";
  ctx.fillStyle = "#6b6760";
  ctx.font = '700 22px "DM Mono", Consolas, monospace';
  ctx.textAlign = "center";
  ctx.fillText(url ? url.replace(/^https?:\/\//, "") : "Verb Flashcards", 600, 1408);
  ctx.fillStyle = "#1a1916";
  ctx.font = '800 28px "DM Sans", Arial, sans-serif';
  ctx.fillText("Made by Joseph Carazo", 600, 1454);

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
