/* ── Storage Keys ── */
const GOALS_KEY   = "vfc_goals_done";
const GOALS_STATS = "vfc_goals_stats";
const EXP_KEY     = "vfc_exp_total";

/* ── EXP helpers ── */
function _readExp()  { try { return Math.max(0, parseInt(localStorage.getItem(EXP_KEY) || "0", 10)); } catch { return 0; } }
function _writeExp(v){ try { localStorage.setItem(EXP_KEY, String(Math.max(0, v))); } catch {} }

/* ── Niveles: 5 escalones, cada vez más difíciles ── */
const LEVELS = [
  { n: 1, name: "Novato",      icon: "🌱", color: "#639922", bg: "#eaf3de", expStart: 0,    expNeeded: 100  },
  { n: 2, name: "Aprendiz",    icon: "⚔️", color: "#534ab7", bg: "#eeedfe", expStart: 100,  expNeeded: 250  },
  { n: 3, name: "Intermedio",  icon: "🔥", color: "#854f0b", bg: "#faeeda", expStart: 350,  expNeeded: 450  },
  { n: 4, name: "Avanzado",    icon: "🏅", color: "#185fa5", bg: "#e6f1fb", expStart: 800,  expNeeded: 700  },
  { n: 5, name: "Maestro",     icon: "👑", color: "#993556", bg: "#fbeaf0", expStart: 1500, expNeeded: null },
];

function getLevelFromExp(totalExp) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalExp >= LEVELS[i].expStart) return LEVELS[i];
  }
  return LEVELS[0];
}

/** Suma EXP, actualiza el badge del header y dispara levelsUp si aplica */
function addExp(amount) {
  if (!amount || amount <= 0) return;
  const before = _readExp();
  const after  = before + amount;
  _writeExp(after);
  const lvBefore = getLevelFromExp(before);
  const lvAfter  = getLevelFromExp(after);
  updateLevelBadge(after);
  if (lvAfter.n > lvBefore.n) {
    setTimeout(() => celebrateLevelUp(lvAfter), 450);
  }
}

/** Renderiza el badge de nivel en el header */
function updateLevelBadge(totalExp) {
  totalExp = totalExp ?? _readExp();
  const lv = getLevelFromExp(totalExp);
  const into = totalExp - lv.expStart;
  const pct  = lv.expNeeded ? Math.min(100, Math.round((into / lv.expNeeded) * 100)) : 100;

  const badge = document.getElementById("levelBadge");
  if (!badge) return;
  badge.style.display = "inline-flex";

  const iconEl  = document.getElementById("lvIcon");
  const nameEl  = document.getElementById("lvName");
  const fillEl  = document.getElementById("lvBarFill");
  const numsEl  = document.getElementById("lvExpNums");

  if (iconEl)  iconEl.textContent  = lv.icon;
  if (nameEl)  nameEl.textContent  = lv.name;
  if (fillEl)  { fillEl.style.width = pct + "%"; fillEl.style.background = lv.color; }
  if (numsEl) {
    const remaining = lv.expNeeded ? (lv.expNeeded - into) + " EXP para subir" : "Nivel máximo ✓";
    numsEl.textContent = remaining;
  }
  badge.title = `Nivel ${lv.n} · ${totalExp} EXP totales`;
}

/** Celebración al subir de nivel */
function celebrateLevelUp(lv) {
  const ov = document.getElementById("levelUpOverlay");
  if (!ov) return;
  document.getElementById("luIcon").textContent = lv.icon;
  document.getElementById("luName").textContent = lv.name;
  document.getElementById("luNum").textContent  = "Nivel " + lv.n;
  ov.classList.add("show");
  document.body.style.overflow = "hidden";
}
function closeLevelUp() {
  const ov = document.getElementById("levelUpOverlay");
  if (!ov) return;
  ov.classList.remove("show");
  document.body.style.overflow = "";
}

/* ═══════════════════════════════════════════════════════════════
   G O A L S   D A T A  (reemplaza GOALS y EXTRA_GOALS por completo)
   ═══════════════════════════════════════════════════════════════ */

/*  EXP por tier:
    Inicio      →  10 EXP
    Bronce      →  25 EXP
    Plata       →  60 EXP
    Oro         → 120 EXP
    Legendario  → 250 EXP
    Épico       → 300 EXP   */

