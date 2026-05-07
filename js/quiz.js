/* ════════════════════════════════════════════════════════
   Q U I Z   S Y S T E M
   ════════════════════════════════════════════════════════ */

let quizQuestions = [];
let quizIdx = 0;
let quizOk = 0;
let quizNo = 0;
let quizLocked = false;
let quizFailedSet = new Set(); // verbos fallados pendientes de dominar
let quizPracticeMode = false;     // true cuando repasamos los fallados
let quizOriginalTotal = 0;         // total del quiz original (para el resumen)

/* ── Tense helpers ── */
function pickQuizTense() {
  return Math.random() < 0.5 ? "present" : "past";
}

function getTenseName(tense) {
  return tense === "present" ? "present tense" : "past tense";
}

function getTenseHintEs(tense) {
  return tense === "present" ? "presente" : "pasado";
}

function getOppositeTense(tense) {
  return tense === "present" ? "past" : "present";
}

function getVerbForm(verb, tense) {
  return tense === "present" ? verb.present : verb.past;
}

function normalizeQuizAnswer(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[.,!?;:"'`]/g, "")
    .replace(/[“”‘’]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getPastTargets(verb) {
  return String(verb.past || "")
    .toLowerCase()
    .split("/")
    .map(s => normalizeQuizAnswer(s))
    .filter(Boolean);
}

function getTenseTargets(verb, tense) {
  if (tense === "present") return [normalizeQuizAnswer(verb.present)].filter(Boolean);
  return getPastTargets(verb);
}

function getSpanishMeaningOptions(verb) {
  return String(VERB_MEANINGS_ES[verb.present] || verb.present)
    .split("/")
    .map(s => s.trim())
    .filter(Boolean);
}

function getPrimarySpanishMeaning(verb) {
  return getSpanishMeaningOptions(verb)[0] || verb.present;
}

function getSpanishTenseName(tense) {
  return tense === "present" ? "presente" : "pasado";
}

/* ── Get distractors ── */
function getDistractor(correctVerb, pool, tense) {
  const correctTargets = new Set(getTenseTargets(correctVerb, tense));
  const choices = pool.filter(v => !getTenseTargets(v, tense).some(target => correctTargets.has(target)));
  return getVerbForm(shuffle(choices)[0] || correctVerb, tense);
}
function getDistractors(correctVerb, pool, tense) {
  const correctTargets = new Set(getTenseTargets(correctVerb, tense));
  return shuffle(pool.filter(v => !getTenseTargets(v, tense).some(target => correctTargets.has(target))))
    .slice(0, 3)
    .map(v => getVerbForm(v, tense));
}

function buildSentencePrompt(verb, tense) {
  const html = tense === "present" ? (verb.sentencePres || "") : (verb.sentencePast || "");
  let answer = "";
  let promptHtml = html.replace(/<b>(.*?)<\/b>/i, (_, raw) => {
    answer = stripHtml(raw);
    return '<span class="qsent-blank" aria-hidden="true"></span>';
  });

  if (!answer) {
    answer = String(getVerbForm(verb, tense) || "").split("/")[0].trim();
    promptHtml = stripHtml(html).replace(answer, "________");
  }

  const meaning = VERB_MEANINGS_ES[verb.present] || verb.present;
  const formTargets = tense === "past" ? getTenseTargets(verb, tense) : [];
  const targets = Array.from(new Set([normalizeQuizAnswer(answer), ...formTargets])).filter(Boolean);
  return { promptHtml, answer, targets, hint: `${meaning} en ${getTenseHintEs(tense)}` };
}

function buildTranslationPrompt(verb, tense) {
  const direction = Math.random() < 0.5 ? "es-en" : "en-es";
  const tenseName = getTenseName(tense);
  const spanishTense = getSpanishTenseName(tense);
  const englishForms = getTenseTargets(verb, tense).map(target => target.replace(/\s*\/\s*/g, " / "));
  const spanishMeanings = getSpanishMeaningOptions(verb);
  const primaryEnglishForm = getVerbForm(verb, tense);
  const primarySpanishMeaning = getPrimarySpanishMeaning(verb);

  if (direction === "es-en") {
    const source = `Yo uso "${primarySpanishMeaning}" en ${spanishTense}.`;
    const answer = `I use "${primaryEnglishForm}" in the ${tenseName}.`;
    const targets = Array.from(new Set([
      normalizeQuizAnswer(answer),
      ...englishForms.map(form => normalizeQuizAnswer(`I use "${form}" in the ${tenseName}.`)),
    ])).filter(Boolean);
    return {
      direction,
      source,
      answer,
      targets,
      hint: `Traduce al inglés. Usa ${tenseName}.`,
    };
  }

  const source = `I use "${primaryEnglishForm}" in the ${tenseName}.`;
  const answer = `Yo uso "${primarySpanishMeaning}" en ${spanishTense}.`;
  const targets = Array.from(new Set([
    normalizeQuizAnswer(answer),
    ...spanishMeanings.map(meaning => normalizeQuizAnswer(`Yo uso "${meaning}" en ${spanishTense}.`)),
  ])).filter(Boolean);
  return {
    direction,
    source,
    answer,
    targets,
    hint: `Translate to Spanish. Usa ${spanishTense}.`,
  };
}

/* ── Build question ── */
function buildQuestion(verb, pool) {
  const mechs = ["swipe", "type", "sentence", "choice", "translate"];
  const mech = mechs[Math.floor(Math.random() * mechs.length)];
  const tense = pickQuizTense();
  const sourceTense = getOppositeTense(tense);
  const source = getVerbForm(verb, sourceTense);
  const answer = getVerbForm(verb, tense);
  const tenseName = getTenseName(tense);
  if (mech === "swipe") {
    const distractor = getDistractor(verb, pool, tense);
    const correctOnRight = Math.random() > 0.5;
    return {
      mech: "swipe", label: `Swipe to the ${tenseName}`, verb, tense, source,
      leftOpt: correctOnRight ? distractor : answer,
      rightOpt: correctOnRight ? answer : distractor,
      correctSide: correctOnRight ? "right" : "left",
    };
  }
  if (mech === "type") {
    return { mech: "type", label: `Type the ${tenseName}`, verb, tense, source, answer };
  }
  if (mech === "sentence") {
    return { mech: "sentence", label: `Complete the ${tenseName} sentence`, verb, tense, sentence: buildSentencePrompt(verb, tense) };
  }
  if (mech === "translate") {
    const translation = buildTranslationPrompt(verb, tense);
    const label = translation.direction === "es-en"
      ? `Traduce al inglés (${tenseName})`
      : `Translate to Spanish (${getSpanishTenseName(tense)})`;
    return { mech: "translate", label, verb, tense, translation };
  }
  const opts = shuffle([answer, ...getDistractors(verb, pool, tense)]);
  return { mech: "choice", label: `Pop the ${tenseName}`, opts, correct: answer, verb, tense, source };
}

function buildQuiz(verbPool) {
  return shuffle(verbPool).map(v => buildQuestion(v, verbPool));
}

/* ── Start quiz ── */
function startQuiz() {
  if (bubbleRAF) { cancelAnimationFrame(bubbleRAF); bubbleRAF = null; }

  updateDeck();
  const s = loadVFCSettings();
  const mode = s.verbMode || "all";

  const fullPool = currentFilter === "all"
    ? deck
    : deck.filter(v => v.type === currentFilter);

  const QUIZ_CAP = 30;
  let verbPool;
  if (mode === "all") {
    verbPool = shuffle(fullPool).slice(0, QUIZ_CAP);
  } else {
    verbPool = fullPool;
  }

  quizQuestions = buildQuiz(verbPool);
  quizIdx = 0;
  quizOk = 0;
  quizNo = 0;
  quizLocked = false;
  quizFailedSet = new Set();
  quizPracticeMode = false;
  quizOriginalTotal = quizQuestions.length;
  showQuizPracticePill(false);

  document.querySelector(".score-correct .score-lbl").textContent = "Correct";
  document.querySelector(".score-skip    .score-lbl").textContent = "Wrong";
  document.getElementById("scoreCorrect").textContent = "0";
  document.getElementById("scoreSkip").textContent = "0";

  document.getElementById("finishScreen").classList.remove("show");
  document.getElementById("stage").style.display = "none";

  const qResultScreen = document.getElementById("quizResultScreen");
  if (qResultScreen) qResultScreen.classList.remove("show");

  const qStackCards = document.getElementById("qStackCards");
  if (qStackCards) qStackCards.classList.remove("results-mode");

  setTimeout(() => {
    const qs = document.getElementById("quizScreen");
    qs.style.display = "flex";
    renderQuizQuestion();
  }, 50);
}

/* ── Update header ── */
function updateQuizHeader() {
  const total = quizQuestions.length;
  const pct = Math.round((quizIdx / total) * 100);
  document.getElementById("progressFill").style.width = pct + "%";
  document.getElementById("progressLabel").textContent = `${Math.min(quizIdx + 1, total)} / ${total}`;
  document.getElementById("scoreCorrect").textContent = quizOk;
  document.getElementById("scoreSkip").textContent = quizNo;
  if (quizPracticeMode) {
    const cnt = document.getElementById("quizPracticeCount");
    if (cnt) cnt.textContent = quizFailedSet.size;
  }
}

/* ── Avanzar a la siguiente pregunta con animación de salida ── */
function animateToNextQuestion(flyDirection, delay) {
  const c1 = document.getElementById("qCard1");
  const wait = delay !== undefined ? delay : 700;

  setTimeout(() => {
    c1.style.transition = "none";
    const flyClass = flyDirection === "right" ? "anim-exit-right"
      : flyDirection === "left" ? "anim-exit-left"
        : "anim-exit-up";

    c1.classList.add(flyClass);

    promoteBackCards();

    setTimeout(() => {
      quizIdx++;
      renderQuizQuestion(true);
    }, 280);
  }, wait);
}

/* ── Promover c2 → top y c3 → c2 con animación suave ── */
function promoteBackCards() {
  const c2 = document.getElementById("qCard2");
  const c3 = document.getElementById("qCard3");

  if (c2) {
    c2.style.transform = "translateY(0) scale(1)";
    c2.style.opacity = "1";
  }
  if (c3) {
    c3.style.transform = "translateY(7px) scale(0.96)";
    c3.style.opacity = "1";
  }
}

/* ── Quiz label configs ── */
const QUIZ_LABELS = {
  swipe: {
    icon: "👈👉",
    text: "Swipe to the requested tense",
    color: "var(--accent-2)",
    bg: "var(--accent-2-soft)",
  },
  type: {
    icon: "⌨️",
    text: "Type the requested tense &amp; press Enter",
    color: "var(--accent-3)",
    bg: "var(--accent-3-soft)",
  },
  choice: {
    icon: "🫧",
    text: "Pop the correct bubble!",
    color: "var(--accent)",
    bg: "var(--accent-soft)",
  },
  sentence: {
    icon: "T",
    text: "Complete the sentence",
    color: "var(--accent)",
    bg: "var(--accent-soft)",
  },
  translate: {
    icon: "⇄",
    text: "Translate the sentence",
    color: "var(--accent-3)",
    bg: "var(--accent-3-soft)",
  },
};

/* ── Render current quiz question ── */
function renderQuizQuestion(animateIn = false) {
  if (quizIdx >= quizQuestions.length) {
    if (quizFailedSet.size > 0) {
      startQuizPracticeRound();
      return;
    }
    showQuizPracticePill(false);
    showQuizResults();
    return;
  }

  quizLocked = false;
  const q = quizQuestions[quizIdx];
  const c1 = document.getElementById("qCard1");

  const qStackCards = document.getElementById("qStackCards");
  qStackCards.classList.remove("results-mode");

  c1.style.cssText = "";
  c1.className = "quiz-card top";
  if (q.mech !== "swipe") c1.classList.add("no-drag");
  if (animateIn) {
    void c1.offsetWidth;
    c1.classList.add("anim-enter");
    c1.addEventListener("animationend", () => c1.classList.remove("anim-enter"), { once: true });
  }

  const c2 = document.getElementById("qCard2");
  const c3 = document.getElementById("qCard3");
  if (c2) { c2.style.cssText = ""; c2.className = "quiz-card c2"; }
  if (c3) { c3.style.cssText = ""; c3.className = "quiz-card c3"; }

  hideSwipeGhosts();

  const dirRow = document.getElementById("qDirRow");
  const body = document.getElementById("qBody");

  /* ── Render the label pill ── */
  const lbl = QUIZ_LABELS[q.mech];
  document.getElementById("qLabel").innerHTML =
    `<span class="qlabel-pill" style="background:${lbl.bg};color:${lbl.color};">` +
    `<span class="qlabel-icon">${lbl.icon}</span>` +
    `<span class="qlabel-text">${q.label || lbl.text}</span>` +
    `</span>`;

  if (q.mech === "swipe") {
    dirRow.style.display = "flex";
    body.innerHTML =
      `<div class="qsw-verb">${q.source}</div>` +
      `<div class="qsw-sub">${getTenseName(q.tense)}</div>` +
      `<div class="qsw-opts">` +
      `<div class="qsw-opt" id="qOptL">${q.leftOpt}</div>` +
      `<div class="qsw-or">or</div>` +
      `<div class="qsw-opt" id="qOptR">${q.rightOpt}</div>` +
      `</div>`;

  } else if (q.mech === "type") {
    dirRow.style.display = "none";
    body.innerHTML =
      `<div class="qtype-verb">${q.source}</div>` +
      `<div class="qtype-wrap">` +
      `<div class="qtype-tip">Write the ${getTenseName(q.tense)} below</div>` +
      `<input id="qTypeInput" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="${getTenseName(q.tense)}..." />` +
      `<div class="qtype-fb" id="qTypeFb"></div>` +
      `</div>`;

    const inp = document.getElementById("qTypeInput");
    inp.addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return;
      e.preventDefault();
      if (quizLocked) return;
      const val = normalizeQuizAnswer(this.value);
      const targets = getTenseTargets(q.verb, q.tense);
      const isOk = targets.includes(val);
      this.className = isOk ? "right" : "wrong";
      const fb = document.getElementById("qTypeFb");
      fb.textContent = isOk ? "✓ Correct!" : "Answer: " + q.answer;
      fb.style.color = isOk ? "var(--quiz-ok)" : "var(--quiz-no)";
      this.disabled = true;
      quizLocked = true;
      registerQuizAnswer(q.verb, isOk);
      updateQuizHeader();
      animateToNextQuestion("up", 820);
    });
    setTimeout(() => { try { inp.focus(); } catch (e) { } }, 80);

  } else if (q.mech === "sentence") {
    dirRow.style.display = "none";
    body.innerHTML =
      `<div class="qsent-wrap">` +
      `<div class="qsent-text">${q.sentence.promptHtml}</div>` +
      `<div class="qsent-hint">(${q.sentence.hint})</div>` +
      `<input id="qSentenceInput" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="complete the blank..." />` +
      `<div class="qtype-fb" id="qSentenceFb"></div>` +
      `</div>`;

    const inp = document.getElementById("qSentenceInput");
    inp.addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return;
      e.preventDefault();
      if (quizLocked) return;
      const val = normalizeQuizAnswer(this.value);
      const isOk = q.sentence.targets.includes(val);
      this.className = isOk ? "right" : "wrong";
      const fb = document.getElementById("qSentenceFb");
      fb.textContent = isOk ? "✓ Correct!" : "Answer: " + q.sentence.answer;
      fb.style.color = isOk ? "var(--quiz-ok)" : "var(--quiz-no)";
      this.disabled = true;
      quizLocked = true;
      registerQuizAnswer(q.verb, isOk);
      updateQuizHeader();
      animateToNextQuestion("up", 900);
    });
    setTimeout(() => { try { inp.focus(); } catch (e) { } }, 80);

  } else if (q.mech === "translate") {
    dirRow.style.display = "none";
    body.innerHTML =
      `<div class="qsent-wrap">` +
      `<div class="qsent-text">${q.translation.source}</div>` +
      `<div class="qsent-hint">(${q.translation.hint})</div>` +
      `<input id="qTranslateInput" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="write the translation..." />` +
      `<div class="qtype-fb" id="qTranslateFb"></div>` +
      `</div>`;

    const inp = document.getElementById("qTranslateInput");
    inp.addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return;
      e.preventDefault();
      if (quizLocked) return;
      const val = normalizeQuizAnswer(this.value);
      const isOk = q.translation.targets.includes(val);
      this.className = isOk ? "right" : "wrong";
      const fb = document.getElementById("qTranslateFb");
      fb.textContent = isOk ? "✓ Correct!" : "Answer: " + q.translation.answer;
      fb.style.color = isOk ? "var(--quiz-ok)" : "var(--quiz-no)";
      this.disabled = true;
      quizLocked = true;
      registerQuizAnswer(q.verb, isOk);
      updateQuizHeader();
      animateToNextQuestion("up", 900);
    });
    setTimeout(() => { try { inp.focus(); } catch (e) { } }, 80);

  } else {
    dirRow.style.display = "none";
    body.innerHTML =
      `<div class="qbubble-wrap">` +
      `<div class="qbubble-verb">${q.source}</div>` +
      `<canvas class="qbubble-canvas" id="qBubbleCanvas"></canvas>` +
      `</div>`;
    setTimeout(() => initBubbles(q.opts, q.correct), 40);
  }

  const p1 = quizQuestions[quizIdx + 1];
  const p2 = quizQuestions[quizIdx + 2];
  if (c2) c2.innerHTML = p1 ? `<div class="quiz-card-label-peek">${p1.label}</div>` : "";
  if (c3) c3.innerHTML = p2 ? `<div class="quiz-card-label-peek">${p2.label}</div>` : "";

  updateQuizHeader();
}

