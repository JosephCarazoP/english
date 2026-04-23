/* ── CONFIGURACIÓN DE INICIO  ── */
// Nota: Meses van de 0 a 11 (Abril es 3).
const START_DATE = new Date(2026, 3, 23);

/* ── DATA ── */
const ALL_VERBS = [
  /* --- GRUPO PRIORITARIO (Día 1 y parte del 2) --- */
  { present: "bear", past: "bore", participle: "borne", type: "irregular", sound: "", sentence: "I can't <b>bear</b> the cold. She <b>bore</b> the pain.", gif: "bear heavy" },
  { present: "buy", past: "bought", participle: "bought", type: "irregular", sound: "", sentence: "I <b>buy</b> food. I <b>bought</b> a gift.", gif: "buying" },
  { present: "drive", past: "drove", participle: "driven", type: "irregular", sound: "", sentence: "<b>Drive</b> slowly. He <b>drove</b> home.", gif: "driving" },
  { present: "eat", past: "ate", participle: "eaten", type: "irregular", sound: "", sentence: "Let's <b>eat</b>. We <b>ate</b> pizza.", gif: "eating" },
  { present: "find", past: "found", participle: "found", type: "irregular", sound: "", sentence: "<b>Find</b> the key. I <b>found</b> it.", gif: "find" },
  { present: "grow", past: "grew", participle: "grown", type: "irregular", sound: "", sentence: "Plants <b>grow</b>. He <b>grew</b> tall.", gif: "growing" },
  { present: "have", past: "had", participle: "had", type: "irregular", sound: "", sentence: "I <b>have</b> time. We <b>had</b> fun.", gif: "having" },
  { present: "know", past: "knew", participle: "known", type: "irregular", sound: "", sentence: "I <b>know</b> you. I <b>knew</b> that.", gif: "smart" },
  { present: "lose", past: "lost", participle: "lost", type: "irregular", sound: "", sentence: "Don't <b>lose</b> it. I <b>lost</b> my way.", gif: "lost" },
  { present: "meet", past: "met", participle: "met", type: "irregular", sound: "", sentence: "<b>Meet</b> me here. We <b>met</b> before.", gif: "meeting" },
  { present: "read", past: "read", participle: "read", type: "irregular", sound: "", sentence: "<b>Read</b> a book. I <b>read</b> the news.", gif: "reading" },
  { present: "speak", past: "spoke", participle: "spoken", type: "irregular", sound: "", sentence: "<b>Speak</b> up. He <b>spoke</b> to me.", gif: "speaking" },
  { present: "swim", past: "swam", participle: "swum", type: "irregular", sound: "", sentence: "I <b>swim</b> daily. We <b>swam</b> fast.", gif: "swimming" },
  { present: "take", past: "took", participle: "taken", type: "irregular", sound: "", sentence: "<b>Take</b> a seat. She <b>took</b> the bus.", gif: "taking" },
  { present: "write", past: "wrote", participle: "written", type: "irregular", sound: "", sentence: "<b>Write</b> a note. I <b>wrote</b> it.", gif: "writing" },
  { present: "visit", past: "visited", participle: "visited", type: "regular", sound: "/id/", sentence: "<b>Visit</b> Rome. We <b>visited</b> them.", gif: "visiting" },
  { present: "paint", past: "painted", participle: "painted", type: "regular", sound: "/id/", sentence: "I <b>paint</b>. She <b>painted</b> a bird.", gif: "painting" },
  { present: "cook", past: "cooked", participle: "cooked", type: "regular", sound: "/t/", sentence: "<b>Cook</b> dinner. He <b>cooked</b> eggs.", gif: "cooking" },
  { present: "talk", past: "talked", participle: "talked", type: "regular", sound: "/t/", sentence: "<b>Talk</b> to me. We <b>talked</b> a lot.", gif: "talking" },
  { present: "walk", past: "walked", participle: "walked", type: "regular", sound: "/t/", sentence: "<b>Walk</b> fast. I <b>walked</b> home.", gif: "walking" },
  { present: "work", past: "worked", participle: "worked", type: "regular", sound: "/t/", sentence: "I <b>work</b> now. He <b>worked</b> late.", gif: "working" },
  { present: "watch", past: "watched", participle: "watched", type: "regular", sound: "/t/", sentence: "<b>Watch</b> this. We <b>watched</b> TV.", gif: "watching" },
  { present: "laugh", past: "laughed", participle: "laughed", type: "regular", sound: "/t/", sentence: "Don't <b>laugh</b>. She <b>laughed</b>.", gif: "laughing" },
  { present: "listen", past: "listened", participle: "listened", type: "regular", sound: "/d/", sentence: "<b>Listen</b>! I <b>listened</b> well.", gif: "listening" },
  { present: "play", past: "played", participle: "played", type: "regular", sound: "/d/", sentence: "<b>Play</b> music. We <b>played</b>.", gif: "playing" },
  { present: "call", past: "called", participle: "called", type: "regular", sound: "/d/", sentence: "<b>Call</b> me. She <b>called</b> you.", gif: "calling" },

  /* --- RESTO DE LA LISTA (Irregulares) --- */
  { present: "arise", past: "arose", participle: "arisen", type: "irregular", sound: "", sentence: "Problems <b>arise</b>. Hope <b>arose</b>.", gif: "rising" },
  { present: "awake", past: "awoke", participle: "awoken", type: "irregular", sound: "", sentence: "I <b>awake</b> early. He <b>awoke</b>.", gif: "awake" },
  { present: "be", past: "was / were", participle: "been", type: "irregular", sound: "", sentence: "Just <b>be</b> you. I <b>was</b> there.", gif: "being" },
  { present: "beat", past: "beat", participle: "beaten", type: "irregular", sound: "", sentence: "<b>Beat</b> it! We <b>beat</b> the record.", gif: "beat" },
  { present: "become", past: "became", participle: "become", type: "irregular", sound: "", sentence: "<b>Become</b> strong. He <b>became</b> king.", gif: "transformation" },
  { present: "begin", past: "began", participle: "begun", type: "irregular", sound: "", sentence: "<b>Begin</b> now. It <b>began</b> late.", gif: "starting" },
  { present: "bend", past: "bent", participle: "bent", type: "irregular", sound: "", sentence: "<b>Bend</b> the metal. I <b>bent</b> it.", gif: "bending" },
  { present: "bet", past: "bet", participle: "bet", type: "irregular", sound: "", sentence: "I <b>bet</b> on you. He <b>bet</b> money.", gif: "betting" },
  { present: "bite", past: "bit", participle: "bit / bitten", type: "irregular", sound: "", sentence: "Don't <b>bite</b>. The dog <b>bit</b> me.", gif: "bite" },
  { present: "blow", past: "blew", participle: "blown", type: "irregular", sound: "", sentence: "<b>Blow</b> bubbles. Wind <b>blew</b>.", gif: "blowing" },
  { present: "break", past: "broke", participle: "broken", type: "irregular", sound: "", sentence: "Don't <b>break</b> it. It <b>broke</b>.", gif: "broken" },
  { present: "bring", past: "brought", participle: "brought", type: "irregular", sound: "", sentence: "<b>Bring</b> help. I <b>brought</b> food.", gif: "carrying" },
  { present: "choose", past: "chose", participle: "chosen", type: "irregular", sound: "", sentence: "<b>Choose</b> well. I <b>chose</b> this.", gif: "choosing" },
  { present: "come", past: "came", participle: "come", type: "irregular", sound: "", sentence: "<b>Come</b> here. They <b>came</b> back.", gif: "coming" },
  { present: "cut", past: "cut", participle: "cut", type: "irregular", sound: "", sentence: "<b>Cut</b> the paper. I <b>cut</b> it.", gif: "cutting" },
  { present: "do", past: "did", participle: "done", type: "irregular", sound: "", sentence: "Just <b>do</b> it. I <b>did</b> my job.", gif: "doing" },
  { present: "drink", past: "drank", participle: "drunk", type: "irregular", sound: "", sentence: "<b>Drink</b> water. He <b>drank</b> juice.", gif: "drinking" },
  { present: "fall", past: "fell", participle: "fallen", type: "irregular", sound: "", sentence: "Don't <b>fall</b>. She <b>fell</b> down.", gif: "falling" },
  { present: "forget", past: "forgot", participle: "forgotten", type: "irregular", sound: "", sentence: "I <b>forget</b> names. I <b>forgot</b>.", gif: "forget" },
  { present: "get", past: "got", participle: "got / gotten", type: "irregular", sound: "", sentence: "<b>Get</b> ready. I <b>got</b> a prize.", gif: "getting" },
  { present: "give", past: "gave", participle: "given", type: "irregular", sound: "", sentence: "<b>Give</b> thanks. He <b>gave</b> me this.", gif: "giving" },
  { present: "go", past: "went", participle: "gone", type: "irregular", sound: "", sentence: "<b>Go</b> home. They <b>went</b> out.", gif: "going" },
  { present: "make", past: "made", participle: "made", type: "irregular", sound: "", sentence: "<b>Make</b> a wish. I <b>made</b> lunch.", gif: "making" },
  { present: "see", past: "saw", participle: "seen", type: "irregular", sound: "", sentence: "I <b>see</b> you. I <b>saw</b> a movie.", gif: "seeing" },
  { present: "sing", past: "sang", participle: "sung", type: "irregular", sound: "", sentence: "<b>Sing</b> a song. We <b>sang</b> loud.", gif: "singing" },
  { present: "sleep", past: "slept", participle: "slept", type: "irregular", sound: "", sentence: "<b>Sleep</b> well. I <b>slept</b> 8 hours.", gif: "sleeping" },
  { present: "think", past: "thought", participle: "thought", type: "irregular", sound: "", sentence: "<b>Think</b> fast. I <b>thought</b> so.", gif: "thinking" },
  { present: "win", past: "won", participle: "won", type: "irregular", sound: "", sentence: "<b>Win</b> the game. We <b>won</b>!", gif: "winning" },

  /* --- RESTO DE REGULARES POR SONIDO --- */
  // /id/ sound
  { present: "accept", past: "accepted", participle: "accepted", type: "regular", sound: "/id/", sentence: "<b>Accept</b> it. I <b>accepted</b>.", gif: "yes" },
  { present: "count", past: "counted", participle: "counted", type: "regular", sound: "/id/", sentence: "<b>Count</b> to ten. He <b>counted</b>.", gif: "numbers" },
  { present: "need", past: "needed", participle: "needed", type: "regular", sound: "/id/", sentence: "I <b>need</b> help. You <b>needed</b> me.", gif: "need" },
  { present: "start", past: "started", participle: "started", type: "regular", sound: "/id/", sentence: "<b>Start</b> now. It <b>started</b>.", gif: "start" },
  { present: "want", past: "wanted", participle: "wanted", type: "regular", sound: "/id/", sentence: "I <b>want</b> cake. She <b>wanted</b> it.", gif: "want" },
  // /t/ sound
  { present: "ask", past: "asked", participle: "asked", type: "regular", sound: "/t/", sentence: "<b>Ask</b> him. I <b>asked</b> why.", gif: "asking" },
  { present: "dance", past: "danced", participle: "danced", type: "regular", sound: "/t/", sentence: "Let's <b>dance</b>. We <b>danced</b>.", gif: "dancing" },
  { present: "finish", past: "finished", participle: "finished", type: "regular", sound: "/t/", sentence: "<b>Finish</b> it. I <b>finished</b>.", gif: "finish" },
  { present: "help", past: "helped", participle: "helped", type: "regular", sound: "/t/", sentence: "<b>Help</b> me! You <b>helped</b> us.", gif: "help" },
  { present: "look", past: "looked", participle: "looked", type: "regular", sound: "/t/", sentence: "<b>Look</b>! I <b>looked</b> at you.", gif: "looking" },
  // /d/ sound
  { present: "answer", past: "answered", participle: "answered", type: "regular", sound: "/d/", sentence: "<b>Answer</b> me. He <b>answered</b>.", gif: "answering" },
  { present: "clean", past: "cleaned", participle: "cleaned", type: "regular", sound: "/d/", sentence: "<b>Clean</b> up. We <b>cleaned</b> it.", gif: "cleaning" },
  { present: "love", past: "loved", participle: "loved", type: "regular", sound: "/d/", sentence: "I <b>love</b> it. She <b>loved</b> you.", gif: "love" },
  { present: "open", past: "opened", participle: "opened", type: "regular", sound: "/d/", sentence: "<b>Open</b> it. I <b>opened</b> it.", gif: "opening" },
  { present: "stay", past: "stayed", participle: "stayed", type: "regular", sound: "/d/", sentence: "<b>Stay</b> here. I <b>stayed</b>.", gif: "stay" }
];