const EXP_BY_TIER = {
  "Inicio": 10, "Bronce": 25, "Plata": 60,
  "Oro": 120, "Legendario": 250, "Épico": 300,
};

const GOALS = [
  /* ─── APRENDIZAJE ─── */
  { id: "first_step",    icon: "🌿", name: "Primer paso",      desc: "Marca tu primer verbo como aprendido.",          tier: "Inicio",    target: 1,   getProgress: s => s.learned || 0 },
  { id: "studious_10",   icon: "📗", name: "Vocabulario I",    desc: "Domina 10 verbos en total.",                     tier: "Bronce",    target: 10,  getProgress: s => s.learned || 0 },
  { id: "studious_25",   icon: "📘", name: "Vocabulario II",   desc: "Domina 25 verbos en total.",                     tier: "Bronce",    target: 25,  getProgress: s => s.learned || 0 },
  { id: "studious_50",   icon: "📙", name: "Vocabulario III",  desc: "Domina 50 verbos. Ya conoces muchos.",           tier: "Plata",     target: 50,  getProgress: s => s.learned || 0 },
  { id: "studious_100",  icon: "📕", name: "Vocabulario IV",   desc: "Domina 100 verbos. Vas por la mitad.",           tier: "Oro",       target: 100, getProgress: s => s.learned || 0 },
  { id: "studious_200",  icon: "📚", name: "Biblioteca",       desc: "Domina los 200 verbos del mazo completo.",       tier: "Épico",     target: 200, getProgress: s => s.learned || 0 },

  /* ─── RONDAS ─── */
  { id: "rounds_1",      icon: "🔄", name: "Primera ronda",    desc: "Completa tu primera ronda de flashcards.",       tier: "Inicio",    target: 1,   getProgress: s => s.rounds_done || 0 },
  { id: "rounds_10",     icon: "🔁", name: "10 rondas",        desc: "Completa 10 rondas completas.",                  tier: "Bronce",    target: 10,  getProgress: s => s.rounds_done || 0 },
  { id: "rounds_25",     icon: "⚡", name: "25 rondas",        desc: "Completa 25 rondas.",                            tier: "Plata",     target: 25,  getProgress: s => s.rounds_done || 0 },
  { id: "rounds_75",     icon: "🏃", name: "Maratonista",      desc: "Completa 75 rondas. La constancia es clave.",    tier: "Oro",       target: 75,  getProgress: s => s.rounds_done || 0 },
  { id: "rounds_200",    icon: "🌊", name: "Flujo infinito",   desc: "Completa 200 rondas de estudio.",                tier: "Legendario",target: 200, getProgress: s => s.rounds_done || 0 },

  /* ─── SIN SALTOS ─── */
  { id: "no_skip_1",     icon: "🎯", name: "Sin miedo",        desc: "Termina una ronda sin hacer 'I don't know'.",    tier: "Plata",     target: 1,   getProgress: s => s.no_skip_rounds || 0 },
  { id: "no_skip_5",     icon: "🏹", name: "Confiado",         desc: "Termina 5 rondas sin saltar ningún verbo.",      tier: "Oro",       target: 5,   getProgress: s => s.no_skip_rounds || 0 },
  { id: "no_skip_20",    icon: "🗡️", name: "Implacable",       desc: "20 rondas perfectas sin saltar. Increíble.",     tier: "Legendario",target: 20,  getProgress: s => s.no_skip_rounds || 0 },

  /* ─── RECUPERACIÓN ─── */
  { id: "comeback_5",    icon: "💪", name: "Recuperación I",   desc: "Domina 5 verbos que antes saltaste.",            tier: "Bronce",    target: 5,   getProgress: s => s.recovered_skips || 0 },
  { id: "comeback_25",   icon: "🔝", name: "Recuperación II",  desc: "Domina 25 verbos que antes saltaste.",           tier: "Plata",     target: 25,  getProgress: s => s.recovered_skips || 0 },
  { id: "comeback_100",  icon: "🦅", name: "Fénix",            desc: "Recupera 100 verbos salteados. Eres increíble.", tier: "Legendario",target: 100, getProgress: s => s.recovered_skips || 0 },

  /* ─── QUIZZES ─── */
  { id: "first_quiz",    icon: "📝", name: "Primer quiz",      desc: "Termina tu primer quiz.",                        tier: "Inicio",    target: 1,   getProgress: s => s.quizzes_done || 0 },
  { id: "quiz_5",        icon: "📋", name: "Quizzer I",        desc: "Completa 5 quizzes.",                            tier: "Bronce",    target: 5,   getProgress: s => s.quizzes_done || 0 },
  { id: "quiz_20",       icon: "📊", name: "Quizzer II",       desc: "Completa 20 quizzes.",                           tier: "Plata",     target: 20,  getProgress: s => s.quizzes_done || 0 },
  { id: "quiz_50",       icon: "📈", name: "Adicto al quiz",   desc: "Completa 50 quizzes. ¿Nunca te cansas?",         tier: "Oro",       target: 50,  getProgress: s => s.quizzes_done || 0 },
  { id: "quiz_100",      icon: "🎓", name: "PhD de verbos",    desc: "100 quizzes completados. Leyenda.",              tier: "Legendario",target: 100, getProgress: s => s.quizzes_done || 0 },

  /* ─── QUIZZES PERFECTOS ─── */
  { id: "clean_quiz_1",  icon: "✨", name: "Quiz limpio",      desc: "Termina un quiz sin ningún error.",              tier: "Plata",     target: 1,   getProgress: s => s.perfect_quizzes || 0 },
  { id: "clean_quiz_5",  icon: "💫", name: "Perfeccionista I", desc: "5 quizzes perfectos (0 errores).",               tier: "Oro",       target: 5,   getProgress: s => s.perfect_quizzes || 0 },
  { id: "clean_quiz_20", icon: "💎", name: "Perfeccionista II","desc": "20 quizzes perfectos seguidos o separados.",  tier: "Legendario",target: 20,  getProgress: s => s.perfect_quizzes || 0 },

  /* ─── RACHAS ─── */
  { id: "streak_3",      icon: "🔥", name: "Constancia I",     desc: "Mantén una racha de 3 días.",                   tier: "Inicio",    target: 3,   getProgress: (s,st) => st || 0 },
  { id: "streak_7",      icon: "🚀", name: "Semana de fuego",  desc: "Racha de 7 días consecutivos.",                  tier: "Bronce",    target: 7,   getProgress: (s,st) => st || 0 },
  { id: "streak_14",     icon: "⚡", name: "2 semanas",        desc: "14 días seguidos estudiando.",                   tier: "Plata",     target: 14,  getProgress: (s,st) => st || 0 },
  { id: "streak_30",     icon: "🌙", name: "Mes legendario",   desc: "30 días de racha ininterrumpida.",               tier: "Oro",       target: 30,  getProgress: (s,st) => st || 0 },
  { id: "streak_60",     icon: "🌟", name: "2 meses",          desc: "60 días. Esto ya es un hábito real.",            tier: "Oro",       target: 60,  getProgress: (s,st) => st || 0 },
  { id: "streak_100",    icon: "👑", name: "100 días",         desc: "100 días seguidos. Carácter de hierro.",         tier: "Legendario",target: 100, getProgress: (s,st) => st || 0 },
  { id: "streak_365",    icon: "🏆", name: "Un año entero",    desc: "365 días de racha. Eso es devoción absoluta.",   tier: "Épico",     target: 365, getProgress: (s,st) => st || 0 },

  /* ─── EXPLORACIÓN ─── */
  { id: "explorer_1",    icon: "🔍", name: "Curioso I",        desc: "Abre detalles de un verbo con ✦.",               tier: "Inicio",    target: 1,   getProgress: s => s.details || 0 },
  { id: "explorer_15",   icon: "🔎", name: "Curioso II",       desc: "Explora detalles de 15 verbos.",                 tier: "Bronce",    target: 15,  getProgress: s => s.details || 0 },
  { id: "explorer_50",   icon: "🧭", name: "Explorador",       desc: "Explora 50 verbos con detalles y audio.",        tier: "Plata",     target: 50,  getProgress: s => s.details || 0 },
  { id: "explorer_150",  icon: "🗺️", name: "Cartógrafo",       desc: "Explora 150 verbos. Cada detalle cuenta.",       tier: "Oro",       target: 150, getProgress: s => s.details || 0 },

  /* ─── HONESTIDAD (skips) ─── */
  { id: "humble_1",      icon: "🙋", name: "Honesto",          desc: "Usa 'I don't know' por primera vez.",            tier: "Inicio",    target: 1,   getProgress: s => s.skipped_total || 0 },
  { id: "humble_50",     icon: "🙌", name: "Humilde II",       desc: "Usa skip 50 veces. Aprende de los errores.",     tier: "Bronce",    target: 50,  getProgress: s => s.skipped_total || 0 },
  { id: "humble_200",    icon: "🧘", name: "Budista",          desc: "500 skips totales. La humildad es sabiduría.",   tier: "Plata",     target: 500, getProgress: s => s.skipped_total || 0 },

  /* ─── AUDIO ─── */
  { id: "speed_slow",    icon: "🐢", name: "Pace lento",       desc: "Usa velocidad Lento al menos una vez.",          tier: "Inicio",    target: 1,   getProgress: s => s.usedSlow ? 1 : 0 },
  { id: "speed_fast",    icon: "🐇", name: "Pace rápido",      desc: "Usa velocidad Rápido al menos una vez.",         tier: "Inicio",    target: 1,   getProgress: s => s.usedFast ? 1 : 0 },
  { id: "audio_25",      icon: "🎧", name: "Oído entrenado",   desc: "Escucha la pronunciación de 25 verbos.",         tier: "Bronce",    target: 25,  getProgress: s => s.details || 0 },
];