/* ════════════════════════════════════════════════════════
   B U B B L E   M E C H A N I C
   ════════════════════════════════════════════════════════ */

let bubbleRAF = null;
let bubbles = [];

function initBubbles(opts, correct) {
  const canvas = document.getElementById("qBubbleCanvas");
  if (!canvas) return;
  if (bubbleRAF) { cancelAnimationFrame(bubbleRAF); bubbleRAF = null; }

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const W = canvas.offsetWidth;
  const H = canvas.offsetHeight;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  const isDark = document.documentElement.getAttribute("data-theme") === "dark";

  const PALETTES = isDark ? [
    { fill: "#ff6b3528", stroke: "#ff9a5c", text: "#ffb380" },
    { fill: "#7c5cfc28", stroke: "#a78bfa", text: "#c4b5fd" },
    { fill: "#0dbfa028", stroke: "#34d9be", text: "#6ee7d8" },
    { fill: "#f43f5e28", stroke: "#fb7185", text: "#fda4af" },
  ] : [
    { fill: "#ff6b3518", stroke: "#ff6b35", text: "#c84a10" },
    { fill: "#7c5cfc18", stroke: "#7c5cfc", text: "#5b3dd4" },
    { fill: "#0dbfa018", stroke: "#0dbfa0", text: "#0a8a74" },
    { fill: "#f43f5e18", stroke: "#f43f5e", text: "#c01a3c" },
  ];

  const palOrder = [0, 1, 2, 3].sort(() => Math.random() - 0.5);

  const R = Math.min(W * 0.18, H * 0.20, 62);

  const quadCenters = [
    { x: W * 0.27, y: H * 0.28 },
    { x: W * 0.73, y: H * 0.28 },
    { x: W * 0.27, y: H * 0.72 },
    { x: W * 0.73, y: H * 0.72 },
  ];

  bubbles = opts.map((opt, i) => {
    const qc = quadCenters[i];
    return {
      x: qc.x + (Math.random() - 0.5) * 16,
      y: qc.y + (Math.random() - 0.5) * 16,
      r: R + (Math.random() - 0.5) * 6,
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.55,
      phase: Math.random() * Math.PI * 2,
      text: opt,
      correct: opt === correct,
      pal: PALETTES[palOrder[i]],
      state: 'alive',
      popT: 0,
      particles: [],
    };
  });

  /* Separar solapamientos iniciales */
  for (let iter = 0; iter < 40; iter++) {
    for (let a = 0; a < bubbles.length; a++) {
      for (let b2 = a + 1; b2 < bubbles.length; b2++) {
        const ba = bubbles[a], bb = bubbles[b2];
        const dx = bb.x - ba.x, dy = bb.y - ba.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minD = ba.r + bb.r + 6;
        if (dist < minD && dist > 0) {
          const push = (minD - dist) / 2;
          const nx = dx / dist, ny = dy / dist;
          ba.x -= nx * push; ba.y -= ny * push;
          bb.x += nx * push; bb.y += ny * push;
        }
      }
    }
  }

  for (const b of bubbles) {
    b.x = Math.max(b.r, Math.min(W - b.r, b.x));
    b.y = Math.max(b.r, Math.min(H - b.r, b.y));
  }

  let done = false;
  let t = 0;

  function spawnParticles(b) {
    const count = 14;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
      const speed = 2.5 + Math.random() * 3;
      b.particles.push({
        x: b.x, y: b.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: 3 + Math.random() * 4,
        life: 1,
        color: b.pal.stroke,
      });
    }
  }

  function drawBubble(b) {
    if (b.state === 'dead') return;

    ctx.save();

    if (b.state === 'popping-ok') {
      b.popT += 0.055;
      const eased = 1 - Math.pow(1 - Math.min(b.popT, 1), 3);
      const scale = 1 + eased * 0.7;
      ctx.globalAlpha = Math.max(0, 1 - eased * 1.1);
      ctx.translate(b.x, b.y);
      ctx.scale(scale, scale);

      ctx.beginPath();
      ctx.arc(0, 0, b.r, 0, Math.PI * 2);
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 4 * (1 / scale);
      ctx.stroke();

      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3 * (1 / scale);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(-b.r * 0.28, 0);
      ctx.lineTo(-b.r * 0.06, b.r * 0.24);
      ctx.lineTo(b.r * 0.30, -b.r * 0.22);
      ctx.stroke();

      if (b.popT >= 1) b.state = 'dead';

    } else if (b.state === 'popping-no') {
      b.popT += 0.055;
      const shakeAmp = Math.max(0, 1 - b.popT) * 10;
      const shakeX = Math.sin(b.popT * 38) * shakeAmp;
      const scale = Math.max(0, 1 - Math.max(0, b.popT - 0.35) * 1.4);
      ctx.globalAlpha = Math.max(0, 1 - Math.max(0, b.popT - 0.35) * 1.8);
      ctx.translate(b.x + shakeX, b.y);
      ctx.scale(scale, scale);

      ctx.beginPath();
      ctx.arc(0, 0, b.r, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? '#2d0a1255' : '#fef2f2';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 0, b.r, 0, Math.PI * 2);
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-b.r * 0.25, -b.r * 0.25);
      ctx.lineTo(b.r * 0.25, b.r * 0.25);
      ctx.moveTo(b.r * 0.25, -b.r * 0.25);
      ctx.lineTo(-b.r * 0.25, b.r * 0.25);
      ctx.stroke();

      ctx.font = `700 ${Math.min(16, (b.r * 1.3) / (b.text.length * 0.6))}px "DM Sans",sans-serif`;
      ctx.fillStyle = '#f43f5e';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.globalAlpha *= 0.5;
      ctx.fillText(b.text, 0, b.r * 0.55);

      if (b.popT >= 1) b.state = 'dead';

    } else {
      /* ── ALIVE state: bob animation only, NO squish ── */
      /* Squish was removed because applying scaleX/Y after ctx.translate
         distorted the radius used for hit-detection and caused visual
         size glitches on wall contact. Pure bob + velocity damping near
         walls gives a clean, stable look. */
      const bob = Math.sin(t * 1.1 + b.phase) * 2.5;

      ctx.translate(b.x, b.y + bob);

      /* Soft shadow */
      ctx.shadowColor = b.pal.stroke + "55";
      ctx.shadowBlur = 14;
      ctx.shadowOffsetY = 4;

      /* Radial gradient fill */
      const grd = ctx.createRadialGradient(-b.r * 0.25, -b.r * 0.25, b.r * 0.05, 0, 0, b.r);
      grd.addColorStop(0, b.pal.stroke + "55");
      grd.addColorStop(1, b.pal.fill);
      ctx.beginPath();
      ctx.arc(0, 0, b.r, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      /* Reset shadow before stroke so it doesn't double */
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      /* Stroke */
      ctx.beginPath();
      ctx.arc(0, 0, b.r, 0, Math.PI * 2);
      ctx.strokeStyle = b.pal.stroke;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      /* Large shine */
      ctx.beginPath();
      ctx.ellipse(-b.r * 0.28, -b.r * 0.32, b.r * 0.24, b.r * 0.13, -0.45, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.60)";
      ctx.fill();

      /* Mini shine */
      ctx.beginPath();
      ctx.ellipse(-b.r * 0.12, -b.r * 0.50, b.r * 0.08, b.r * 0.05, -0.3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.40)";
      ctx.fill();

      /* Text */
      const maxW = b.r * 1.65;
      const chars = Math.max(b.text.length, 2);
      const fs = Math.min(18, maxW / (chars * 0.56));
      ctx.font = `800 ${fs}px "DM Sans", sans-serif`;
      ctx.fillStyle = b.pal.text;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(b.text, 0, 1);
    }

    ctx.restore();
  }

  function drawParticles(b) {
    for (const p of b.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12;
      p.life -= 0.035;
      if (p.life <= 0) continue;
      ctx.save();
      ctx.globalAlpha = p.life * 0.9;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      ctx.restore();
    }
    b.particles = b.particles.filter(p => p.life > 0);
  }

  function animate() {
    if (!document.getElementById("qBubbleCanvas")) {
      cancelAnimationFrame(bubbleRAF);
      return;
    }
    ctx.clearRect(0, 0, W, H);
    t += 0.016;

    const alive = bubbles.filter(b => b.state === 'alive');
    for (const b of alive) {
      b.x += b.vx;
      b.y += b.vy;
      b.vx += (Math.random() - 0.5) * 0.04;
      b.vy += (Math.random() - 0.5) * 0.04;

      /* Cap speed */
      const spd = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
      if (spd > 0.65) { b.vx = b.vx / spd * 0.65; b.vy = b.vy / spd * 0.65; }

      /* ── Wall bounce: hard clamp + velocity flip, no squish ── */
      /* Previously the bubble used scaleX/Y near walls, which caused
         visible size changes. Now we just bounce and damp velocity. */
      if (b.x - b.r < 0) { b.x = b.r; b.vx = Math.abs(b.vx) * 0.85; }
      if (b.x + b.r > W) { b.x = W - b.r; b.vx = -Math.abs(b.vx) * 0.85; }
      if (b.y - b.r < 0) { b.y = b.r; b.vy = Math.abs(b.vy) * 0.85; }
      if (b.y + b.r > H) { b.y = H - b.r; b.vy = -Math.abs(b.vy) * 0.85; }
    }

    /* Elastic collision between bubbles */
    for (let a = 0; a < alive.length; a++) {
      for (let i = a + 1; i < alive.length; i++) {
        const ba = alive[a], bb = alive[i];
        const dx = bb.x - ba.x;
        const dy = bb.y - ba.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minD = ba.r + bb.r;
        if (dist < minD && dist > 0.01) {
          const overlap = (minD - dist) / 2;
          const nx = dx / dist, ny = dy / dist;
          ba.x -= nx * overlap; ba.y -= ny * overlap;
          bb.x += nx * overlap; bb.y += ny * overlap;
          const dvx = ba.vx - bb.vx;
          const dvy = ba.vy - bb.vy;
          const dot = dvx * nx + dvy * ny;
          if (dot > 0) {
            ba.vx -= dot * nx * 0.9;
            ba.vy -= dot * ny * 0.9;
            bb.vx += dot * nx * 0.9;
            bb.vy += dot * ny * 0.9;
          }
        }
      }
    }

    for (const b of bubbles) {
      drawParticles(b);
      drawBubble(b);
    }

    bubbleRAF = requestAnimationFrame(animate);
  }

  animate();

  /* ── Hit detection ── */
  function handleTap(clientX, clientY) {
    if (quizLocked) return;
    const rect = canvas.getBoundingClientRect();
    const mx = clientX - rect.left;
    const my = clientY - rect.top;

    for (const b of bubbles) {
      if (b.state !== 'alive') continue;
      const dx = mx - b.x;
      const dy = my - b.y;
      if (Math.sqrt(dx * dx + dy * dy) > b.r) continue;

      quizLocked = true;

      const _isOkBubble = !!b.correct;
      if (_isOkBubble) {
        b.state = 'popping-ok';
        spawnParticles(b);
        for (const ob of bubbles) {
          if (ob !== b) { ob.state = 'popping-no'; ob.popT = 0.38; }
        }
      } else {
        b.state = 'popping-no';
        b.popT = 0;
        for (const ob of bubbles) {
          if (ob.correct) {
            ob.state = 'popping-ok';
            spawnParticles(ob);
          } else if (ob !== b) {
            ob.state = 'popping-no';
            ob.popT = 0.38;
          }
        }
      }
      registerQuizAnswer(quizQuestions[quizIdx].verb, _isOkBubble);

      updateQuizHeader();
      animateToNextQuestion("up", 1100);
      break;
    }
  }

  canvas.addEventListener("touchstart", e => {
    e.preventDefault();
    const touch = e.changedTouches[0];
    handleTap(touch.clientX, touch.clientY);
  }, { passive: false });

  canvas.addEventListener("mousedown", e => {
    handleTap(e.clientX, e.clientY);
  });
}

