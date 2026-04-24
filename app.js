/* ── CONFIGURACIÓN DE INICIO  ── */
// Nota: Meses van de 0 a 11 (Abril es 3).
const START_DATE = new Date(2026, 3, 23);

/* ── DATA ── */
const ALL_VERBS = [
  /* --- GRUPO PRIORITARIO --- */
  { present: "bear", past: "bore", participle: "borne", type: "irregular", sound: "", sentencePres: "Some people cannot <b>bear</b> the cold weather.", sentencePast: "She <b>bore</b> the pain with great courage.", gif: "bear heavy" },
  { present: "buy", past: "bought", participle: "bought", type: "irregular", sound: "", sentencePres: "I <b>buy</b> fresh vegetables every morning.", sentencePast: "Yesterday, I <b>bought</b> a gift for my mother.", gif: "buying" },
  { present: "drive", past: "drove", participle: "driven", type: "irregular", sound: "", sentencePres: "Please <b>drive</b> slowly near the school.", sentencePast: "He <b>drove</b> all night to get to the beach.", gif: "driving" },
  { present: "eat", past: "ate", participle: "eaten", type: "irregular", sound: "", sentencePres: "I always <b>eat</b> breakfast at 7:00 AM.", sentencePast: "We <b>ate</b> a delicious pizza last night.", gif: "eating" },
  { present: "find", past: "found", participle: "found", type: "irregular", sound: "", sentencePres: "It is hard to <b>find</b> a parking spot here.", sentencePast: "I <b>found</b> my lost keys under the sofa.", gif: "find" },
  { present: "grow", past: "grew", participle: "grown", type: "irregular", sound: "", sentencePres: "Plants <b>grow</b> faster with enough sunlight.", sentencePast: "The city <b>grew</b> quickly in the last decade.", gif: "growing" },
  { present: "have", past: "had", participle: "had", type: "irregular", sound: "", sentencePres: "I <b>have</b> two brothers and one sister.", sentencePast: "We <b>had</b> a great time at the party.", gif: "having" },
  { present: "know", past: "knew", participle: "known", type: "irregular", sound: "", sentencePres: "I <b>know</b> the answer to your question.", sentencePast: "I <b>knew</b> you were going to call me.", gif: "smart" },
  { present: "lose", past: "lost", participle: "lost", type: "irregular", sound: "", sentencePres: "Don't <b>lose</b> your passport at the airport.", sentencePast: "Our team <b>lost</b> the game by one goal.", gif: "lost" },
  { present: "meet", past: "met", participle: "met", type: "irregular", sound: "", sentencePres: "I want to <b>meet</b> your new friends.", sentencePast: "We <b>met</b> for the first time in high school.", gif: "meeting" },
  { present: "read", past: "read", participle: "read", type: "irregular", sound: "", sentencePres: "You should <b>read</b> the instructions carefully.", sentencePast: "Last night, I <b>read</b> a very long article.", gif: "reading" },
  { present: "speak", past: "spoke", participle: "spoken", type: "irregular", sound: "", sentencePres: "Can you <b>speak</b> more slowly, please?", sentencePast: "He <b>spoke</b> to the manager about the problem.", gif: "speaking" },
  { present: "swim", past: "swam", participle: "swum", type: "irregular", sound: "", sentencePres: "I <b>swim</b> in the pool every Saturday.", sentencePast: "We <b>swam</b> in the ocean during our vacation.", gif: "swimming" },
  { present: "take", past: "took", participle: "taken", type: "irregular", sound: "", sentencePres: "Remember to <b>take</b> your umbrella with you.", sentencePast: "She <b>took</b> the bus to go to the city center.", gif: "taking" },
  { present: "write", past: "wrote", participle: "written", type: "irregular", sound: "", sentencePres: "I <b>write</b> in my journal every evening.", sentencePast: "He <b>wrote</b> a beautiful poem for his wife.", gif: "writing" },
  { present: "visit", past: "visited", participle: "visited", type: "regular", sound: "/id/", sentencePres: "I like to <b>visit</b> museums on weekends.", sentencePast: "They <b>visited</b> many countries last year.", gif: "visiting" },
  { present: "paint", past: "painted", participle: "painted", type: "regular", sound: "/id/", sentencePres: "She wants to <b>paint</b> her room blue.", sentencePast: "He <b>painted</b> a beautiful landscape yesterday.", gif: "painting" },
  { present: "cook", past: "cooked", participle: "cooked", type: "regular", sound: "/t/", sentencePres: "I often <b>cook</b> dinner for my family.", sentencePast: "He <b>cooked</b> a special meal for her birthday.", gif: "cooking" },
  { present: "talk", past: "talked", participle: "talked", type: "regular", sound: "/t/", sentencePres: "We need to <b>talk</b> about the new project.", sentencePast: "I <b>talked</b> to the teacher after the class.", gif: "talking" },
  { present: "walk", past: "walked", participle: "walked", type: "regular", sound: "/t/", sentencePres: "I <b>walk</b> to work when the weather is nice.", sentencePast: "We <b>walked</b> for three miles in the park.", gif: "walking" },
  { present: "work", past: "worked", participle: "worked", type: "regular", sound: "/t/", sentencePres: "They <b>work</b> in a very large office.", sentencePast: "She <b>worked</b> until late last Friday night.", gif: "working" },
  { present: "watch", past: "watched", participle: "watched", type: "regular", sound: "/t/", sentencePres: "Do you want to <b>watch</b> a movie tonight?", sentencePast: "We <b>watched</b> the football game on TV.", gif: "watching" },
  { present: "laugh", past: "laughed", participle: "laughed", type: "regular", sound: "/t/", sentencePres: "Funny movies make me <b>laugh</b> a lot.", sentencePast: "She <b>laughed</b> at the joke I told her.", gif: "laughing" },
  { present: "listen", past: "listened", participle: "listened", type: "regular", sound: "/d/", sentencePres: "I <b>listen</b> to music while I study.", sentencePast: "He <b>listened</b> carefully to the instructions.", gif: "listening" },
  { present: "play", past: "played", participle: "played", type: "regular", sound: "/d/", sentencePres: "The children <b>play</b> in the garden every day.", sentencePast: "We <b>played</b> soccer for two hours yesterday.", gif: "playing" },
  { present: "call", past: "called", participle: "called", type: "regular", sound: "/d/", sentencePres: "I will <b>call</b> you as soon as I arrive.", sentencePast: "She <b>called</b> her mother this morning.", gif: "calling" },

  /* --- IRREGULARES RESTO --- */
  { present: "arise", past: "arose", participle: "arisen", type: "irregular", sound: "", sentencePres: "New problems <b>arise</b> every single day.", sentencePast: "A huge conflict <b>arose</b> during the meeting.", gif: "rising" },
  { present: "awake", past: "awoke", participle: "awoken", type: "irregular", sound: "", sentencePres: "I usually <b>awake</b> when the sun rises.", sentencePast: "He <b>awoke</b> suddenly in the middle of the night.", gif: "awake" },
  { present: "be", past: "was / were", participle: "been", type: "irregular", sound: "", sentencePres: "Please <b>be</b> patient with the new students.", sentencePast: "I <b>was</b> very happy to see you yesterday.", gif: "being" },
  { present: "beat", past: "beat", participle: "beaten", type: "irregular", sound: "", sentencePres: "Can you <b>beat</b> the high score in this game?", sentencePast: "They <b>beat</b> the rival team last Saturday.", gif: "beat" },
  { present: "become", past: "became", participle: "become", type: "irregular", sound: "", sentencePres: "It is hard to <b>become</b> a professional doctor.", sentencePast: "He <b>became</b> a famous singer in a short time.", gif: "transformation" },
  { present: "begin", past: "began", participle: "begun", type: "irregular", sound: "", sentencePres: "The classes <b>begin</b> at eight in the morning.", sentencePast: "It <b>began</b> to rain just after we left home.", gif: "starting" },
  { present: "bend", past: "bent", participle: "bent", type: "irregular", sound: "", sentencePres: "Be careful not to <b>bend</b> the credit card.", sentencePast: "He <b>bent</b> the metal pipe with his hands.", gif: "bending" },
  { present: "bet", past: "bet", participle: "bet", type: "irregular", sound: "", sentencePres: "I <b>bet</b> you can't finish that huge burger.", sentencePast: "He <b>bet</b> all his money and lost it all.", gif: "betting" },
  { present: "bite", past: "bit", participle: "bit / bitten", type: "irregular", sound: "", sentencePres: "Be careful! That dog might <b>bite</b> you.", sentencePast: "A mosquito <b>bit</b> me on the arm last night.", gif: "bite" },
  { present: "blow", past: "blew", participle: "blown", type: "irregular", sound: "", sentencePres: "The kids love to <b>blow</b> soap bubbles.", sentencePast: "A strong wind <b>blew</b> the leaves away.", gif: "blowing" },
  { present: "break", past: "broke", participle: "broken", type: "irregular", sound: "", sentencePres: "If you <b>break</b> the rules, you will be punished.", sentencePast: "The glass <b>broke</b> into a thousand pieces.", gif: "broken" },
  { present: "bring", past: "brought", participle: "brought", type: "irregular", sound: "", sentencePres: "Always <b>bring</b> your notebook to the class.", sentencePast: "She <b>brought</b> some cookies for the party.", gif: "carrying" },
  { present: "choose", past: "chose", participle: "chosen", type: "irregular", sound: "", sentencePres: "You must <b>choose</b> the correct answer now.", sentencePast: "I <b>chose</b> the red shirt instead of the blue one.", gif: "choosing" },
  { present: "come", past: "came", participle: "come", type: "irregular", sound: "", sentencePres: "Please <b>come</b> to my house this afternoon.", sentencePast: "They <b>came</b> back from their trip yesterday.", gif: "coming" },
  { present: "cut", past: "cut", participle: "cut", type: "irregular", sound: "", sentencePres: "Use these scissors to <b>cut</b> the paper.", sentencePast: "He <b>cut</b> the cake into eight equal pieces.", gif: "cutting" },
  { present: "do", past: "did", participle: "done", type: "irregular", sound: "", sentencePres: "I need to <b>do</b> my homework tonight.", sentencePast: "You <b>did</b> a very good job on the project.", gif: "doing" },
  { present: "drink", past: "drank", participle: "drunk", type: "irregular", sound: "", sentencePres: "You should <b>drink</b> eight glasses of water.", sentencePast: "He <b>drank</b> a cold soda after the race.", gif: "drinking" },
  { present: "fall", past: "fell", participle: "fallen", type: "irregular", sound: "", sentencePres: "Be careful or you will <b>fall</b> on the ice.", sentencePast: "The leaves <b>fell</b> from the trees in autumn.", gif: "falling" },
  { present: "forget", past: "forgot", participle: "forgotten", type: "irregular", sound: "", sentencePres: "I often <b>forget</b> where I put my glasses.", sentencePast: "I <b>forgot</b> to buy milk at the supermarket.", gif: "forget" },
  { present: "get", past: "got", participle: "got / gotten", type: "irregular", sound: "", sentencePres: "I need to <b>get</b> a new pair of shoes.", sentencePast: "She <b>got</b> a perfect score on her exam.", gif: "getting" },
  { present: "give", past: "gave", participle: "given", type: "irregular", sound: "", sentencePres: "Please <b>give</b> me a hand with this box.", sentencePast: "My father <b>gave</b> me this watch for my birthday.", gif: "giving" },
  { present: "go", past: "went", participle: "gone", type: "irregular", sound: "", sentencePres: "I <b>go</b> to the gym four times a week.", sentencePast: "We <b>went</b> to the cinema last Sunday.", gif: "going" },
  { present: "make", past: "made", participle: "made", type: "irregular", sound: "", sentencePres: "I like to <b>make</b> my own clothes.", sentencePast: "She <b>made</b> a delicious chocolate cake.", gif: "making" },
  { present: "see", past: "saw", participle: "seen", type: "irregular", sound: "", sentencePres: "I can <b>see</b> the mountains from my window.", sentencePast: "I <b>saw</b> a famous actor at the airport.", gif: "seeing" },
  { present: "sing", past: "sang", participle: "sung", type: "irregular", sound: "", sentencePres: "She can <b>sing</b> very high notes beautifully.", sentencePast: "We <b>sang</b> happy birthday to our friend.", gif: "singing" },
  { present: "sleep", past: "slept", participle: "slept", type: "irregular", sound: "", sentencePres: "I need to <b>sleep</b> at least seven hours.", sentencePast: "The baby <b>slept</b> peacefully all night.", gif: "sleeping" },
  { present: "think", past: "thought", participle: "thought", type: "irregular", sound: "", sentencePres: "I <b>think</b> it is going to rain today.", sentencePast: "I <b>thought</b> you were at the office.", gif: "thinking" },
  { present: "win", past: "won", participle: "won", type: "irregular", sound: "", sentencePres: "We want to <b>win</b> the championship this year.", sentencePast: "They <b>won</b> the lottery two years ago.", gif: "winning" },

  /* --- REGULARES POR SONIDO --- */
  { present: "accept", past: "accepted", participle: "accepted", type: "regular", sound: "/id/", sentencePres: "Do you <b>accept</b> credit cards here?", sentencePast: "She <b>accepted</b> the job offer immediately.", gif: "yes" },
  { present: "count", past: "counted", participle: "counted", type: "regular", sound: "/id/", sentencePres: "Can you <b>count</b> from one to twenty?", sentencePast: "He <b>counted</b> the money twice to be sure.", gif: "numbers" },
  { present: "need", past: "needed", participle: "needed", type: "regular", sound: "/id/", sentencePres: "I <b>need</b> some help with my homework.", sentencePast: "We <b>needed</b> a bigger car for the trip.", gif: "need" },
  { present: "start", past: "started", participle: "started", type: "regular", sound: "/id/", sentencePres: "The movie will <b>start</b> in five minutes.", sentencePast: "It <b>started</b> to snow early this morning.", gif: "start" },
  { present: "want", past: "wanted", participle: "wanted", type: "regular", sound: "/id/", sentencePres: "I <b>want</b> to travel around the world.", sentencePast: "He <b>wanted</b> to buy a new computer.", gif: "want" },
  { present: "ask", past: "asked", participle: "asked", type: "regular", sound: "/t/", sentencePres: "Don't be afraid to <b>ask</b> questions.", sentencePast: "I <b>asked</b> the police for directions.", gif: "asking" },
  { present: "dance", past: "danced", participle: "danced", type: "regular", sound: "/t/", sentencePres: "They <b>dance</b> salsa very well together.", sentencePast: "We <b>danced</b> all night at the wedding.", gif: "dancing" },
  { present: "finish", past: "finished", participle: "finished", type: "regular", sound: "/t/", sentencePres: "I must <b>finish</b> this report by Friday.", sentencePast: "She <b>finished</b> her dinner very quickly.", gif: "finish" },
  { present: "help", past: "helped", participle: "helped", type: "regular", sound: "/t/", sentencePres: "I am happy to <b>help</b> you with that.", sentencePast: "He <b>helped</b> me carry the heavy bags.", gif: "help" },
  { present: "look", past: "looked", participle: "looked", type: "regular", sound: "/t/", sentencePres: "Please <b>look</b> at the whiteboard now.", sentencePast: "I <b>looked</b> for my keys everywhere.", gif: "looking" },
  { present: "answer", past: "answered", participle: "answered", type: "regular", sound: "/d/", sentencePres: "I always <b>answer</b> my emails promptly.", sentencePast: "He <b>answered</b> all the questions correctly.", gif: "answering" },
  { present: "clean", past: "cleaned", participle: "cleaned", type: "regular", sound: "/d/", sentencePres: "I <b>clean</b> my bedroom every Saturday.", sentencePast: "We <b>cleaned</b> the entire house yesterday.", gif: "cleaning" },
  { present: "love", past: "loved", participle: "loved", type: "regular", sound: "/d/", sentencePres: "I <b>love</b> spending time with my family.", sentencePast: "She <b>loved</b> that movie when she was a kid.", gif: "love" },
  { present: "open", past: "opened", participle: "opened", type: "regular", sound: "/d/", sentencePres: "Could you <b>open</b> the window, please?", sentencePast: "He <b>opened</b> the door for the lady.", gif: "opening" },
  { present: "stay", past: "stayed", participle: "stayed", type: "regular", sound: "/d/", sentencePres: "I usually <b>stay</b> at home on Sundays.", sentencePast: "They <b>stayed</b> in a very nice hotel.", gif: "stay" }
];

