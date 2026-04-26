/* ── CONFIGURACIÓN DE INICIO ── */
const START_DATE = new Date(2026, 3, 23);

/* ── DATA ── */
const ALL_VERBS = [
  { present: "bear",   past: "bore",        participle: "borne",        type: "irregular", sound: "",     sentencePres: "Some people cannot <b>bear</b> the cold weather.",       sentencePast: "She <b>bore</b> the pain with great courage.",            gif: "bear heavy" },
  { present: "buy",    past: "bought",       participle: "bought",       type: "irregular", sound: "",     sentencePres: "I <b>buy</b> fresh vegetables every morning.",            sentencePast: "Yesterday, I <b>bought</b> a gift for my mother.",         gif: "buying" },
  { present: "drive",  past: "drove",        participle: "driven",       type: "irregular", sound: "",     sentencePres: "Please <b>drive</b> slowly near the school.",             sentencePast: "He <b>drove</b> all night to get to the beach.",           gif: "driving" },
  { present: "eat",    past: "ate",          participle: "eaten",        type: "irregular", sound: "",     sentencePres: "I always <b>eat</b> breakfast at 7:00 AM.",               sentencePast: "We <b>ate</b> a delicious pizza last night.",              gif: "eating" },
  { present: "find",   past: "found",        participle: "found",        type: "irregular", sound: "",     sentencePres: "It is hard to <b>find</b> a parking spot here.",          sentencePast: "I <b>found</b> my lost keys under the sofa.",             gif: "find" },
  { present: "grow",   past: "grew",         participle: "grown",        type: "irregular", sound: "",     sentencePres: "Plants <b>grow</b> faster with enough sunlight.",         sentencePast: "The city <b>grew</b> quickly in the last decade.",         gif: "growing" },
  { present: "have",   past: "had",          participle: "had",          type: "irregular", sound: "",     sentencePres: "I <b>have</b> two brothers and one sister.",              sentencePast: "We <b>had</b> a great time at the party.",                gif: "having" },
  { present: "know",   past: "knew",         participle: "known",        type: "irregular", sound: "",     sentencePres: "I <b>know</b> the answer to your question.",             sentencePast: "I <b>knew</b> you were going to call me.",                gif: "smart" },
  { present: "lose",   past: "lost",         participle: "lost",         type: "irregular", sound: "",     sentencePres: "Don't <b>lose</b> your passport at the airport.",        sentencePast: "Our team <b>lost</b> the game by one goal.",              gif: "lost" },
  { present: "meet",   past: "met",          participle: "met",          type: "irregular", sound: "",     sentencePres: "I want to <b>meet</b> your new friends.",                sentencePast: "We <b>met</b> for the first time in high school.",         gif: "meeting" },
  { present: "read",   past: "read",         participle: "read",         type: "irregular", sound: "",     sentencePres: "You should <b>read</b> the instructions carefully.",     sentencePast: "Last night, I <b>read</b> a very long article.",           gif: "reading" },
  { present: "speak",  past: "spoke",        participle: "spoken",       type: "irregular", sound: "",     sentencePres: "Can you <b>speak</b> more slowly, please?",              sentencePast: "He <b>spoke</b> to the manager about the problem.",        gif: "speaking" },
  { present: "swim",   past: "swam",         participle: "swum",         type: "irregular", sound: "",     sentencePres: "I <b>swim</b> in the pool every Saturday.",              sentencePast: "We <b>swam</b> in the ocean during our vacation.",         gif: "swimming" },
  { present: "take",   past: "took",         participle: "taken",        type: "irregular", sound: "",     sentencePres: "Remember to <b>take</b> your umbrella with you.",        sentencePast: "She <b>took</b> the bus to go to the city center.",        gif: "taking" },
  { present: "write",  past: "wrote",        participle: "written",      type: "irregular", sound: "",     sentencePres: "I <b>write</b> in my journal every evening.",            sentencePast: "He <b>wrote</b> a beautiful poem for his wife.",           gif: "writing" },
  { present: "visit",  past: "visited",      participle: "visited",      type: "regular",   sound: "/id/", sentencePres: "I like to <b>visit</b> museums on weekends.",           sentencePast: "They <b>visited</b> many countries last year.",            gif: "visiting" },
  { present: "paint",  past: "painted",      participle: "painted",      type: "regular",   sound: "/id/", sentencePres: "She wants to <b>paint</b> her room blue.",              sentencePast: "He <b>painted</b> a beautiful landscape yesterday.",       gif: "painting" },
  { present: "cook",   past: "cooked",       participle: "cooked",       type: "regular",   sound: "/t/",  sentencePres: "I often <b>cook</b> dinner for my family.",             sentencePast: "He <b>cooked</b> a special meal for her birthday.",        gif: "cooking" },
  { present: "talk",   past: "talked",       participle: "talked",       type: "regular",   sound: "/t/",  sentencePres: "We need to <b>talk</b> about the new project.",          sentencePast: "I <b>talked</b> to the teacher after the class.",          gif: "talking" },
  { present: "walk",   past: "walked",       participle: "walked",       type: "regular",   sound: "/t/",  sentencePres: "I <b>walk</b> to work when the weather is nice.",        sentencePast: "We <b>walked</b> for three miles in the park.",            gif: "walking" },
  { present: "work",   past: "worked",       participle: "worked",       type: "regular",   sound: "/t/",  sentencePres: "They <b>work</b> in a very large office.",               sentencePast: "She <b>worked</b> until late last Friday night.",          gif: "working" },
  { present: "watch",  past: "watched",      participle: "watched",      type: "regular",   sound: "/t/",  sentencePres: "Do you want to <b>watch</b> a movie tonight?",          sentencePast: "We <b>watched</b> the football game on TV.",              gif: "watching" },
  { present: "laugh",  past: "laughed",      participle: "laughed",      type: "regular",   sound: "/t/",  sentencePres: "Funny movies make me <b>laugh</b> a lot.",               sentencePast: "She <b>laughed</b> at the joke I told her.",              gif: "laughing" },
  { present: "listen", past: "listened",     participle: "listened",     type: "regular",   sound: "/d/",  sentencePres: "I <b>listen</b> to music while I study.",               sentencePast: "He <b>listened</b> carefully to the instructions.",        gif: "listening" },
  { present: "play",   past: "played",       participle: "played",       type: "regular",   sound: "/d/",  sentencePres: "The children <b>play</b> in the garden every day.",     sentencePast: "We <b>played</b> soccer for two hours yesterday.",         gif: "playing" },
  { present: "call",   past: "called",       participle: "called",       type: "regular",   sound: "/d/",  sentencePres: "I will <b>call</b> you as soon as I arrive.",           sentencePast: "She <b>called</b> her mother this morning.",              gif: "calling" },
  { present: "arise",  past: "arose",        participle: "arisen",       type: "irregular", sound: "",     sentencePres: "New problems <b>arise</b> every single day.",            sentencePast: "A huge conflict <b>arose</b> during the meeting.",         gif: "rising" },
  { present: "awake",  past: "awoke",        participle: "awoken",       type: "irregular", sound: "",     sentencePres: "I usually <b>awake</b> when the sun rises.",             sentencePast: "He <b>awoke</b> suddenly in the middle of the night.",    gif: "awake" },
  { present: "be",     past: "was / were",   participle: "been",         type: "irregular", sound: "",     sentencePres: "Please <b>be</b> patient with the new students.",        sentencePast: "I <b>was</b> very happy to see you yesterday.",           gif: "being" },
  { present: "beat",   past: "beat",         participle: "beaten",       type: "irregular", sound: "",     sentencePres: "Can you <b>beat</b> the high score in this game?",       sentencePast: "They <b>beat</b> the rival team last Saturday.",          gif: "beat" },
  { present: "become", past: "became",       participle: "become",       type: "irregular", sound: "",     sentencePres: "It is hard to <b>become</b> a professional doctor.",     sentencePast: "He <b>became</b> a famous singer in a short time.",       gif: "transformation" },
  { present: "begin",  past: "began",        participle: "begun",        type: "irregular", sound: "",     sentencePres: "The classes <b>begin</b> at eight in the morning.",      sentencePast: "It <b>began</b> to rain just after we left home.",        gif: "starting" },
  { present: "bend",   past: "bent",         participle: "bent",         type: "irregular", sound: "",     sentencePres: "Be careful not to <b>bend</b> the credit card.",         sentencePast: "He <b>bent</b> the metal pipe with his hands.",           gif: "bending" },
  { present: "bet",    past: "bet",          participle: "bet",          type: "irregular", sound: "",     sentencePres: "I <b>bet</b> you can't finish that huge burger.",        sentencePast: "He <b>bet</b> all his money and lost it all.",            gif: "betting" },
  { present: "bite",   past: "bit",          participle: "bit / bitten", type: "irregular", sound: "",     sentencePres: "Be careful! That dog might <b>bite</b> you.",            sentencePast: "A mosquito <b>bit</b> me on the arm last night.",         gif: "bite" },
  { present: "blow",   past: "blew",         participle: "blown",        type: "irregular", sound: "",     sentencePres: "The kids love to <b>blow</b> soap bubbles.",             sentencePast: "A strong wind <b>blew</b> the leaves away.",             gif: "blowing" },
  { present: "break",  past: "broke",        participle: "broken",       type: "irregular", sound: "",     sentencePres: "If you <b>break</b> the rules, you will be punished.",   sentencePast: "The glass <b>broke</b> into a thousand pieces.",          gif: "broken" },
  { present: "bring",  past: "brought",      participle: "brought",      type: "irregular", sound: "",     sentencePres: "Always <b>bring</b> your notebook to the class.",        sentencePast: "She <b>brought</b> some cookies for the party.",          gif: "carrying" },
  { present: "choose", past: "chose",        participle: "chosen",       type: "irregular", sound: "",     sentencePres: "You must <b>choose</b> the correct answer now.",         sentencePast: "I <b>chose</b> the red shirt instead of the blue one.",  gif: "choosing" },
  { present: "come",   past: "came",         participle: "come",         type: "irregular", sound: "",     sentencePres: "Please <b>come</b> to my house this afternoon.",         sentencePast: "They <b>came</b> back from their trip yesterday.",        gif: "coming" },
  { present: "cut",    past: "cut",          participle: "cut",          type: "irregular", sound: "",     sentencePres: "Use these scissors to <b>cut</b> the paper.",            sentencePast: "He <b>cut</b> the cake into eight equal pieces.",         gif: "cutting" },
  { present: "do",     past: "did",          participle: "done",         type: "irregular", sound: "",     sentencePres: "I need to <b>do</b> my homework tonight.",               sentencePast: "You <b>did</b> a very good job on the project.",          gif: "doing" },
  { present: "drink",  past: "drank",        participle: "drunk",        type: "irregular", sound: "",     sentencePres: "You should <b>drink</b> eight glasses of water.",        sentencePast: "He <b>drank</b> a cold soda after the race.",             gif: "drinking" },
  { present: "fall",   past: "fell",         participle: "fallen",       type: "irregular", sound: "",     sentencePres: "Be careful or you will <b>fall</b> on the ice.",         sentencePast: "The leaves <b>fell</b> from the trees in autumn.",        gif: "falling" },
  { present: "forget", past: "forgot",       participle: "forgotten",    type: "irregular", sound: "",     sentencePres: "I often <b>forget</b> where I put my glasses.",          sentencePast: "I <b>forgot</b> to buy milk at the supermarket.",         gif: "forget" },
  { present: "get",    past: "got",          participle: "got / gotten", type: "irregular", sound: "",     sentencePres: "I need to <b>get</b> a new pair of shoes.",              sentencePast: "She <b>got</b> a perfect score on her exam.",             gif: "getting" },
  { present: "give",   past: "gave",         participle: "given",        type: "irregular", sound: "",     sentencePres: "Please <b>give</b> me a hand with this box.",            sentencePast: "My father <b>gave</b> me this watch for my birthday.",    gif: "giving" },
  { present: "go",     past: "went",         participle: "gone",         type: "irregular", sound: "",     sentencePres: "I <b>go</b> to the gym four times a week.",              sentencePast: "We <b>went</b> to the cinema last Sunday.",               gif: "going" },
  { present: "make",   past: "made",         participle: "made",         type: "irregular", sound: "",     sentencePres: "I like to <b>make</b> my own clothes.",                  sentencePast: "She <b>made</b> a delicious chocolate cake.",             gif: "making" },
  { present: "see",    past: "saw",          participle: "seen",         type: "irregular", sound: "",     sentencePres: "I can <b>see</b> the mountains from my window.",         sentencePast: "I <b>saw</b> a famous actor at the airport.",             gif: "seeing" },
  { present: "sing",   past: "sang",         participle: "sung",         type: "irregular", sound: "",     sentencePres: "She can <b>sing</b> very high notes beautifully.",       sentencePast: "We <b>sang</b> happy birthday to our friend.",            gif: "singing" },
  { present: "sleep",  past: "slept",        participle: "slept",        type: "irregular", sound: "",     sentencePres: "I need to <b>sleep</b> at least seven hours.",           sentencePast: "The baby <b>slept</b> peacefully all night.",             gif: "sleeping" },
  { present: "think",  past: "thought",      participle: "thought",      type: "irregular", sound: "",     sentencePres: "I <b>think</b> it is going to rain today.",              sentencePast: "I <b>thought</b> you were at the office.",               gif: "thinking" },
  { present: "win",    past: "won",          participle: "won",          type: "irregular", sound: "",     sentencePres: "We want to <b>win</b> the championship this year.",      sentencePast: "They <b>won</b> the lottery two years ago.",              gif: "winning" },
  { present: "accept", past: "accepted",     participle: "accepted",     type: "regular",   sound: "/id/", sentencePres: "Do you <b>accept</b> credit cards here?",              sentencePast: "She <b>accepted</b> the job offer immediately.",          gif: "yes" },
  { present: "count",  past: "counted",      participle: "counted",      type: "regular",   sound: "/id/", sentencePres: "Can you <b>count</b> from one to twenty?",              sentencePast: "He <b>counted</b> the money twice to be sure.",           gif: "numbers" },
  { present: "need",   past: "needed",       participle: "needed",       type: "regular",   sound: "/id/", sentencePres: "I <b>need</b> some help with my homework.",             sentencePast: "We <b>needed</b> a bigger car for the trip.",             gif: "need" },
  { present: "start",  past: "started",      participle: "started",      type: "regular",   sound: "/id/", sentencePres: "The movie will <b>start</b> in five minutes.",          sentencePast: "It <b>started</b> to snow early this morning.",           gif: "start" },
  { present: "want",   past: "wanted",       participle: "wanted",       type: "regular",   sound: "/id/", sentencePres: "I <b>want</b> to travel around the world.",             sentencePast: "He <b>wanted</b> to buy a new computer.",                 gif: "want" },
  { present: "ask",    past: "asked",        participle: "asked",        type: "regular",   sound: "/t/",  sentencePres: "Don't be afraid to <b>ask</b> questions.",              sentencePast: "I <b>asked</b> the police for directions.",               gif: "asking" },
  { present: "dance",  past: "danced",       participle: "danced",       type: "regular",   sound: "/t/",  sentencePres: "They <b>dance</b> salsa very well together.",            sentencePast: "We <b>danced</b> all night at the wedding.",              gif: "dancing" },
  { present: "finish", past: "finished",     participle: "finished",     type: "regular",   sound: "/t/",  sentencePres: "I must <b>finish</b> this report by Friday.",           sentencePast: "She <b>finished</b> her dinner very quickly.",            gif: "finish" },
  { present: "help",   past: "helped",       participle: "helped",       type: "regular",   sound: "/t/",  sentencePres: "I am happy to <b>help</b> you with that.",              sentencePast: "He <b>helped</b> me carry the heavy bags.",               gif: "help" },
  { present: "look",   past: "looked",       participle: "looked",       type: "regular",   sound: "/t/",  sentencePres: "Please <b>look</b> at the whiteboard now.",             sentencePast: "I <b>looked</b> for my keys everywhere.",                 gif: "looking" },
  { present: "answer", past: "answered",     participle: "answered",     type: "regular",   sound: "/d/",  sentencePres: "I always <b>answer</b> my emails promptly.",            sentencePast: "He <b>answered</b> all the questions correctly.",         gif: "answering" },
  { present: "clean",  past: "cleaned",      participle: "cleaned",      type: "regular",   sound: "/d/",  sentencePres: "I <b>clean</b> my bedroom every Saturday.",             sentencePast: "We <b>cleaned</b> the entire house yesterday.",           gif: "cleaning" },
  { present: "love",   past: "loved",        participle: "loved",        type: "regular",   sound: "/d/",  sentencePres: "I <b>love</b> spending time with my family.",           sentencePast: "She <b>loved</b> that movie when she was a kid.",         gif: "love" },
  { present: "open",   past: "opened",       participle: "opened",       type: "regular",   sound: "/d/",  sentencePres: "Could you <b>open</b> the window, please?",             sentencePast: "He <b>opened</b> the door for the lady.",                 gif: "opening" },
  { present: "stay",   past: "stayed",       participle: "stayed",       type: "regular",   sound: "/d/",  sentencePres: "I usually <b>stay</b> at home on Sundays.",             sentencePast: "They <b>stayed</b> in a very nice hotel.",               gif: "stay" },
];