/* ─── helpers read/write ─── */
function _gReadStats() { try { return JSON.parse(localStorage.getItem(GOALS_STATS) || "{}"); } catch { return {}; } }
function _gWriteStats(s){ try { localStorage.setItem(GOALS_STATS, JSON.stringify(s)); } catch {} }
function _gReadDone()   { try { return new Set(JSON.parse(localStorage.getItem(GOALS_KEY) || "[]")); } catch { return new Set(); } }
function _gWriteDone(set){ try { localStorage.setItem(GOALS_KEY, JSON.stringify([...set])); } catch {} }

/* ─── Counter mutators (llamados desde gameplay) ─── */
function goalsBumpLearned() {
  const s = _gReadStats(); s.learned = (s.learned || 0) + 1; _gWriteStats(s);
  checkGoals({ silent: false });
}
function goalsBumpRecoveredSkip() {
  const s = _gReadStats(); s.recovered_skips = (s.recovered_skips || 0) + 1; _gWriteStats(s);
  checkGoals({ silent: false });
}
function goalsOnRoundFinished({ skipped, correct, total }) {
  const s = _gReadStats();
  s.rounds_done = (s.rounds_done || 0) + 1;
  if ((skipped || 0) === 0 && (correct || 0) > 0) s.no_skip_rounds = (s.no_skip_rounds || 0) + 1;
  _gWriteStats(s);
  checkGoals({ silent: false });
}
function goalsOnQuizFinished({ correct, wrong, total }) {
  const s = _gReadStats();
  s.quizzes_done = (s.quizzes_done || 0) + 1;
  if ((wrong || 0) === 0 && (correct || 0) > 0) s.perfect_quizzes = (s.perfect_quizzes || 0) + 1;
  _gWriteStats(s);
  checkGoals({ silent: false });
}

