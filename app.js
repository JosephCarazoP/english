/* ── CONFIGURACIÓN DE INICIO ── */
// Nota: Meses van de 0 a 11 (Abril es 3).
const START_DATE = new Date(2026, 3, 23);

/* ── DATA ── */
const ALL_VERBS = [
  /* --- GRUPO PRIORITARIO --- */
  { present: "bear",   past: "bore",        participle: "borne",       type: "irregular", sound: "",    sentencePres: "Some people cannot <b>bear</b> the cold weather.",       sentencePast: "She <b>bore</b> the pain with great courage.",            gif: "bear heavy" },
  { present: "buy",    past: "bought",       participle: "bought",      type: "irregular", sound: "",    sentencePres: "I <b>buy</b> fresh vegetables every morning.",            sentencePast: "Yesterday, I <b>bought</b> a gift for my mother.",         gif: "buying" },
  { present: "drive",  past: "drove",        participle: "driven",      type: "irregular", sound: "",    sentencePres: "Please <b>drive</b> slowly near the school.",             sentencePast: "He <b>drove</b> all night to get to the beach.",           gif: "driving" },
  { present: "eat",    past: "ate",          participle: "eaten",       type: "irregular", sound: "",    sentencePres: "I always <b>eat</b> breakfast at 7:00 AM.",               sentencePast: "We <b>ate</b> a delicious pizza last night.",              gif: "eating" },
  { present: "find",   past: "found",        participle: "found",       type: "irregular", sound: "",    sentencePres: "It is hard to <b>find</b> a parking spot here.",          sentencePast: "I <b>found</b> my lost keys under the sofa.",             gif: "find" },
  { present: "grow",   past: "grew",         participle: "grown",       type: "irregular", sound: "",    sentencePres: "Plants <b>grow</b> faster with enough sunlight.",         sentencePast: "The city <b>grew</b> quickly in the last decade.",         gif: "growing" },
  { present: "have",   past: "had",          participle: "had",         type: "irregular", sound: "",    sentencePres: "I <b>have</b> two brothers and one sister.",              sentencePast: "We <b>had</b> a great time at the party.",                gif: "having" },
  { present: "know",   past: "knew",         participle: "known",       type: "irregular", sound: "",    sentencePres: "I <b>know</b> the answer to your question.",             sentencePast: "I <b>knew</b> you were going to call me.",                gif: "smart" },
  { present: "lose",   past: "lost",         participle: "lost",        type: "irregular", sound: "",    sentencePres: "Don't <b>lose</b> your passport at the airport.",        sentencePast: "Our team <b>lost</b> the game by one goal.",              gif: "lost" },
  { present: "meet",   past: "met",          participle: "met",         type: "irregular", sound: "",    sentencePres: "I want to <b>meet</b> your new friends.",                sentencePast: "We <b>met</b> for the first time in high school.",         gif: "meeting" },
  { present: "read",   past: "read",         participle: "read",        type: "irregular", sound: "",    sentencePres: "You should <b>read</b> the instructions carefully.",     sentencePast: "Last night, I <b>read</b> a very long article.",           gif: "reading" },
  { present: "speak",  past: "spoke",        participle: "spoken",      type: "irregular", sound: "",    sentencePres: "Can you <b>speak</b> more slowly, please?",              sentencePast: "He <b>spoke</b> to the manager about the problem.",        gif: "speaking" },
  { present: "swim",   past: "swam",         participle: "swum",        type: "irregular", sound: "",    sentencePres: "I <b>swim</b> in the pool every Saturday.",              sentencePast: "We <b>swam</b> in the ocean during our vacation.",         gif: "swimming" },
  { present: "take",   past: "took",         participle: "taken",       type: "irregular", sound: "",    sentencePres: "Remember to <b>take</b> your umbrella with you.",        sentencePast: "She <b>took</b> the bus to go to the city center.",        gif: "taking" },
  { present: "write",  past: "wrote",        participle: "written",     type: "irregular", sound: "",    sentencePres: "I <b>write</b> in my journal every evening.",            sentencePast: "He <b>wrote</b> a beautiful poem for his wife.",           gif: "writing" },
  { present: "visit",  past: "visited",      participle: "visited",     type: "regular",   sound: "/id/", sentencePres: "I like to <b>visit</b> museums on weekends.",           sentencePast: "They <b>visited</b> many countries last year.",            gif: "visiting" },
  { present: "paint",  past: "painted",      participle: "painted",     type: "regular",   sound: "/id/", sentencePres: "She wants to <b>paint</b> her room blue.",              sentencePast: "He <b>painted</b> a beautiful landscape yesterday.",       gif: "painting" },
  { present: "cook",   past: "cooked",       participle: "cooked",      type: "regular",   sound: "/t/",  sentencePres: "I often <b>cook</b> dinner for my family.",             sentencePast: "He <b>cooked</b> a special meal for her birthday.",        gif: "cooking" },
  { present: "talk",   past: "talked",       participle: "talked",      type: "regular",   sound: "/t/",  sentencePres: "We need to <b>talk</b> about the new project.",          sentencePast: "I <b>talked</b> to the teacher after the class.",          gif: "talking" },
  { present: "walk",   past: "walked",       participle: "walked",      type: "regular",   sound: "/t/",  sentencePres: "I <b>walk</b> to work when the weather is nice.",        sentencePast: "We <b>walked</b> for three miles in the park.",            gif: "walking" },
  { present: "work",   past: "worked",       participle: "worked",      type: "regular",   sound: "/t/",  sentencePres: "They <b>work</b> in a very large office.",               sentencePast: "She <b>worked</b> until late last Friday night.",          gif: "working" },
  { present: "watch",  past: "watched",      participle: "watched",     type: "regular",   sound: "/t/",  sentencePres: "Do you want to <b>watch</b> a movie tonight?",          sentencePast: "We <b>watched</b> the football game on TV.",              gif: "watching" },
  { present: "laugh",  past: "laughed",      participle: "laughed",     type: "regular",   sound: "/t/",  sentencePres: "Funny movies make me <b>laugh</b> a lot.",               sentencePast: "She <b>laughed</b> at the joke I told her.",              gif: "laughing" },
  { present: "listen", past: "listened",     participle: "listened",    type: "regular",   sound: "/d/",  sentencePres: "I <b>listen</b> to music while I study.",               sentencePast: "He <b>listened</b> carefully to the instructions.",        gif: "listening" },
  { present: "play",   past: "played",       participle: "played",      type: "regular",   sound: "/d/",  sentencePres: "The children <b>play</b> in the garden every day.",     sentencePast: "We <b>played</b> soccer for two hours yesterday.",         gif: "playing" },
  { present: "call",   past: "called",       participle: "called",      type: "regular",   sound: "/d/",  sentencePres: "I will <b>call</b> you as soon as I arrive.",           sentencePast: "She <b>called</b> her mother this morning.",              gif: "calling" },
  /* --- IRREGULARES RESTO --- */
  { present: "arise",  past: "arose",        participle: "arisen",      type: "irregular", sound: "",    sentencePres: "New problems <b>arise</b> every single day.",            sentencePast: "A huge conflict <b>arose</b> during the meeting.",         gif: "rising" },
  { present: "awake",  past: "awoke",        participle: "awoken",      type: "irregular", sound: "",    sentencePres: "I usually <b>awake</b> when the sun rises.",             sentencePast: "He <b>awoke</b> suddenly in the middle of the night.",    gif: "awake" },
  { present: "be",     past: "was / were",   participle: "been",        type: "irregular", sound: "",    sentencePres: "Please <b>be</b> patient with the new students.",        sentencePast: "I <b>was</b> very happy to see you yesterday.",           gif: "being" },
  { present: "beat",   past: "beat",         participle: "beaten",      type: "irregular", sound: "",    sentencePres: "Can you <b>beat</b> the high score in this game?",       sentencePast: "They <b>beat</b> the rival team last Saturday.",          gif: "beat" },
  { present: "become", past: "became",       participle: "become",      type: "irregular", sound: "",    sentencePres: "It is hard to <b>become</b> a professional doctor.",     sentencePast: "He <b>became</b> a famous singer in a short time.",       gif: "transformation" },
  { present: "begin",  past: "began",        participle: "begun",       type: "irregular", sound: "",    sentencePres: "The classes <b>begin</b> at eight in the morning.",      sentencePast: "It <b>began</b> to rain just after we left home.",        gif: "starting" },
  { present: "bend",   past: "bent",         participle: "bent",        type: "irregular", sound: "",    sentencePres: "Be careful not to <b>bend</b> the credit card.",         sentencePast: "He <b>bent</b> the metal pipe with his hands.",           gif: "bending" },
  { present: "bet",    past: "bet",          participle: "bet",         type: "irregular", sound: "",    sentencePres: "I <b>bet</b> you can't finish that huge burger.",        sentencePast: "He <b>bet</b> all his money and lost it all.",            gif: "betting" },
  { present: "bite",   past: "bit",          participle: "bit / bitten",type: "irregular", sound: "",    sentencePres: "Be careful! That dog might <b>bite</b> you.",            sentencePast: "A mosquito <b>bit</b> me on the arm last night.",         gif: "bite" },
  { present: "blow",   past: "blew",         participle: "blown",       type: "irregular", sound: "",    sentencePres: "The kids love to <b>blow</b> soap bubbles.",             sentencePast: "A strong wind <b>blew</b> the leaves away.",             gif: "blowing" },
  { present: "break",  past: "broke",        participle: "broken",      type: "irregular", sound: "",    sentencePres: "If you <b>break</b> the rules, you will be punished.",   sentencePast: "The glass <b>broke</b> into a thousand pieces.",          gif: "broken" },
  { present: "bring",  past: "brought",      participle: "brought",     type: "irregular", sound: "",    sentencePres: "Always <b>bring</b> your notebook to the class.",        sentencePast: "She <b>brought</b> some cookies for the party.",          gif: "carrying" },
  { present: "choose", past: "chose",        participle: "chosen",      type: "irregular", sound: "",    sentencePres: "You must <b>choose</b> the correct answer now.",         sentencePast: "I <b>chose</b> the red shirt instead of the blue one.",  gif: "choosing" },
  { present: "come",   past: "came",         participle: "come",        type: "irregular", sound: "",    sentencePres: "Please <b>come</b> to my house this afternoon.",         sentencePast: "They <b>came</b> back from their trip yesterday.",        gif: "coming" },
  { present: "cut",    past: "cut",          participle: "cut",         type: "irregular", sound: "",    sentencePres: "Use these scissors to <b>cut</b> the paper.",            sentencePast: "He <b>cut</b> the cake into eight equal pieces.",         gif: "cutting" },
  { present: "do",     past: "did",          participle: "done",        type: "irregular", sound: "",    sentencePres: "I need to <b>do</b> my homework tonight.",               sentencePast: "You <b>did</b> a very good job on the project.",          gif: "doing" },
  { present: "drink",  past: "drank",        participle: "drunk",       type: "irregular", sound: "",    sentencePres: "You should <b>drink</b> eight glasses of water.",        sentencePast: "He <b>drank</b> a cold soda after the race.",             gif: "drinking" },
  { present: "fall",   past: "fell",         participle: "fallen",      type: "irregular", sound: "",    sentencePres: "Be careful or you will <b>fall</b> on the ice.",         sentencePast: "The leaves <b>fell</b> from the trees in autumn.",        gif: "falling" },
  { present: "forget", past: "forgot",       participle: "forgotten",   type: "irregular", sound: "",    sentencePres: "I often <b>forget</b> where I put my glasses.",          sentencePast: "I <b>forgot</b> to buy milk at the supermarket.",         gif: "forget" },
  { present: "get",    past: "got",          participle: "got / gotten",type: "irregular", sound: "",    sentencePres: "I need to <b>get</b> a new pair of shoes.",              sentencePast: "She <b>got</b> a perfect score on her exam.",             gif: "getting" },
  { present: "give",   past: "gave",         participle: "given",       type: "irregular", sound: "",    sentencePres: "Please <b>give</b> me a hand with this box.",            sentencePast: "My father <b>gave</b> me this watch for my birthday.",    gif: "giving" },
  { present: "go",     past: "went",         participle: "gone",        type: "irregular", sound: "",    sentencePres: "I <b>go</b> to the gym four times a week.",              sentencePast: "We <b>went</b> to the cinema last Sunday.",               gif: "going" },
  { present: "make",   past: "made",         participle: "made",        type: "irregular", sound: "",    sentencePres: "I like to <b>make</b> my own clothes.",                  sentencePast: "She <b>made</b> a delicious chocolate cake.",             gif: "making" },
  { present: "see",    past: "saw",          participle: "seen",        type: "irregular", sound: "",    sentencePres: "I can <b>see</b> the mountains from my window.",         sentencePast: "I <b>saw</b> a famous actor at the airport.",             gif: "seeing" },
  { present: "sing",   past: "sang",         participle: "sung",        type: "irregular", sound: "",    sentencePres: "She can <b>sing</b> very high notes beautifully.",       sentencePast: "We <b>sang</b> happy birthday to our friend.",            gif: "singing" },
  { present: "sleep",  past: "slept",        participle: "slept",       type: "irregular", sound: "",    sentencePres: "I need to <b>sleep</b> at least seven hours.",           sentencePast: "The baby <b>slept</b> peacefully all night.",             gif: "sleeping" },
  { present: "think",  past: "thought",      participle: "thought",     type: "irregular", sound: "",    sentencePres: "I <b>think</b> it is going to rain today.",              sentencePast: "I <b>thought</b> you were at the office.",               gif: "thinking" },
  { present: "win",    past: "won",          participle: "won",         type: "irregular", sound: "",    sentencePres: "We want to <b>win</b> the championship this year.",      sentencePast: "They <b>won</b> the lottery two years ago.",              gif: "winning" },
  /* --- REGULARES POR SONIDO --- */
  { present: "accept", past: "accepted",     participle: "accepted",    type: "regular",   sound: "/id/", sentencePres: "Do you <b>accept</b> credit cards here?",              sentencePast: "She <b>accepted</b> the job offer immediately.",          gif: "yes" },
  { present: "count",  past: "counted",      participle: "counted",     type: "regular",   sound: "/id/", sentencePres: "Can you <b>count</b> from one to twenty?",              sentencePast: "He <b>counted</b> the money twice to be sure.",           gif: "numbers" },
  { present: "need",   past: "needed",       participle: "needed",      type: "regular",   sound: "/id/", sentencePres: "I <b>need</b> some help with my homework.",             sentencePast: "We <b>needed</b> a bigger car for the trip.",             gif: "need" },
  { present: "start",  past: "started",      participle: "started",     type: "regular",   sound: "/id/", sentencePres: "The movie will <b>start</b> in five minutes.",          sentencePast: "It <b>started</b> to snow early this morning.",           gif: "start" },
  { present: "want",   past: "wanted",       participle: "wanted",      type: "regular",   sound: "/id/", sentencePres: "I <b>want</b> to travel around the world.",             sentencePast: "He <b>wanted</b> to buy a new computer.",                 gif: "want" },
  { present: "ask",    past: "asked",        participle: "asked",       type: "regular",   sound: "/t/",  sentencePres: "Don't be afraid to <b>ask</b> questions.",              sentencePast: "I <b>asked</b> the police for directions.",               gif: "asking" },
  { present: "dance",  past: "danced",       participle: "danced",      type: "regular",   sound: "/t/",  sentencePres: "They <b>dance</b> salsa very well together.",            sentencePast: "We <b>danced</b> all night at the wedding.",              gif: "dancing" },
  { present: "finish", past: "finished",     participle: "finished",    type: "regular",   sound: "/t/",  sentencePres: "I must <b>finish</b> this report by Friday.",           sentencePast: "She <b>finished</b> her dinner very quickly.",            gif: "finish" },
  { present: "help",   past: "helped",       participle: "helped",      type: "regular",   sound: "/t/",  sentencePres: "I am happy to <b>help</b> you with that.",              sentencePast: "He <b>helped</b> me carry the heavy bags.",               gif: "help" },
  { present: "look",   past: "looked",       participle: "looked",      type: "regular",   sound: "/t/",  sentencePres: "Please <b>look</b> at the whiteboard now.",             sentencePast: "I <b>looked</b> for my keys everywhere.",                 gif: "looking" },
  { present: "answer", past: "answered",     participle: "answered",    type: "regular",   sound: "/d/",  sentencePres: "I always <b>answer</b> my emails promptly.",            sentencePast: "He <b>answered</b> all the questions correctly.",         gif: "answering" },
  { present: "clean",  past: "cleaned",      participle: "cleaned",     type: "regular",   sound: "/d/",  sentencePres: "I <b>clean</b> my bedroom every Saturday.",             sentencePast: "We <b>cleaned</b> the entire house yesterday.",           gif: "cleaning" },
  { present: "love",   past: "loved",        participle: "loved",       type: "regular",   sound: "/d/",  sentencePres: "I <b>love</b> spending time with my family.",           sentencePast: "She <b>loved</b> that movie when she was a kid.",         gif: "love" },
  { present: "open",   past: "opened",       participle: "opened",      type: "regular",   sound: "/d/",  sentencePres: "Could you <b>open</b> the window, please?",             sentencePast: "He <b>opened</b> the door for the lady.",                 gif: "opening" },
  { present: "stay",   past: "stayed",       participle: "stayed",      type: "regular",   sound: "/d/",  sentencePres: "I usually <b>stay</b> at home on Sundays.",             sentencePast: "They <b>stayed</b> in a very nice hotel.",               gif: "stay" },
];