const GIPHY_KEY = window.GIPHY_KEY || "2axlHmd0ojKiliZf0zstiEFAfdrjDrSd";
const VERB_MEANINGS_ES = {
  bear:"soportar",buy:"comprar",drive:"conducir",eat:"comer",find:"encontrar",
  grow:"crecer",have:"tener",know:"saber / conocer",lose:"perder",meet:"conocer / reunirse",
  read:"leer",speak:"hablar",swim:"nadar",take:"tomar / llevar",write:"escribir",
  visit:"visitar",paint:"pintar",cook:"cocinar",talk:"hablar",walk:"caminar",
  work:"trabajar",watch:"mirar / ver",laugh:"reír",listen:"escuchar",play:"jugar / tocar",
  call:"llamar",arise:"surgir",awake:"despertar",be:"ser / estar",beat:"golpear / vencer",
  become:"convertirse",begin:"empezar",bend:"doblar",bet:"apostar",bite:"morder",
  blow:"soplar",break:"romper",bring:"traer",choose:"elegir",come:"venir",cut:"cortar",
  do:"hacer",drink:"beber",fall:"caer",forget:"olvidar",get:"obtener / conseguir",
  give:"dar",go:"ir",make:"hacer",see:"ver",sing:"cantar",sleep:"dormir",think:"pensar",
  win:"ganar",accept:"aceptar",count:"contar",need:"necesitar",start:"empezar / iniciar",
  want:"querer",ask:"preguntar",dance:"bailar",finish:"terminar",help:"ayudar",look:"mirar",
  answer:"responder",clean:"limpiar",love:"amar",open:"abrir",stay:"quedarse",
};