function _currentStreakReadOnly() {
  try { return parseInt(localStorage.getItem(STREAK_KEY) || "0", 10); } catch { return 0; }
}

/* ─── Evalúa todos los goals; otorga EXP a los nuevos ─── */
function checkGoals(opts) {
  opts = opts || {};
  const stats  = _gReadStats();
  const streak = _currentStreakReadOnly();
  const done   = _gReadDone();
  let newlyDone = [];

  GOALS.forEach(g => {
    if (done.has(g.id)) return;
    const cur = g.getProgress(stats, streak) || 0;
    if (cur >= g.target) { done.add(g.id); newlyDone.push(g); }
  });

  if (newlyDone.length > 0) {
    _gWriteDone(done);
    // Otorgar EXP
    newlyDone.forEach(g => addExp(EXP_BY_TIER[g.tier] || 10));
  }

  _refreshGoalsDot(newlyDone.length);
  if (!opts.silent && newlyDone.length > 0) {
    newlyDone.forEach((g, i) => setTimeout(() => showGoalToast(g), i * 1900));
  }
  if (document.getElementById("goalsOverlay")?.classList.contains("open")) renderGoalsList();
}

function _refreshGoalsDot(forceShow) {
  const dot  = document.getElementById("goalsBtnDot");
  if (!dot) return;
  const stats = _gReadStats();
  const seen  = stats._goals_seen_count || 0;
  const done  = _gReadDone().size;
  if (forceShow || done > seen) dot.hidden = false;
}