const GIPHY_KEY = window.GIPHY_KEY || "2axlHmd0ojKiliZf0zstiEFAfdrjDrSd";

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

  // Asegurar que el escenario esté visible
  document.getElementById("stage").style.display = "flex";
  document.getElementById("finishScreen").classList.remove("show");

  const scene = document.getElementById("cardScene");

  // 1. Actualizamos el color y contenido (Los textos cambian aquí)
  scene.className = `card-scene col-${colorIdx(verb)}`;
  document.getElementById("cardPresent").textContent = verb.present;
  document.getElementById("cardPast").textContent = verb.past;
  document.getElementById("cardPresentRef").textContent = `← ${verb.present}`;

  // 2. Badge de tipo
  const badge = document.getElementById("cardBadge");
  badge.textContent = verb.type === "irregular" ? "Irregular" : "Regular";
  badge.className = "type-badge " + (verb.type === "irregular" ? "badge-irr" : "badge-reg");

  // 3. Progreso y puntuación
  const pct = (cursor / deck.length) * 100;
  document.getElementById("progressFill").style.width = pct + "%";
  document.getElementById("progressLabel").textContent = `${cursor + 1} / ${deck.length}`;
  document.getElementById("scoreCorrect").textContent = correct;
  document.getElementById("scoreSkip").textContent = skipped;

  // 4. Animación de entrada (opcional)
  if (animate) {
    scene.classList.remove("animate");
    void scene.offsetWidth; 
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

/* ── ELIMINACIÓN TOTAL DEL SPOILER ── */
function next() {
  const scene = document.getElementById("cardScene");
  const backText = document.getElementById("cardPast");

  // 1. CORTINA INVISIBLE INSTANTÁNEA
  // 'hidden' hace que el elemento desaparezca de la vista sin esperar a la opacidad
  backText.style.visibility = "hidden";
  backText.style.opacity = "0"; 
  
  // 2. Iniciamos el desvanecimiento de la carta
  scene.classList.add("fade-out");

  setTimeout(() => {
    // 3. LIMPIEZA DE DATOS EN LA OSCURIDAD
    backText.textContent = "";
    
    // 4. RESET DE GIRO
    isFlipped = false;
    scene.classList.remove("flipped");
    document.getElementById("actions").classList.remove("visible");
    document.getElementById("sideHint").textContent = "Present tense";
    
    cursor++;

    if (cursor >= deck.length) {
      showFinish();
      // Limpiamos estados para el reinicio
      scene.classList.remove("fade-out");
      backText.style.visibility = "visible";
      backText.style.opacity = "1";
    } else {
      // 5. CARGAMOS NUEVO VERBO
      renderCard(false);

      // 6. ENTRADA SUAVE
      // Esperamos un poco más para asegurar que el renderCard terminó
      setTimeout(() => {
        scene.classList.remove("fade-out");
        // Devolvemos la visibilidad solo cuando la carta ya está de frente
        backText.style.visibility = "visible";
        backText.style.opacity = "1";
      }, 100);
    }
  }, 400); 
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
  document.getElementById("modalSentencePres").innerHTML = verb.sentencePres;
  document.getElementById("modalSentencePast").innerHTML = verb.sentencePast;

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

  // CAMBIO AQUÍ: flipCard -> toggleFlip
  if ((e.key === " " || e.key === "ArrowUp") && !isFlipped) {
    e.preventDefault();
    toggleFlip(); 
  }
  if (e.key === "ArrowRight" && isFlipped) { correct++; next(); }
  if (e.key === "ArrowLeft" && isFlipped) { skipped++; next(); }
});