const GIPHY_KEY = window.GIPHY_KEY || "2axlHmd0ojKiliZf0zstiEFAfdrjDrSd";

/* ── STATE ── */
let deck          = [];
let cursor        = 0;
let isFlipped     = false;
let correct       = 0;
let skipped       = 0;
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

/* ── DECK CON PROGRESIÓN DIARIA ── */
function updateDeck() {
  const today    = new Date();
  const timeDiff = today - START_DATE;
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const verbsToUnlock = Math.max(10, (daysDiff + 1) * 10);
  deck = ALL_VERBS.slice(0, Math.min(verbsToUnlock, ALL_VERBS.length));
  console.log(`Día ${daysDiff}: ${deck.length} verbos desbloqueados.`);
}

function buildDeck() {
  updateDeck();
  const base = currentFilter === "all"
    ? deck
    : deck.filter(v => v.type === currentFilter);
  deck      = shuffle(base);
  cursor    = 0;
  correct   = 0;
  skipped   = 0;
  isFlipped = false;
}

/* ── RENDER CARD ── */
function renderCard(animate = true) {
  const verb = deck[cursor];

  document.getElementById("stage").style.display = "flex";
  document.getElementById("finishScreen").classList.remove("show");

  const scene = document.getElementById("cardScene");
  scene.className = `card-scene col-${colorIdx(verb)}`;

  document.getElementById("cardPresent").textContent    = verb.present;
  document.getElementById("cardPast").textContent       = verb.past;
  document.getElementById("cardPresentRef").textContent = `← ${verb.present}`;

  const badge       = document.getElementById("cardBadge");
  badge.textContent = verb.type === "irregular" ? "Irregular" : "Regular";
  badge.className   = "type-badge " + (verb.type === "irregular" ? "badge-irr" : "badge-reg");

  const pct = (cursor / deck.length) * 100;
  document.getElementById("progressFill").style.width  = pct + "%";
  document.getElementById("progressLabel").textContent = `${cursor + 1} / ${deck.length}`;
  document.getElementById("scoreCorrect").textContent  = correct;
  document.getElementById("scoreSkip").textContent     = skipped;

  if (animate) {
    scene.classList.remove("animate");
    void scene.offsetWidth;
    scene.classList.add("animate");
  }
}