const GIPHY_KEY = typeof process !== 'undefined' ? process.env.GIPHY_KEY : "";

let deck = [];
let cursor = 0;
let isFlipped = false;
let correct = 0;
let skipped = 0;
let currentFilter = "all";

/* ── HELPERS ── */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function colorIdx(verb) {
  return ALL_VERBS.indexOf(verb) % 10;
}

/* ── DECK ── */
function buildDeck() {

  updateDeck();

  const base = currentFilter === "all"
    ? deck
    : deck.filter(v => v.type === currentFilter);

  deck = shuffle(base);
  cursor = 0;
  correct = 0;
  skipped = 0;
  isFlipped = false;
}

/* ── RENDER CARD ── */
function renderCard(animate = true) {
  const verb = deck[cursor];

  // Show stage, hide finish
  document.getElementById("stage").style.display = "flex";
  document.getElementById("finishScreen").classList.remove("show");

  // Reset flip state
  const scene = document.getElementById("cardScene");
  isFlipped = false;
  scene.classList.remove("flipped");
  document.getElementById("actions").classList.remove("visible");
  document.getElementById("sideHint").textContent = "Present tense";

  // Card color
  scene.className = `card-scene col-${colorIdx(verb)}`;

  // Card content
  document.getElementById("cardPresent").textContent = verb.present;
  document.getElementById("cardPast").textContent = verb.past;
  document.getElementById("cardPresentRef").textContent = `← ${verb.present}`;

  const badge = document.getElementById("cardBadge");
  badge.textContent = verb.type === "irregular" ? "Irregular" : "Regular";
  badge.className = "type-badge " + (verb.type === "irregular" ? "badge-irr" : "badge-reg");

  // Progress
  const pct = (cursor / deck.length) * 100;
  document.getElementById("progressFill").style.width = pct + "%";
  document.getElementById("progressLabel").textContent = `${cursor + 1} / ${deck.length}`;
  document.getElementById("scoreCorrect").textContent = correct;
  document.getElementById("scoreSkip").textContent = skipped;

  // Entrance animation
  if (animate) {
    scene.classList.remove("animate");
    void scene.offsetWidth; // force reflow
    scene.classList.add("animate");
  }
}