/* ════════════════════════════════════════════════════════
   S W I P E   A D V A N C E
   ════════════════════════════════════════════════════════ */

function quizAdvanceSwipe(swiped) {
  if (quizLocked) return;
  quizLocked = true;
  const q = quizQuestions[quizIdx];
  const isOk = swiped === q.correctSide;

  const optL = document.getElementById("qOptL");
  const optR = document.getElementById("qOptR");
  if (optL && optR) {
    if (swiped === "left") {
      optL.classList.add(isOk ? "qsw-flash-ok" : "qsw-flash-no");
      if (!isOk) optR.classList.add("qsw-flash-ok");
    } else {
      optR.classList.add(isOk ? "qsw-flash-ok" : "qsw-flash-no");
      if (!isOk) optL.classList.add("qsw-flash-ok");
    }
  }

  registerQuizAnswer(q.verb, isOk);
  updateQuizHeader();
  hideSwipeGhosts();

  const c1 = document.getElementById("qCard1");
  const tx = swiped === "right" ? 160 : -160;
  const rot = swiped === "right" ? 18 : -18;
  c1.style.transition = "transform 0.28s cubic-bezier(0.4,0,0.6,1), opacity 0.28s";
  c1.style.transform = `translateX(${tx}%) rotate(${rot}deg)`;
  c1.style.opacity = "0";

  promoteBackCards();

  setTimeout(() => {
    quizIdx++;
    renderQuizQuestion(true);
  }, 300);
}