/* ── LÓGICA DEL QUIZ (EL MOTOR) ── */
let currentQuiz = [];
let quizIdx = 0;
let quizCorrectScore = 0; // Contador de aciertos
let quizWrongScore = 0;   // Contador de errores

function startQuiz() {
  currentQuiz = generateQuiz();
  quizIdx = 0;
  quizCorrectScore = 0; // Reiniciamos puntajes
  quizWrongScore = 0;

  document.getElementById("finishScreen").classList.remove("show");
  document.getElementById("stage").style.display = "none";
  document.getElementById("quizScreen").style.display = "flex";

  renderQuizQuestion();
}

function generateQuiz() {
  // Usamos 'deck' porque son los verbos que el alumno acaba de ver
  return deck.map(verb => {
    const isSentenceType = Math.random() > 0.5;
    
    if (isSentenceType) {
      const usePast = Math.random() > 0.5;
      const originalSentence = usePast ? verb.sentencePast : verb.sentencePres;
      const correctAnswer = usePast ? verb.past : verb.present;
      
      // Reemplazamos el verbo por una línea ______
      const questionText = originalSentence
        .replace(/<[^>]*>/g, "") 
        .replace(new RegExp(`\\b${correctAnswer}\\b`, "i"), "_______");

      return {
        question: `Complete: "${questionText}"`,
        options: generateOptions(correctAnswer, usePast ? "past" : "present"),
        correct: correctAnswer
      };
    } else {
      return {
        question: `What is the past tense of "${verb.present}"?`,
        options: generateOptions(verb.past, "past"),
        correct: verb.past
      };
    }
  });
}