/* ── FLIP (toggle) ── */
function toggleFlip() {
  const scene = document.getElementById("cardScene");
  isFlipped   = !isFlipped;

  if (isFlipped) {
    scene.classList.add("flipped");
    document.getElementById("sideHint").textContent = "Past tense";
    setTimeout(() => {
      document.getElementById("actions").classList.add("visible");
    }, 350);
  } else {
    scene.classList.remove("flipped");
    document.getElementById("sideHint").textContent = "Present tense";
    document.getElementById("actions").classList.remove("visible");
  }
}

/* ── NEXT CARD  (bug del spoiler corregido) ── */
function next() {
  const scene     = document.getElementById("cardScene");
  const cardInner = scene.querySelector(".card-inner");
  const backText  = document.getElementById("cardPast");

  // 1. Ocultar el texto del reverso inmediatamente
  backText.style.visibility = "hidden";

  // 2. Desactivar la transición del giro → el reseteo es instantáneo.
  //    Sin esto, el reverso con el NUEVO verbo era visible durante los 0.6s
  //    que tarda la animación CSS en completarse.
  cardInner.style.transition = "none";
  scene.classList.remove("flipped");
  isFlipped = false;

  // 3. Forzar reflow para que el "transition: none" surta efecto antes de continuar
  void cardInner.offsetWidth;

  // 4. Restaurar la transición para el próximo giro del usuario
  cardInner.style.transition = "";

  // 5. Limpiar la UI
  document.getElementById("actions").classList.remove("visible");
  document.getElementById("sideHint").textContent = "Present tense";
  backText.textContent = "";

  cursor++;

  if (cursor >= deck.length) {
    backText.style.visibility = "visible";
    showFinish();
  } else {
    renderCard(true);
    backText.style.visibility = "visible";
  }
}