/* ════════════════════════════════════════════════════════
   S W I P E   G E S T U R E
   ════════════════════════════════════════════════════════ */

let qDrag = false, qSx = 0, qSy = 0, qCx = 0, qCy = 0;

function qDragStart(e) {
  if (!quizQuestions[quizIdx] || quizQuestions[quizIdx].mech !== "swipe" || quizLocked) return;
  qDrag = true;
  const pt = e.touches ? e.touches[0] : e;
  qSx = pt.clientX; qSy = pt.clientY;
  qCx = 0; qCy = 0;
  const c1 = document.getElementById("qCard1");
  c1.classList.add("dragging");
}

function qDragMove(e) {
  if (!qDrag) return;
  const pt = e.touches ? e.touches[0] : e;
  qCx = pt.clientX - qSx;
  qCy = pt.clientY - qSy;

  const c1 = document.getElementById("qCard1");
  const rot = qCx * 0.05;
  c1.style.transform = `translateX(${qCx}px) translateY(${qCy * 0.3}px) rotate(${rot}deg)`;

  const t = 40;
  const optL = document.getElementById("qOptL");
  const optR = document.getElementById("qOptR");
  if (optL && optR) {
    if (qCx < -t) {
      optL.style.background = "var(--quiz-hover)"; optL.style.color = "var(--quiz-hover-text)";
      optR.style.background = ""; optR.style.color = "";
    } else if (qCx > t) {
      optR.style.background = "var(--quiz-hover)"; optR.style.color = "var(--quiz-hover-text)";
      optL.style.background = ""; optL.style.color = "";
    } else {
      optL.style.background = ""; optL.style.color = "";
      optR.style.background = ""; optR.style.color = "";
    }
  }
}