function showGoalToast(goal) {
  const toast = document.getElementById("goalToast");
  if (!toast) return;
  const emoji = document.getElementById("goalToastEmoji");
  const title = document.getElementById("goalToastTitle");
  const name  = document.getElementById("goalToastName");
  const expEl = document.getElementById("goalToastExp");
  if (emoji) emoji.textContent = goal.icon;
  if (title) title.textContent = "¡Objetivo desbloqueado!";
  if (name)  name.textContent  = goal.name;
  if (expEl) expEl.textContent = "+" + (EXP_BY_TIER[goal.tier] || 10) + " EXP";
  toast.classList.add("show");
  if (emoji) { emoji.style.animation = "none"; void emoji.offsetWidth; emoji.style.animation = ""; }
  clearTimeout(showGoalToast._tid);
  showGoalToast._tid = setTimeout(() => toast.classList.remove("show"), 3400);
}

/* ─── Render lista de goals en el modal ─── */
function renderGoalsList() {
  const list = document.getElementById("goalsList");
  if (!list) return;
  const stats  = _gReadStats();
  const streak = _currentStreakReadOnly();
  const done   = _gReadDone();

  const completed = GOALS.filter(g => done.has(g.id)).length;
  const sumEl     = document.getElementById("goalsSummary");
  if (sumEl) sumEl.textContent = completed + " / " + GOALS.length + " completados";

  // Total EXP ganado y nivel actual
  const totalExp = _readExp();
  const lv       = getLevelFromExp(totalExp);
  const lvEl     = document.getElementById("goalsLevelInfo");
  if (lvEl) lvEl.textContent = lv.icon + " " + lv.name + " · " + totalExp + " EXP";

  list.innerHTML = GOALS.map(g => {
    const cur   = Math.min(g.target, g.getProgress(stats, streak) || 0);
    const pct   = Math.round((cur / Math.max(1, g.target)) * 100);
    const isDone= done.has(g.id) || cur >= g.target;
    const exp   = EXP_BY_TIER[g.tier] || 10;
    const tierClass = "goal-tier-" + g.tier.toLowerCase().replace(/é/g,"e").replace(/ó/g,"o");
    return `
      <div class="goal-item ${isDone ? "completed" : ""}" data-goal-id="${g.id}">
        <div class="goal-icon">${g.icon}</div>
        <div class="goal-body">
          <div class="goal-name">
            <span>${g.name}</span>
            <span class="goal-tier ${tierClass}">${g.tier}</span>
          </div>
          <div class="goal-desc">${g.desc}</div>
          <div class="goal-progress">
            <div class="goal-bar"><div class="goal-bar-fill" style="width:${isDone?100:pct}%"></div></div>
            <span class="goal-count">${cur} / ${g.target}</span>
          </div>
        </div>
        <div class="goal-right-col">
          <div class="goal-exp-badge ${isDone ? "earned" : ""}">+${exp}</div>
          <div class="goal-check" aria-hidden="true">${isDone ? "✓" : ""}</div>
        </div>
      </div>`;
  }).join("");
}

function openGoalsModal() {
  const ov = document.getElementById("goalsOverlay");
  if (!ov) return;
  renderGoalsList();
  ov.classList.add("open");
  document.body.style.overflow = "hidden";
  const stats = _gReadStats();
  stats._goals_seen_count = _gReadDone().size;
  _gWriteStats(stats);
  const dot = document.getElementById("goalsBtnDot");
  if (dot) dot.hidden = true;
}
function closeGoalsModal() {
  const ov = document.getElementById("goalsOverlay");
  if (!ov) return;
  ov.classList.remove("open");
  document.body.style.overflow = "";
}