function generateOptions(correct, mode) {
  const distractors = ALL_VERBS
    .filter(v => (mode === "past" ? v.past : v.present) !== correct)
    .map(v => (mode === "past" ? v.past : v.present));
  
  const picked = shuffle(distractors).slice(0, 3); 
  return shuffle([...picked, correct]); 
}

function renderQuizQuestion() {
  const q = currentQuiz[quizIdx];
  const questionEl = document.getElementById("quizQuestion");
  const optionsDiv = document.getElementById("quizOptions");

  questionEl.textContent = q.question;
  optionsDiv.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt, q.correct, btn);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected, correct, btn) {
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach(b => b.style.pointerEvents = "none");

  if (selected === correct) {
    quizCorrectScore++; 
    btn.style.background = "#4caf50";
    btn.style.color = "white";
  } else {
    quizWrongScore++; 
    btn.style.background = "#f44336";
    btn.style.color = "white";
    buttons.forEach(b => {
      if(b.textContent === correct) {
        b.style.background = "#4caf50";
        b.style.color = "white";
      }
    });
  }

  setTimeout(() => {
    quizIdx++;
    if (quizIdx < currentQuiz.length) {
      renderQuizQuestion();
    } else {
      showQuizResults(); // Esto mostrará el resumen final
    }
  }, 1500);
}