function qDragEnd() {
  if (!qDrag) return;
  qDrag = false;
  const c1 = document.getElementById("qCard1");
  c1.classList.remove("dragging");

  const THRESHOLD = 80;
  if (qCx > THRESHOLD) {
    quizAdvanceSwipe("right");
  } else if (qCx < -THRESHOLD) {
    quizAdvanceSwipe("left");
  } else {
    c1.style.transition = "transform 0.35s cubic-bezier(0.34, 1.4, 0.64, 1)";
    c1.style.transform = "";
    const optL = document.getElementById("qOptL");
    const optR = document.getElementById("qOptR");
    if (optL) { optL.style.background = ""; optL.style.color = ""; }
    if (optR) { optR.style.background = ""; optR.style.color = ""; }
    hideSwipeGhosts();
  }
}

/* ════════════════════════════════════════════════════════
   Q U I Z   R E S U L T S
   ════════════════════════════════════════════════════════ */

/* ── Registrar respuesta de quiz (cuenta original + set de fallados) ── */
function registerQuizAnswer(verb, isOk) {
  if (quizPracticeMode) {
    // En modo práctica solo actualizamos el set, no el resumen
    if (isOk) {
      quizFailedSet.delete(verb);
      showQuizPracticePill(true);
    } else {
      quizFailedSet.add(verb);
    }
  } else {
    if (isOk) {
      quizOk++;
    } else {
      quizNo++;
      quizFailedSet.add(verb);
    }
  }
}