/* ─── Wire goals + level UI ─── */
(function wireGoalsAndLevel() {
  // Goals modal
  const btn      = document.getElementById("goalsBtn");
  const closeBtn = document.getElementById("goalsClose");
  if (btn)      btn.addEventListener("click", (e) => { e.stopPropagation(); openGoalsModal(); });
  if (closeBtn) closeBtn.addEventListener("click", closeGoalsModal);
  document.addEventListener("click", (e) => {
    const ov = document.getElementById("goalsOverlay");
    if (ov?.classList.contains("open") && e.target?.classList.contains("goals-bg")) closeGoalsModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const ov = document.getElementById("goalsOverlay");
      if (ov?.classList.contains("open")) closeGoalsModal();
    }
  });

  // Level-up overlay close
  document.addEventListener("click", (e) => {
    if (e.target?.id === "luCloseBtn" || e.target?.classList?.contains("lu-bg")) closeLevelUp();
  });

  // Tracking: detail opens
  document.getElementById("btnDetail")?.addEventListener("click", () => {
    const s = _gReadStats(); s.details = (s.details || 0) + 1; _gWriteStats(s);
    checkGoals({ silent: false });
  }, true);

  // Tracking: skip total
  document.getElementById("btnSkip")?.addEventListener("click", () => {
    const s = _gReadStats(); s.skipped_total = (s.skipped_total || 0) + 1; _gWriteStats(s);
    checkGoals({ silent: false });
  }, true);

  // Tracking: audio speed
  document.querySelectorAll(".speed-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const v = parseFloat(chip.dataset.speed);
      const s = _gReadStats();
    if (v <= 0.55) s.usedSlow = true;
      if (v >= 1.2) s.usedFast = true;
      _gWriteStats(s);
      checkGoals({ silent: false });
    });
  });

  // Init: render level badge + check existing goals silently
  updateLevelBadge();
  try { checkGoals({ silent: true }); } catch {}
})();


/* ════════════════════════════════════════════════════════════════
   NUEVOS OBJETIVOS — se inyectan en GOALS al cargar
   ════════════════════════════════════════════════════════════════ */
const EXTRA_GOALS = [
  { id: "studious_5", icon: "📗", name: "Aprendiz II", desc: "Marca 5 verbos como 'I know it'", tier: "Bronce", target: 5, getProgress: s => s.learned || 0 },
  { id: "studious_25", icon: "📘", name: "Aprendiz III", desc: "Marca 25 verbos como 'I know it'", tier: "Plata", target: 25, getProgress: s => s.learned || 0 },
  { id: "studious_75", icon: "📙", name: "Aprendiz IV", desc: "Marca 75 verbos como 'I know it'", tier: "Oro", target: 75, getProgress: s => s.learned || 0 },
  { id: "explorer_1", icon: "🔍", name: "Explorador I", desc: "Abre detalles de 1 verbo (✦)", tier: "Inicio", target: 1, getProgress: s => s.details || 0 },
  { id: "explorer_10", icon: "🔎", name: "Explorador II", desc: "Explora 10 verbos con ✦", tier: "Bronce", target: 10, getProgress: s => s.details || 0 },
  { id: "explorer_25", icon: "🧭", name: "Explorador III", desc: "Explora 25 verbos con ✦", tier: "Plata", target: 25, getProgress: s => s.details || 0 },
  { id: "humble_1", icon: "🙋", name: "Honesto I", desc: "Usa 'I don't know' por primera vez", tier: "Inicio", target: 1, getProgress: s => s.skipped_total || 0 },
  { id: "humble_10", icon: "🙌", name: "Honesto II", desc: "Usa 'I don't know' 10 veces", tier: "Bronce", target: 10, getProgress: s => s.skipped_total || 0 },
  { id: "rounds_1", icon: "🔄", name: "Primera ronda", desc: "Completa tu primera ronda", tier: "Inicio", target: 1, getProgress: s => s.rounds_done || 0 },
  { id: "rounds_5", icon: "🔁", name: "5 rondas", desc: "Completa 5 rondas", tier: "Bronce", target: 5, getProgress: s => s.rounds_done || 0 },
  { id: "rounds_15", icon: "⚡", name: "15 rondas", desc: "Completa 15 rondas", tier: "Plata", target: 15, getProgress: s => s.rounds_done || 0 },
  { id: "quiz_3", icon: "📝", name: "Quizzer I", desc: "Completa 3 quizzes", tier: "Bronce", target: 3, getProgress: s => s.quizzes_done || 0 },
  { id: "quiz_10", icon: "📋", name: "Quizzer II", desc: "Completa 10 quizzes", tier: "Plata", target: 10, getProgress: s => s.quizzes_done || 0 },
  { id: "perfect_10", icon: "💯", name: "Perfeccionista II", desc: "Obtén 10 resultados perfectos en quiz", tier: "Oro", target: 10, getProgress: s => s.perfect_quizzes || 0 },
  { id: "speed_slow", icon: "🐢", name: "Pace lento", desc: "Usa velocidad Lento al menos una vez", tier: "Inicio", target: 1, getProgress: s => s.usedSlow ? 1 : 0 },
  { id: "speed_fast", icon: "🐇", name: "Pace rápido", desc: "Usa velocidad Rápido al menos una vez", tier: "Inicio", target: 1, getProgress: s => s.usedFast ? 1 : 0 },
  { id: "streak_14", icon: "🔥", name: "2 semanas", desc: "Mantén una racha de 14 días", tier: "Plata", target: 14, getProgress: (s, st) => st || 0 },
  { id: "streak_60", icon: "🌟", name: "2 meses", desc: "Mantén una racha de 60 días", tier: "Oro", target: 60, getProgress: (s, st) => st || 0 },
  { id: "streak_100", icon: "👑", name: "100 días", desc: "Mantén una racha de 100 días", tier: "Legendario", target: 100, getProgress: (s, st) => st || 0 },
];