/* ── FLIP ── */
function toggleFlip() {
  const scene = document.getElementById("cardScene");
  isFlipped = !isFlipped; // Alterna el estado (verdadero/falso)

  if (isFlipped) {
    // Código para mostrar el reverso
    scene.classList.add("flipped");
    document.getElementById("sideHint").textContent = "Past tense";
    setTimeout(() => {
      document.getElementById("actions").classList.add("visible");
    }, 350);
  } else {
    // Código para volver al frente
    scene.classList.remove("flipped");
    document.getElementById("sideHint").textContent = "Present tense";
    document.getElementById("actions").classList.remove("visible"); // Oculta los botones al volver al frente
  }
}

/* ── DECK PROGRESSIÓN DIARIA ── */
function updateDeck() {
  const today = new Date();
  const timeDiff = today - START_DATE;
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  // Desbloquea 10 nuevos cada día. Día 0 = 10 verbos. Día 1 = 20 verbos...
  const verbsToUnlock = Math.max(10, (daysDiff + 1) * 10);

  // Cortamos la lista total hasta el límite actual
  deck = ALL_VERBS.slice(0, Math.min(verbsToUnlock, ALL_VERBS.length));

  console.log(`Día ${daysDiff}: ${deck.length} verbos desbloqueados.`);
}