/* ── Inicia una vuelta de práctica con los verbos fallados ── */
function startQuizPracticeRound() {
  quizPracticeMode = true;
  const pool = ALL_VERBS.slice(0, deck.length);
  const failedArr = Array.from(quizFailedSet);
  // Para cada verbo fallado generamos una nueva pregunta (mecánica aleatoria)
  quizQuestions = shuffle(failedArr).map(v => buildQuestion(v, pool));
  quizIdx = 0;
  quizLocked = false;
  showQuizPracticePill(true);
  // Header refleja la vuelta de práctica
  document.getElementById("progressLabel").textContent = `1 / ${quizQuestions.length}`;
  document.getElementById("progressFill").style.width = "0%";
  setTimeout(() => renderQuizQuestion(true), 30);
}

/* ── Pill de modo práctica del quiz ── */
function showQuizPracticePill(show) {
  let pill = document.getElementById("quizPracticePill");
  if (show) {
    if (!pill) {
      pill = document.createElement("div");
      pill.id = "quizPracticePill";
      pill.className = "practice-banner practice-banner-quiz";
      pill.innerHTML = (
        '<span class="practice-banner-icon">🔁</span>' +
        '<div class="practice-banner-body">' +
        '<div class="practice-banner-title">Repasando fallados</div>' +
        '<div class="practice-banner-sub">Acierta cada uno para terminar el quiz</div>' +
        '</div>' +
        '<div class="practice-banner-count"><b id="quizPracticeCount">0</b><span>por dominar</span></div>'
      );
      const wrap = document.querySelector(".progress-wrap");
      wrap.parentNode.insertBefore(pill, wrap);
    }
    pill.classList.add("show");
    const cnt = document.getElementById("quizPracticeCount");
    if (cnt) {
      const oldVal = parseInt(cnt.textContent || "0", 10);
      const newVal = quizFailedSet.size;
      cnt.textContent = newVal;
      if (oldVal !== newVal) {
        cnt.classList.remove("count-bump");
        void cnt.offsetWidth;
        cnt.classList.add("count-bump");
      }
    }
  } else if (pill) {
    pill.classList.remove("show");
  }
}