/* ── FINISH ── */
function showFinish() {
  document.getElementById("stage").style.display = "none";
  document.getElementById("quizScreen").style.display = "none";
  document.getElementById("finishScreen").classList.add("show");

  const pct = Math.round((correct / deck.length) * 100);
  document.getElementById("fCorrect").textContent       = correct;
  document.getElementById("fSkip").textContent          = skipped;
  document.getElementById("fTotal").textContent         = deck.length;
  document.getElementById("finishSubtitle").textContent =
    pct >= 80 ? "Excellent work! 🔥"
    : pct >= 50 ? "Good progress, keep going!"
    : "Keep practicing, you'll get there!";
  document.getElementById("finishEmoji").textContent =
    pct >= 80 ? "🎉" : pct >= 50 ? "💪" : "📚";
  document.getElementById("progressFill").style.width  = "100%";
  document.getElementById("progressLabel").textContent = `${deck.length} / ${deck.length}`;
}

/* ── DETAIL MODAL ── */
async function openDetail() {
  const verb = deck[cursor];

  const soundHTML = verb.sound ? `<span class="sound-tag">${verb.sound}</span>` : "";
  document.getElementById("modalPresent").innerHTML  = `${verb.present} ${soundHTML}`;
  document.getElementById("modalPast").textContent   = verb.past;
  document.getElementById("modalSentencePres").innerHTML = verb.sentencePres;
  document.getElementById("modalSentencePast").innerHTML = verb.sentencePast;

  const badge            = document.getElementById("modalBadge");
  badge.textContent      = verb.type === "irregular" ? "Irregular" : "Regular";
  badge.style.background = verb.type === "irregular" ? "var(--text)"        : "var(--progress-bg)";
  badge.style.color      = verb.type === "irregular" ? "var(--bg)"          : "var(--subtext)";

  const gifEl     = document.getElementById("modalGif");
  gifEl.innerHTML = `<span class="gif-msg">Loading GIF…</span>`;
  document.getElementById("overlay").classList.add("open");
  document.body.style.overflow = "hidden";

  try {
    const url  = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${encodeURIComponent(verb.gif)}&limit=6&rating=g`;
    const res  = await fetch(url);
    if (!res.ok) {
      if (res.status === 401 || res.status === 403) throw new Error("API Key inválida o expirada.");
      if (res.status === 429) throw new Error("Límite de GIFs alcanzado.");
      throw new Error("Error de conexión con Giphy.");
    }
    const json = await res.json();
    if (json.data?.length) {
      const pick      = json.data[Math.floor(Math.random() * json.data.length)];
      gifEl.innerHTML = `<img src="${pick.images.fixed_height.url}" alt="${verb.gif}" />`;
    } else {
      gifEl.innerHTML = `<span class="gif-msg">No se encontró un GIF</span>`;
    }
  } catch (error) {
    console.error(error);
    gifEl.innerHTML = `<span class="gif-msg" style="color:red;text-transform:none;">Error: ${error.message}</span>`;
  }
}

function closeModal() {
  document.getElementById("overlay").classList.remove("open");
  document.body.style.overflow = "";
}

/* ════════════════════════════════════════════════════════
   Q U I Z   S Y S T E M
   Genera preguntas localmente desde los datos de cada verbo.
   Dos tipos alternados al azar:
     Tipo A – "What is the past tense of 'X'?"
     Tipo B – Fill-in-the-blank desde sentencePres o sentencePast
   ════════════════════════════════════════════════════════ */

let quizQuestions   = [];
let quizIdx         = 0;
let quizScore       = 0;
let quizAnswered    = false;   // evita doble-clic

/* ── Extrae la palabra en negrita de un string HTML ── */
function extractBoldWord(html) {
  const match = html.match(/<b>(.*?)<\/b>/i);
  return match ? match[1] : null;
}

/* ── Genera 3 distractores únicos para una respuesta correcta ── */
function getDistractors(correct, mode, pool) {
  // mode: "past" | "present"
  const others = pool
    .map(v => (mode === "past" ? v.past : v.present))
    .filter(w => w.toLowerCase() !== correct.toLowerCase());
  return shuffle([...new Set(others)]).slice(0, 3);
}

/* ── Construye el array de preguntas del quiz ── */
function buildQuiz(verbPool) {
  return shuffle(verbPool).map(verb => {
    const useFillIn = Math.random() > 0.45;  // ~55 % fill-in-the-blank

    if (useFillIn) {
      // Elegir entre oración en presente o en pasado al azar
      const usePast  = Math.random() > 0.5;
      const html     = usePast ? verb.sentencePast : verb.sentencePres;
      const boldWord = extractBoldWord(html);

      if (boldWord) {
        const mode    = usePast ? "past" : "present";
        const tenseLabel = usePast ? "past tense" : "present tense";
        // Reemplazar la palabra bold por _______ en texto plano
        const plain   = html.replace(/<[^>]+>/g, "");
        const blank   = plain.replace(new RegExp(`\\b${boldWord}\\b`, "i"), "_______");
        const options = shuffle([boldWord, ...getDistractors(boldWord, mode, verbPool)]);

        return {
          type:    "fill",
          tense:   tenseLabel,
          question: blank,
          correct:  boldWord,
          options,
        };
      }
    }

    // Tipo A – definición directa
    const options = shuffle([verb.past, ...getDistractors(verb.past, "past", verbPool)]);
    return {
      type:     "direct",
      question: `What is the past tense of "${verb.present}"?`,
      correct:  verb.past,
      options,
    };
  });
}

/* ── Inicia el quiz ── */
function startQuiz() {
  quizQuestions = buildQuiz(deck);
  quizIdx       = 0;
  quizScore     = 0;
  quizAnswered  = false;

  // Cambiar etiquetas del score row al modo quiz
  document.querySelector(".score-correct .score-lbl").textContent = "Correct";
  document.querySelector(".score-skip    .score-lbl").textContent = "Wrong";
  document.getElementById("scoreCorrect").textContent = "0";
  document.getElementById("scoreSkip").textContent    = "0";

  document.getElementById("finishScreen").classList.remove("show");
  document.getElementById("stage").style.display       = "none";
  document.getElementById("quizScreen").style.display  = "flex";

  renderQuizQuestion();
}

/* ── Renderiza la pregunta actual ── */
function renderQuizQuestion() {
  quizAnswered = false;
  const q = quizQuestions[quizIdx];

  // Cabecera de progreso del quiz
  const progressPct = (quizIdx / quizQuestions.length) * 100;
  document.getElementById("progressFill").style.width  = progressPct + "%";
  document.getElementById("progressLabel").textContent = `${quizIdx + 1} / ${quizQuestions.length}`;
  document.getElementById("scoreCorrect").textContent  = quizScore;
  document.getElementById("scoreSkip").textContent     = quizIdx - quizScore;

  const container = document.getElementById("quizScreen").querySelector(".quiz-container");
  container.innerHTML = `
    <div class="quiz-progress-label">Question ${quizIdx + 1} of ${quizQuestions.length}</div>

    ${q.type === "fill"
      ? `<div class="quiz-tense-tag">${q.tense}</div>
         <p class="quiz-instruction">Choose the correct word to complete the sentence:</p>`
      : `<p class="quiz-instruction">Choose the correct answer:</p>`
    }

    <div class="quiz-question">${q.question}</div>

    <div class="quiz-options" id="quizOptions">
      ${q.options.map(opt => `
        <button class="quiz-option" data-value="${opt}">${opt}</button>
      `).join("")}
    </div>
  `;

  // Asociar eventos a las opciones
  container.querySelectorAll(".quiz-option").forEach(btn => {
    btn.addEventListener("click", () => handleQuizAnswer(btn, q.correct));
  });
}

/* ── Maneja la respuesta seleccionada ── */
function handleQuizAnswer(selectedBtn, correct) {
  if (quizAnswered) return;
  quizAnswered = true;

  const allBtns = document.querySelectorAll(".quiz-option");
  const isRight = selectedBtn.dataset.value === correct;

  if (isRight) {
    quizScore++;
    selectedBtn.classList.add("quiz-correct");
  } else {
    selectedBtn.classList.add("quiz-wrong");
    // Marcar la correcta
    allBtns.forEach(b => {
      if (b.dataset.value === correct) b.classList.add("quiz-correct");
    });
  }

  // Deshabilitar todos los botones
  allBtns.forEach(b => {
    b.disabled = true;
    b.blur();
    b.setAttribute("tabindex", "-1");
  });

  // Actualizar score visible
  document.getElementById("scoreCorrect").textContent = quizScore;
  document.getElementById("scoreSkip").textContent    = (quizIdx + 1) - quizScore;

  // Avanzar a la siguiente pregunta tras un breve delay
  setTimeout(() => {
    quizIdx++;
    if (quizIdx < quizQuestions.length) {
      renderQuizQuestion();
    } else {
      showQuizResults();
    }
  }, 1400);
}

/* ── Pantalla final del quiz ── */
function showQuizResults() {
  const total = quizQuestions.length;
  const pct   = Math.round((quizScore / total) * 100);

  const emoji   = pct >= 90 ? "🏆" : pct >= 70 ? "🎉" : pct >= 50 ? "💪" : "📚";
  const message = pct >= 90 ? "Outstanding! You nailed it!"
    : pct >= 70 ? "Great job! Keep it up!"
    : pct >= 50 ? "Good effort! Practice more."
    : "Keep studying — you'll get there!";

  document.getElementById("progressFill").style.width  = "100%";
  document.getElementById("progressLabel").textContent = `${total} / ${total}`;

  const container = document.getElementById("quizScreen").querySelector(".quiz-container");
  container.innerHTML = `
    <div class="quiz-results">
      <div class="quiz-result-emoji">${emoji}</div>
      <div class="quiz-result-title">Quiz complete!</div>
      <p class="quiz-result-msg">${message}</p>

      <div class="quiz-result-stats">
        <div class="quiz-stat correct">
          <b>${quizScore}</b>
          <span>Correct</span>
        </div>
        <div class="quiz-stat wrong">
          <b>${total - quizScore}</b>
          <span>Wrong</span>
        </div>
        <div class="quiz-stat total">
          <b>${pct}%</b>
          <span>Score</span>
        </div>
      </div>

      <div class="quiz-result-actions">
        <button class="restart-btn" onclick="startQuiz()">Retry Quiz 🔄</button>
        <button class="restart-btn quiz-back-btn" onclick="backToCards()">Back to Cards</button>
      </div>
    </div>
  `;
}

/* ── Vuelve a las tarjetas ── */
function backToCards() {
  // Restaurar etiquetas al modo cards
  document.querySelector(".score-correct .score-lbl").textContent = "Learned";
  document.querySelector(".score-skip    .score-lbl").textContent = "Skipped";

  document.getElementById("quizScreen").style.display = "none";
  buildDeck();
  document.getElementById("stage").style.display = "flex";
  renderCard(true);
}

/* ── THEME ── */
let dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme();

function applyTheme() {
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  document.getElementById("themeToggle").textContent = dark ? "☀︎" : "☾";
}

/* ════════════════════════════════════════════════════════
   E V E N T   L I S T E N E R S
   ════════════════════════════════════════════════════════ */

// Card click → toggle flip
document.getElementById("cardScene").addEventListener("click", (e) => {
  if (e.target.closest("#actions")) return;
  toggleFlip();
});

// Action buttons
document.getElementById("btnCorrect").addEventListener("click", (e) => {
  e.stopPropagation(); correct++; next();
});
document.getElementById("btnSkip").addEventListener("click", (e) => {
  e.stopPropagation(); skipped++; next();
});
document.getElementById("btnDetail").addEventListener("click", (e) => {
  e.stopPropagation(); openDetail();
});

// Restart (desde finish screen)
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
    // Restaurar etiquetas por si venimos del quiz
    document.querySelector(".score-correct .score-lbl").textContent = "Learned";
    document.querySelector(".score-skip    .score-lbl").textContent = "Skipped";
    buildDeck();
    document.getElementById("finishScreen").classList.remove("show");
    document.getElementById("quizScreen").style.display = "none";
    document.getElementById("stage").style.display = "flex";
    renderCard(true);
  });
});

// Shuffle button
document.getElementById("shuffleBtn").addEventListener("click", () => {
  // Restaurar etiquetas por si venimos del quiz
  document.querySelector(".score-correct .score-lbl").textContent = "Learned";
  document.querySelector(".score-skip    .score-lbl").textContent = "Skipped";
  buildDeck();
  document.getElementById("finishScreen").classList.remove("show");
  document.getElementById("quizScreen").style.display = "none";
  document.getElementById("stage").style.display = "flex";
  renderCard(true);
});

// Theme toggle
document.getElementById("themeToggle").addEventListener("click", () => {
  dark = !dark; applyTheme();
});

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { closeModal(); return; }
  if (document.getElementById("overlay").classList.contains("open")) return;
  if (document.getElementById("finishScreen").classList.contains("show")) return;
  if (document.getElementById("quizScreen").style.display !== "none") return;

  if ((e.key === " " || e.key === "ArrowUp") && !isFlipped) {
    e.preventDefault(); toggleFlip();
  }
  if (e.key === "ArrowRight" && isFlipped) { correct++; next(); }
  if (e.key === "ArrowLeft"  && isFlipped) { skipped++;  next(); }
});

/* ── INIT ── */
buildDeck();
renderCard(false);