/* ── NUEVA PANTALLA DE RESUMEN DEL QUIZ ── */
function showQuizResults() {
  const quizContainer = document.querySelector(".quiz-container");
  const total = currentQuiz.length;
  const percentage = Math.round((quizCorrectScore / total) * 100);
  
  let message = percentage >= 80 ? "Master level! 🔥" : "Good job! Keep practicing. 💪";
  
  quizContainer.innerHTML = `
    <div style="text-align: center; padding: 20px;">
      <h2 style="font-size: 2rem; margin-bottom: 10px;">Quiz Finished!</h2>
      <p style="font-size: 1.2rem; color: var(--subtext);">${message}</p>
      
      <div style="display: flex; justify-content: space-around; margin: 30px 0; background: var(--card-bg); padding: 20px; border-radius: 15px;">
        <div>
          <div style="font-size: 2rem; font-weight: bold; color: #4caf50;">${quizCorrectScore}</div>
          <div style="font-size: 0.9rem; opacity: 0.8;">Correct</div>
        </div>
        <div>
          <div style="font-size: 2rem; font-weight: bold; color: #f44336;">${quizWrongScore}</div>
          <div style="font-size: 0.9rem; opacity: 0.8;">Wrong</div>
        </div>
        <div>
          <div style="font-size: 2rem; font-weight: bold; color: var(--text);">${total}</div>
          <div style="font-size: 0.9rem; opacity: 0.8;">Total</div>
        </div>
      </div>

      <button class="restart-btn" onclick="location.reload()" style="width: 100%; background: var(--text); color: var(--bg);">
        Back to Start
      </button>
    </div>
  `;
}

/* ── INIT ── */
buildDeck();
renderCard(false);