/* ── FLASHCARD STATE ── */
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

function colorIdx(verb) { return ALL_VERBS.indexOf(verb) % 10; }

function speakVerb(text) {
  if (!("speechSynthesis" in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US"; utter.rate = 0.92; utter.pitch = 1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

function hideSwipeGhosts() {
  const ok = document.getElementById("qGhostOk");
  const no = document.getElementById("qGhostNo");
  if (ok) { ok.style.opacity = "0"; ok.textContent = ""; }
  if (no) { no.style.opacity = "0"; no.textContent = ""; }
}

/* ── DECK CON PROGRESIÓN DIARIA ── */
function updateDeck() {
  const today    = new Date();
  const timeDiff = today - START_DATE;
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const verbsToUnlock = Math.max(10, (daysDiff + 1) * 10);
  deck = ALL_VERBS.slice(0, Math.min(verbsToUnlock, ALL_VERBS.length));
}

function buildDeck() {
  updateDeck();
  const base = currentFilter === "all"
    ? deck
    : deck.filter(v => v.type === currentFilter);
  deck    = shuffle(base);
  cursor  = 0; correct = 0; skipped = 0; isFlipped = false;
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

/* ── FLIP ── */
function toggleFlip() {
  const scene = document.getElementById("cardScene");
  isFlipped = !isFlipped;
  if (isFlipped) {
    scene.classList.add("flipped");
    document.getElementById("sideHint").textContent = "Past tense";
    setTimeout(() => { document.getElementById("actions").classList.add("visible"); }, 350);
  } else {
    scene.classList.remove("flipped");
    document.getElementById("sideHint").textContent = "Present tense";
    document.getElementById("actions").classList.remove("visible");
  }
}

/* ── NEXT CARD ── */
function next() {
  const scene     = document.getElementById("cardScene");
  const cardInner = scene.querySelector(".card-inner");
  const backText  = document.getElementById("cardPast");

  backText.style.visibility = "hidden";
  cardInner.style.transition = "none";
  scene.classList.remove("flipped");
  isFlipped = false;
  void cardInner.offsetWidth;
  cardInner.style.transition = "";

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
    pct >= 80 ? "Excellent work! 🔥" : pct >= 50 ? "Good progress, keep going!" : "Keep practicing, you'll get there!";
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
  document.getElementById("modalMeaningEs").textContent = VERB_MEANINGS_ES[verb.present] || "Sin traducción disponible";
  document.getElementById("modalSentencePres").innerHTML = verb.sentencePres;
  document.getElementById("modalSentencePast").innerHTML = verb.sentencePast;
  document.getElementById("speakPresent").onclick = () => speakVerb(verb.present);
  document.getElementById("speakPast").onclick    = () => speakVerb(verb.past.split("/")[0].trim());

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
      gifEl.innerHTML = `<span class="gif-msg">No GIF found</span>`;
    }
  } catch (error) {
    gifEl.innerHTML = `<span class="gif-msg" style="color:red;text-transform:none;">Error: ${error.message}</span>`;
  }
}

function closeModal() {
  document.getElementById("overlay").classList.remove("open");
  document.body.style.overflow = "";
}

/* ════════════════════════════════════════════════════════
   Q U I Z   S Y S T E M
   ════════════════════════════════════════════════════════ */

let quizQuestions = [];
let quizIdx       = 0;
let quizOk        = 0;
let quizNo        = 0;
let quizLocked    = false;

/* ── Get distractors ── */
function getDistractor(correctPast, pool) {
  return shuffle(pool.filter(v => v.past !== correctPast))[0].past;
}
function getDistractors(correctPast, pool) {
  return shuffle(pool.filter(v => v.past !== correctPast)).slice(0, 3).map(v => v.past);
}

/* ── Build question ── */
function buildQuestion(verb, pool) {
  const roll = Math.random();
  if (roll < 0.40) {
    const distractor     = getDistractor(verb.past, pool);
    const correctOnRight = Math.random() > 0.5;
    return {
      mech: "swipe", label: "Swipe to the past tense", verb,
      leftOpt:     correctOnRight ? distractor : verb.past,
      rightOpt:    correctOnRight ? verb.past  : distractor,
      correctSide: correctOnRight ? "right"    : "left",
    };
  }
  if (roll < 0.70) {
    return { mech: "type", label: "Type the past tense", verb };
  }
  const opts = shuffle([verb.past, ...getDistractors(verb.past, pool)]);
  return { mech: "choice", label: "Pop the correct bubble", opts, correct: verb.past, verb };
}

function buildQuiz(verbPool) {
  return shuffle(verbPool).map(v => buildQuestion(v, verbPool));
}

/* ── Start quiz ── */
function startQuiz() {
  if (bubbleRAF) { cancelAnimationFrame(bubbleRAF); bubbleRAF = null; }
  updateDeck();
  const base = currentFilter === "all"
    ? ALL_VERBS.slice(0, deck.length)
    : ALL_VERBS.slice(0, deck.length).filter(v => v.type === currentFilter);

  quizQuestions = buildQuiz(base);
  quizIdx = 0; quizOk = 0; quizNo = 0; quizLocked = false;

  document.querySelector(".score-correct .score-lbl").textContent = "Correct";
  document.querySelector(".score-skip    .score-lbl").textContent = "Wrong";
  document.getElementById("scoreCorrect").textContent = "0";
  document.getElementById("scoreSkip").textContent    = "0";

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
  const pct   = Math.round((quizIdx / total) * 100);
  document.getElementById("progressFill").style.width  = pct + "%";
  document.getElementById("progressLabel").textContent = `${Math.min(quizIdx + 1, total)} / ${total}`;
  document.getElementById("scoreCorrect").textContent  = quizOk;
  document.getElementById("scoreSkip").textContent     = quizNo;
}

/* ── Avanzar a la siguiente pregunta con animación de salida ── */
function animateToNextQuestion(flyDirection, delay) {
  const c1   = document.getElementById("qCard1");
  const wait = delay !== undefined ? delay : 700;

  setTimeout(() => {
    c1.style.transition = "none";
    const flyClass = flyDirection === "right" ? "fly-right"
                   : flyDirection === "left"  ? "fly-left"
                   : "fly-up";

    c1.classList.remove("top");
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
    c2.style.opacity   = "1";
  }
  if (c3) {
    c3.style.transform = "translateY(7px) scale(0.96)";
    c3.style.opacity   = "1";
  }
}

/* ── Render current quiz question ── */
function renderQuizQuestion(animateIn = false) {
  if (quizIdx >= quizQuestions.length) { showQuizResults(); return; }

  quizLocked = false;
  const q    = quizQuestions[quizIdx];
  const c1   = document.getElementById("qCard1");

  const qStackCards = document.getElementById("qStackCards");
  qStackCards.classList.remove("results-mode");

  c1.style.cssText = "";
  c1.className     = "quiz-card top";
  if (q.mech === "choice") c1.classList.add("no-drag");
  if (animateIn) {
    void c1.offsetWidth;
    c1.classList.add("quiz-enter");
    c1.addEventListener("animationend", () => c1.classList.remove("quiz-enter"), { once: true });
  }

  const c2 = document.getElementById("qCard2");
  const c3 = document.getElementById("qCard3");
  if (c2) { c2.style.cssText = ""; c2.className = "quiz-card c2"; }
  if (c3) { c3.style.cssText = ""; c3.className = "quiz-card c3"; }

  hideSwipeGhosts();

  const dirRow = document.getElementById("qDirRow");
  const body   = document.getElementById("qBody");
  document.getElementById("qLabel").textContent = q.label;

  if (q.mech === "swipe") {
    dirRow.style.display = "flex";
    body.innerHTML =
      `<div class="qsw-verb">${q.verb.present}</div>` +
      `<div class="qsw-sub">past tense</div>` +
      `<div class="qsw-opts">` +
        `<div class="qsw-opt" id="qOptL">${q.leftOpt}</div>` +
        `<div class="qsw-or">or</div>` +
        `<div class="qsw-opt" id="qOptR">${q.rightOpt}</div>` +
      `</div>`;

  } else if (q.mech === "type") {
    dirRow.style.display = "none";
    body.innerHTML =
      `<div class="qtype-verb">${q.verb.present}</div>` +
      `<div class="qtype-wrap">` +
        `<div class="qtype-tip">Write the past tense below</div>` +
        `<input id="qTypeInput" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="past tense…" />` +
        `<div class="qtype-fb" id="qTypeFb"></div>` +
      `</div>`;

    const inp = document.getElementById("qTypeInput");
    inp.addEventListener("keydown", function(e) {
      if (e.key !== "Enter") return;
      e.preventDefault();
      if (quizLocked) return;
      const val     = this.value.trim().toLowerCase();
      const targets = q.verb.past.toLowerCase().split("/").map(s => s.trim());
      const isOk    = targets.includes(val);
      this.className = isOk ? "right" : "wrong";
      const fb = document.getElementById("qTypeFb");
      fb.textContent = isOk ? "✓ Correct!" : "Answer: " + q.verb.past;
      fb.style.color = isOk ? "var(--quiz-ok)" : "var(--quiz-no)";
      this.disabled  = true;
      quizLocked     = true;
      if (isOk) quizOk++; else quizNo++;
      updateQuizHeader();
      animateToNextQuestion("up", 820);
    });
    setTimeout(() => { try { inp.focus(); } catch(e) {} }, 80);

  } else {
    dirRow.style.display = "none";
    body.innerHTML =
      `<div class="qbubble-wrap">` +
        `<div class="qbubble-verb">${q.verb.present}</div>` +
        `<div class="qbubble-hint">Pop the correct past tense</div>` +
        `<canvas class="qbubble-canvas" id="qBubbleCanvas"></canvas>` +
      `</div>`;
    initBubbles(q.opts, q.correct);
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
let bubbles   = [];

function initBubbles(opts, correct) {
  const canvas = document.getElementById("qBubbleCanvas");
  if (!canvas) return;
  if (bubbleRAF) { cancelAnimationFrame(bubbleRAF); bubbleRAF = null; }

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const W   = canvas.offsetWidth;
  const H   = canvas.offsetHeight;
  canvas.width  = W * dpr;
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

  const palOrder = [0,1,2,3].sort(() => Math.random()-0.5);

  /* ── Radio más grande aprovechando el canvas más alto ── */
  const R = Math.min(W * 0.18, H * 0.20, 62);

  /* ── Cuadrantes bien distribuidos ── */
  const quadCenters = [
    { x: W*0.27, y: H*0.28 },
    { x: W*0.73, y: H*0.28 },
    { x: W*0.27, y: H*0.72 },
    { x: W*0.73, y: H*0.72 },
  ];

  bubbles = opts.map((opt, i) => {
    const qc = quadCenters[i];
    return {
      x:    qc.x + (Math.random()-0.5)*16,
      y:    qc.y + (Math.random()-0.5)*16,
      r:    R + (Math.random()-0.5)*6,
      vx:   (Math.random()-0.5)*0.55,
      vy:   (Math.random()-0.5)*0.55,
      phase: Math.random()*Math.PI*2,
      text:  opt,
      correct: opt === correct,
      pal:  PALETTES[palOrder[i]],
      state:  'alive',
      popT:   0,
      particles: [],
    };
  });

  /* Separar solapamientos iniciales */
  for (let iter = 0; iter < 40; iter++) {
    for (let a = 0; a < bubbles.length; a++) {
      for (let b2 = a+1; b2 < bubbles.length; b2++) {
        const ba = bubbles[a], bb = bubbles[b2];
        const dx = bb.x - ba.x, dy = bb.y - ba.y;
        const dist = Math.sqrt(dx*dx+dy*dy);
        const minD = ba.r + bb.r + 6;
        if (dist < minD && dist > 0) {
          const push = (minD-dist)/2;
          const nx = dx/dist, ny = dy/dist;
          ba.x -= nx*push; ba.y -= ny*push;
          bb.x += nx*push; bb.y += ny*push;
        }
      }
    }
  }

  for (const b of bubbles) {
    b.x = Math.max(b.r, Math.min(W-b.r, b.x));
    b.y = Math.max(b.r, Math.min(H-b.r, b.y));
  }

  let done = false;
  let t    = 0;

  function spawnParticles(b) {
    const count = 14;
    for (let i = 0; i < count; i++) {
      const angle = (i/count)*Math.PI*2 + Math.random()*0.4;
      const speed = 2.5 + Math.random()*3;
      b.particles.push({
        x: b.x, y: b.y,
        vx: Math.cos(angle)*speed,
        vy: Math.sin(angle)*speed,
        r: 3+Math.random()*4,
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
      const eased = 1 - Math.pow(1-Math.min(b.popT,1), 3);
      const scale = 1 + eased * 0.7;
      ctx.globalAlpha = Math.max(0, 1 - eased*1.1);
      ctx.translate(b.x, b.y);
      ctx.scale(scale, scale);

      ctx.beginPath();
      ctx.arc(0, 0, b.r, 0, Math.PI*2);
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth   = 4 * (1/scale);
      ctx.stroke();

      ctx.strokeStyle = '#10b981';
      ctx.lineWidth   = 3 * (1/scale);
      ctx.lineCap     = 'round';
      ctx.lineJoin    = 'round';
      ctx.beginPath();
      ctx.moveTo(-b.r*0.28, 0);
      ctx.lineTo(-b.r*0.06, b.r*0.24);
      ctx.lineTo(b.r*0.30, -b.r*0.22);
      ctx.stroke();

      if (b.popT >= 1) b.state = 'dead';

    } else if (b.state === 'popping-no') {
      b.popT += 0.055;
      const shakeAmp = Math.max(0, 1-b.popT)*10;
      const shakeX   = Math.sin(b.popT * 38) * shakeAmp;
      const scale    = Math.max(0, 1 - Math.max(0, b.popT-0.35)*1.4);
      ctx.globalAlpha = Math.max(0, 1 - Math.max(0, b.popT-0.35)*1.8);
      ctx.translate(b.x + shakeX, b.y);
      ctx.scale(scale, scale);

      ctx.beginPath();
      ctx.arc(0, 0, b.r, 0, Math.PI*2);
      ctx.fillStyle = isDark ? '#2d0a1255' : '#fef2f2';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 0, b.r, 0, Math.PI*2);
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth   = 3;
      ctx.lineCap     = 'round';
      ctx.beginPath();
      ctx.moveTo(-b.r*0.25, -b.r*0.25);
      ctx.lineTo( b.r*0.25,  b.r*0.25);
      ctx.moveTo( b.r*0.25, -b.r*0.25);
      ctx.lineTo(-b.r*0.25,  b.r*0.25);
      ctx.stroke();

      ctx.font = `700 ${Math.min(16,(b.r*1.3)/(b.text.length*0.6))}px "DM Sans",sans-serif`;
      ctx.fillStyle = '#f43f5e';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.globalAlpha *= 0.5;
      ctx.fillText(b.text, 0, b.r*0.55);

      if (b.popT >= 1) b.state = 'dead';

    } else {
      /* ── Alive: deformación (squish) suave al acercarse a los bordes ── */
      const bob = Math.sin(t * 1.1 + b.phase) * 3;

      /* Cuánto margen queda entre el borde de la burbuja y cada pared */
      const marginL = b.x - b.r;
      const marginR = W - b.x - b.r;
      const marginT = b.y - b.r;
      const marginB = H - b.y - b.r;
      const squishZone = b.r * 0.9; /* zona donde empieza a deformarse */

      let scaleX = 1, scaleY = 1;

      /* Squish horizontal */
      if (marginL < squishZone && marginL >= 0) {
        const ratio = 1 - marginL / squishZone;
        scaleX = 1 - ratio * 0.25;
        scaleY = 1 + ratio * 0.20;
      } else if (marginR < squishZone && marginR >= 0) {
        const ratio = 1 - marginR / squishZone;
        scaleX = 1 - ratio * 0.25;
        scaleY = 1 + ratio * 0.20;
      }

      /* Squish vertical (multiplicativo para combinar con el horizontal) */
      if (marginT < squishZone && marginT >= 0) {
        const ratio = 1 - marginT / squishZone;
        scaleY *= 1 - ratio * 0.25;
        scaleX *= 1 + ratio * 0.20;
      } else if (marginB < squishZone && marginB >= 0) {
        const ratio = 1 - marginB / squishZone;
        scaleY *= 1 - ratio * 0.25;
        scaleX *= 1 + ratio * 0.20;
      }

      ctx.translate(b.x, b.y + bob);
      ctx.scale(scaleX, scaleY);

      /* Fill */
      ctx.beginPath();
      ctx.arc(0, 0, b.r, 0, Math.PI*2);
      ctx.fillStyle = b.pal.fill;
      ctx.fill();

      /* Stroke */
      ctx.beginPath();
      ctx.arc(0, 0, b.r, 0, Math.PI*2);
      ctx.strokeStyle = b.pal.stroke;
      ctx.lineWidth = 2;
      ctx.stroke();

      /* Shine */
      ctx.beginPath();
      ctx.ellipse(-b.r*0.26, -b.r*0.30, b.r*0.20, b.r*0.11, -0.5, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(255,255,255,0.50)';
      ctx.fill();

      /* Label */
      const fs = Math.min(17, (b.r*1.55) / (Math.max(b.text.length, 2) * 0.58));
      ctx.font = `700 ${fs}px "DM Sans",sans-serif`;
      ctx.fillStyle = b.pal.text;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(b.text, 0, 0);
    }

    ctx.restore();
  }

  function drawParticles(b) {
    for (const p of b.particles) {
      p.x   += p.vx;
      p.y   += p.vy;
      p.vy  += 0.12;
      p.life -= 0.035;
      if (p.life <= 0) continue;
      ctx.save();
      ctx.globalAlpha = p.life * 0.9;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI*2);
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
      b.x  += b.vx;
      b.y  += b.vy;
      b.vx += (Math.random()-0.5)*0.04;
      b.vy += (Math.random()-0.5)*0.04;
      const spd = Math.sqrt(b.vx*b.vx + b.vy*b.vy);
      if (spd > 0.65) { b.vx = b.vx/spd*0.65; b.vy = b.vy/spd*0.65; }
      /* Rebote suave en paredes — la burbuja puede tocar el borde sin cortarse */
      if (b.x-b.r < 0)  { b.x = b.r;     b.vx =  Math.abs(b.vx); }
      if (b.x+b.r > W)  { b.x = W-b.r;   b.vx = -Math.abs(b.vx); }
      if (b.y-b.r < 0)  { b.y = b.r;     b.vy =  Math.abs(b.vy); }
      if (b.y+b.r > H)  { b.y = H-b.r;   b.vy = -Math.abs(b.vy); }
    }

    /* Colisión elástica entre burbujas */
    for (let a = 0; a < alive.length; a++) {
      for (let i = a+1; i < alive.length; i++) {
        const ba = alive[a], bb = alive[i];
        const dx   = bb.x - ba.x;
        const dy   = bb.y - ba.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const minD = ba.r + bb.r;
        if (dist < minD && dist > 0.01) {
          const overlap = (minD - dist) / 2;
          const nx = dx/dist, ny = dy/dist;
          ba.x -= nx*overlap; ba.y -= ny*overlap;
          bb.x += nx*overlap; bb.y += ny*overlap;
          const dvx = ba.vx - bb.vx;
          const dvy = ba.vy - bb.vy;
          const dot = dvx*nx + dvy*ny;
          if (dot > 0) {
            ba.vx -= dot*nx * 0.9;
            ba.vy -= dot*ny * 0.9;
            bb.vx += dot*nx * 0.9;
            bb.vy += dot*ny * 0.9;
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

  /* ── Hit detection: coordenadas puras, cero DOM ── */
  function handleTap(clientX, clientY) {
    if (quizLocked) return;
    const rect = canvas.getBoundingClientRect();
    const mx   = clientX - rect.left;
    const my   = clientY - rect.top;

    for (const b of bubbles) {
      if (b.state !== 'alive') continue;
      const dx = mx - b.x;
      const dy = my - b.y;
      if (Math.sqrt(dx*dx + dy*dy) > b.r) continue;

      quizLocked = true;

      if (b.correct) {
        b.state = 'popping-ok';
        spawnParticles(b);
        for (const ob of bubbles) {
          if (ob !== b) { ob.state = 'popping-no'; ob.popT = 0.38; }
        }
        quizOk++;
      } else {
        b.state = 'popping-no';
        b.popT  = 0;
        for (const ob of bubbles) {
          if (ob.correct) {
            ob.state = 'popping-ok';
            spawnParticles(ob);
          } else if (ob !== b) {
            ob.state = 'popping-no';
            ob.popT  = 0.38;
          }
        }
        quizNo++;
      }

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
  const q    = quizQuestions[quizIdx];
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

  if (isOk) quizOk++; else quizNo++;
  updateQuizHeader();
  hideSwipeGhosts();

  const c1  = document.getElementById("qCard1");
  const tx  = swiped === "right" ? 160 : -160;
  const rot = swiped === "right" ? 18  : -18;
  c1.style.transition = "transform 0.28s cubic-bezier(0.4,0,0.6,1), opacity 0.28s";
  c1.style.transform  = `translateX(${tx}%) rotate(${rot}deg)`;
  c1.style.opacity    = "0";

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

  const t    = 40;
  const optL = document.getElementById("qOptL");
  const optR = document.getElementById("qOptR");
  if (optL && optR) {
    if (qCx < -t) {
      optL.style.background = "var(--quiz-hover)"; optL.style.color = "var(--quiz-hover-text)";
      optR.style.background = "";                  optR.style.color = "";
    } else if (qCx > t) {
      optR.style.background = "var(--quiz-hover)"; optR.style.color = "var(--quiz-hover-text)";
      optL.style.background = "";                  optL.style.color = "";
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
    c1.style.transform  = "";
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

function showQuizResults() {
  const total = quizQuestions.length;
  const pct   = Math.round((quizOk / total) * 100);

  document.getElementById("progressFill").style.width  = "100%";
  document.getElementById("progressLabel").textContent = `${total} / ${total}`;
  document.getElementById("scoreCorrect").textContent  = quizOk;
  document.getElementById("scoreSkip").textContent     = quizNo;

  const qStackCards = document.getElementById("qStackCards");
  qStackCards.classList.add("results-mode");

  document.getElementById("qDirRow").style.display = "none";

  const qResultScreen = document.getElementById("quizResultScreen");
  const emoji   = pct >= 90 ? "🏆" : pct >= 70 ? "🎉" : pct >= 50 ? "💪" : "📚";
  const title   = pct >= 90 ? "Outstanding!" : pct >= 70 ? "Great work!" : pct >= 50 ? "Good effort!" : "Keep going!";
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
      <button class="restart-btn quiz-back-btn" onclick="backToCards()">Back to Cards</button>
    </div>
  `;
  qResultScreen.classList.add("show");
}

/* ── Back to cards ── */
function backToCards() {
  if (bubbleRAF) { cancelAnimationFrame(bubbleRAF); bubbleRAF = null; }
  document.querySelector(".score-correct .score-lbl").textContent = "Learned";
  document.querySelector(".score-skip    .score-lbl").textContent = "Skipped";
  const qResultScreen = document.getElementById("quizResultScreen");
  if (qResultScreen) qResultScreen.classList.remove("show");
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

document.getElementById("cardScene").addEventListener("click", (e) => {
  if (e.target.closest("#actions")) return;
  toggleFlip();
});

document.getElementById("btnCorrect").addEventListener("click", (e) => { e.stopPropagation(); correct++; next(); });
document.getElementById("btnSkip").addEventListener("click",    (e) => { e.stopPropagation(); skipped++;  next(); });
document.getElementById("btnDetail").addEventListener("click",  (e) => { e.stopPropagation(); openDetail(); });

document.getElementById("restartBtn").addEventListener("click", () => {
  buildDeck();
  document.getElementById("finishScreen").classList.remove("show");
  document.getElementById("stage").style.display = "flex";
  renderCard(true);
});

document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("overlay").addEventListener("click", (e) => {
  if (e.target === document.getElementById("overlay")) closeModal();
});

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    document.querySelector(".score-correct .score-lbl").textContent = "Learned";
    document.querySelector(".score-skip    .score-lbl").textContent = "Skipped";
    buildDeck();
    document.getElementById("finishScreen").classList.remove("show");
    document.getElementById("quizScreen").style.display = "none";
    document.getElementById("stage").style.display = "flex";
    renderCard(true);
  });
});

document.getElementById("shuffleBtn").addEventListener("click", () => {
  document.querySelector(".score-correct .score-lbl").textContent = "Learned";
  document.querySelector(".score-skip    .score-lbl").textContent = "Skipped";
  buildDeck();
  document.getElementById("finishScreen").classList.remove("show");
  document.getElementById("quizScreen").style.display = "none";
  document.getElementById("stage").style.display = "flex";
  renderCard(true);
});

document.getElementById("themeToggle").addEventListener("click", () => { dark = !dark; applyTheme(); });

/* Quiz swipe listeners */
const qStackEl = document.getElementById("qStackCards");
qStackEl.addEventListener("mousedown",  qDragStart);
qStackEl.addEventListener("touchstart", qDragStart, { passive: true });
document.addEventListener("mousemove",  qDragMove);
document.addEventListener("touchmove",  qDragMove, { passive: true });
document.addEventListener("mouseup",    qDragEnd);
document.addEventListener("touchend",   qDragEnd);

/* Keyboard shortcuts */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { closeModal(); return; }
  if (document.getElementById("overlay").classList.contains("open")) return;
  if (document.getElementById("finishScreen").classList.contains("show")) return;
  if (document.getElementById("quizScreen").style.display !== "none") return;
  if ((e.key === " " || e.key === "ArrowUp") && !isFlipped) { e.preventDefault(); toggleFlip(); }
  if (e.key === "ArrowRight" && isFlipped) { correct++; next(); }
  if (e.key === "ArrowLeft"  && isFlipped) { skipped++;  next(); }
});

/* ── INIT ── */
buildDeck();
renderCard(false);