// Orden secuencial por familia para desbloqueo progresivo
const GOAL_FAMILY_ORDER = {
  studious: ["first_step", "studious_10", "studious_5", "studious_25", "studious_75", "veteran_50", "master_100"],
  explorer: ["explorer_1", "explorer_10", "explorer_25"],
  humble: ["humble_1", "humble_10"],
  rounds: ["rounds_1", "rounds_5", "rounds_15"],
  quizzes: ["first_quiz", "quiz_3", "quiz_10"],
  perfect: ["clean_quiz", "perfectionist", "perfect_10"],
  speed: ["speed_slow", "speed_fast"],
  streak: ["streak_3", "streak_7", "streak_14", "streak_30", "streak_60", "streak_100"],
};

// Inyectar extra goals en GOALS si aún no existen
(function injectExtraGoals() {
  if (typeof GOALS === "undefined") return;
  const existingIds = new Set(GOALS.map(g => g.id));
  EXTRA_GOALS.forEach(g => { if (!existingIds.has(g.id)) GOALS.push(g); });
})();

// Helper: ¿el objetivo anterior de la familia ya está completado?
function isGoalFamilyUnlocked(id) {
  for (const order of Object.values(GOAL_FAMILY_ORDER)) {
    const idx = order.indexOf(id);
    if (idx <= 0) continue;
    const prevId = order[idx - 1];
    const done = new Set(JSON.parse(localStorage.getItem(GOALS_KEY) || "[]"));
    return done.has(prevId);
  }
  return true; // no está en ninguna familia → siempre desbloqueado
}

// Patch renderGoalsList para mostrar estado bloqueado
const _origRenderGoalsList = typeof renderGoalsList === "function" ? renderGoalsList : null;
if (_origRenderGoalsList) {
  window.renderGoalsList = function () {
    _origRenderGoalsList();
    // Marcar los bloqueados
    const list = document.getElementById("goalsList");
    if (!list) return;
    list.querySelectorAll(".goal-item").forEach(el => {
      const id = el.dataset.goalId;
      if (!id) return;
      if (!isGoalFamilyUnlocked(id)) el.classList.add("is-locked");
    });
  };
}

// Tracking detalles ✦ — capture=true para correr antes del handler existente
document.getElementById("btnDetail")?.addEventListener("click", () => {
  const s = _gReadStats();
  s.details = (s.details || 0) + 1;
  _gWriteStats(s);
  checkGoals({ silent: false });
}, true);

// Tracking skip total acumulado
document.getElementById("btnSkip")?.addEventListener("click", () => {
  const s = _gReadStats();
  s.skipped_total = (s.skipped_total || 0) + 1;
  _gWriteStats(s);
  checkGoals({ silent: false });
}, true);

// Tracking velocidades usadas
document.querySelectorAll(".speed-chip").forEach(chip => {
  chip.addEventListener("click", () => {
    const v = parseFloat(chip.dataset.speed);
    const s = _gReadStats();
    if (v <= 0.55) s.usedSlow = true;
    if (v >= 1.2) s.usedFast = true;
    _gWriteStats(s);
    checkGoals({ silent: false });
  });
});