function showQuizResults() {
  const total = quizOriginalTotal || quizQuestions.length;
  const pct = Math.round((quizOk / Math.max(1, total)) * 100);
  quizPracticeMode = false;
  showQuizPracticePill(false);
  // Goals: count quizzes finished + perfect quizzes
  if (typeof goalsOnQuizFinished === "function") {
    goalsOnQuizFinished({ correct: quizOk, wrong: quizNo, total: total });
  }

  document.getElementById("progressFill").style.width = "100%";
  document.getElementById("progressLabel").textContent = `${total} / ${total}`;
  document.getElementById("scoreCorrect").textContent = quizOk;
  document.getElementById("scoreSkip").textContent = quizNo;

  const qStackCards = document.getElementById("qStackCards");
  qStackCards.classList.add("results-mode");

  document.getElementById("qDirRow").style.display = "none";

  const qResultScreen = document.getElementById("quizResultScreen");
  const emoji = pct >= 90 ? "🏆" : pct >= 70 ? "🎉" : pct >= 50 ? "💪" : "📚";
  const title = pct >= 90 ? "Outstanding!" : pct >= 70 ? "Great work!" : pct >= 50 ? "Good effort!" : "Keep going!";
  const message = pct >= 90 ? "You nailed every conjugation."
    : pct >= 70 ? "Solid progress — almost there."
      : pct >= 50 ? "Practice a bit more and you'll get it."
        : "Repetition is the key. Don't stop now.";

  qResultScreen.innerHTML = `
    <div class="qresult-emoji">${emoji}</div>
    <div class="qresult-title">${title}</div>
    <p class="qresult-msg">${message}</p>
    <div class="qresult-stats">
      <div class="qrs ok"><b>${quizOk}</b><span>Correct</span></div>
      <div class="qrs no"><b>${quizNo}</b><span>Wrong</span></div>
      <div class="qrs score"><b>${pct}%</b><span>Score</span></div>
    </div>
    <div class="qresult-btns">
      <button class="restart-btn" onclick="startQuiz()">Retry Quiz 🔄</button>
      <button class="restart-btn share-btn" onclick="shareResults('quiz')" type="button">Share Results 📤</button>
      <button class="restart-btn quiz-back-btn" onclick="backToCards()">Back to Cards</button>
    </div>
  `;
  qResultScreen.classList.add("show");
}

/* ── Back to cards ── */
function backToCards() {
  if (bubbleRAF) { cancelAnimationFrame(bubbleRAF); bubbleRAF = null; }
  showQuizPracticePill(false);
  quizPracticeMode = false;
  document.querySelector(".score-correct .score-lbl").textContent = "Learned";
  document.querySelector(".score-skip    .score-lbl").textContent = "Skipped";
  const qResultScreen = document.getElementById("quizResultScreen");
  if (qResultScreen) qResultScreen.classList.remove("show");
  document.getElementById("quizScreen").style.display = "none";
  buildDeck();
  document.getElementById("stage").style.display = "flex";
  renderCard(true);
}