// Llama a esta función al iniciar la página
updateDeck();

/* ── NEXT CARD ── */
function next() {
  cursor++;
  if (cursor >= deck.length) {
    showFinish();
  } else {
    renderCard(true);
  }
}

/* ── FINISH ── */
function showFinish() {
  document.getElementById("stage").style.display = "none";
  document.getElementById("finishScreen").classList.add("show");

  const pct = Math.round((correct / deck.length) * 100);

  document.getElementById("fCorrect").textContent = correct;
  document.getElementById("fSkip").textContent = skipped;
  document.getElementById("fTotal").textContent = deck.length;
  document.getElementById("finishSubtitle").textContent =
    pct >= 80 ? "Excellent work! 🔥"
      : pct >= 50 ? "Good progress, keep going!"
        : "Keep practicing, you'll get there!";
  document.getElementById("finishEmoji").textContent =
    pct >= 80 ? "🎉" : pct >= 50 ? "💪" : "📚";

  document.getElementById("progressFill").style.width = "100%";
  document.getElementById("progressLabel").textContent = `${deck.length} / ${deck.length}`;
}

/* ── DETAIL MODAL ── */
async function openDetail() {
  const verb = deck[cursor];

  const soundHTML = verb.sound ? `<span class="sound-tag">${verb.sound}</span>` : "";

  document.getElementById("modalPresent").innerHTML = `${verb.present} ${soundHTML}`;
  document.getElementById("modalPast").textContent = verb.past;
  document.getElementById("modalSentence").innerHTML = verb.sentence;

  const badge = document.getElementById("modalBadge");
  badge.textContent = verb.type === "irregular" ? "Irregular" : "Regular";
  badge.style.background = verb.type === "irregular" ? "var(--text)" : "var(--progress-bg)";
  badge.style.color = verb.type === "irregular" ? "var(--bg)" : "var(--subtext)";

  const gifEl = document.getElementById("modalGif");
  gifEl.innerHTML = `<span class="gif-msg">Loading GIF…</span>`;

  document.getElementById("overlay").classList.add("open");
  document.body.style.overflow = "hidden";

  try {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${encodeURIComponent(verb.gif)}&limit=6&rating=g`;
    const res = await fetch(url);

    // Nueva validación de errores:
    if (!res.ok) {
      if (res.status === 401 || res.status === 403) throw new Error("API Key inválida o expirada.");
      if (res.status === 429) throw new Error("Límite de GIFs alcanzado.");
      throw new Error("Error de conexión con Giphy.");
    }

    const json = await res.json();

    if (json.data?.length) {
      const pick = json.data[Math.floor(Math.random() * json.data.length)];
      gifEl.innerHTML = `<img src="${pick.images.fixed_height.url}" alt="${verb.gif}" />`;
    } else {
      gifEl.innerHTML = `<span class="gif-msg">No se encontró un GIF</span>`;
    }
  } catch (error) {
    // Ahora te mostrará el motivo real del fallo en la pantalla
    console.error(error);
    gifEl.innerHTML = `<span class="gif-msg" style="color: red; text-transform: none;">Error: ${error.message}</span>`;
  }
}

function closeModal() {
  document.getElementById("overlay").classList.remove("open");
  document.body.style.overflow = "";
}

/* ── THEME ── */
let dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme();

function applyTheme() {
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  document.getElementById("themeToggle").textContent = dark ? "☀︎" : "☾";
}

/* ── EVENT LISTENERS ── */

// Reemplaza el Event Listener del "cardScene" actual por este:
document.getElementById("cardScene").addEventListener("click", (e) => {
  // Ignora el clic si se hizo sobre la zona de los botones de acción
  if (e.target.closest("#actions")) return;

  // Ahora solo voltea la carta (ya no abre el modal)
  toggleFlip();
});

// Action buttons
document.getElementById("btnCorrect").addEventListener("click", (e) => {
  e.stopPropagation();
  correct++;
  next();
});

document.getElementById("btnSkip").addEventListener("click", (e) => {
  e.stopPropagation();
  skipped++;
  next();
});

document.getElementById("btnDetail").addEventListener("click", (e) => {
  e.stopPropagation();
  openDetail();
});

// Restart
document.getElementById("restartBtn").addEventListener("click", () => {
  buildDeck();
  document.getElementById("finishScreen").classList.remove("show");
  document.getElementById("stage").style.display = "flex";
  renderCard(true);
});

// Modal close
document.getElementById("modalClose").addEventListener("click", closeModal);

document.getElementById("overlay").addEventListener("click", (e) => {
  if (e.target === document.getElementById("overlay")) closeModal();
});

// Filter buttons
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    buildDeck();
    document.getElementById("finishScreen").classList.remove("show");
    document.getElementById("stage").style.display = "flex";
    renderCard(true);
  });
});

// Shuffle button
document.getElementById("shuffleBtn").addEventListener("click", () => {
  buildDeck();
  document.getElementById("finishScreen").classList.remove("show");
  document.getElementById("stage").style.display = "flex";
  renderCard(true);
});

// Theme toggle
document.getElementById("themeToggle").addEventListener("click", () => {
  dark = !dark;
  applyTheme();
});

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { closeModal(); return; }
  if (document.getElementById("overlay").classList.contains("open")) return;
  if (document.getElementById("finishScreen").classList.contains("show")) return;

  if ((e.key === " " || e.key === "ArrowUp") && !isFlipped) {
    e.preventDefault();
    flipCard();
  }
  if (e.key === "ArrowRight" && isFlipped) { correct++; next(); }
  if (e.key === "ArrowLeft" && isFlipped) { skipped++; next(); }
});

/* ── INIT ── */
buildDeck();
renderCard(false);