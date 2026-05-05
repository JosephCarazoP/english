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

document.getElementById("btnCorrect").addEventListener("click", (e) => {
  e.stopPropagation();
  if (practiceMode) {
    // En modo práctica: el verbo se domina y sale del set,
    // pero NO se le quita del contador "skipped" del resumen
    const v = deck[cursor];
    skippedDeck = skippedDeck.filter(x => x !== v);
    correct++;
    if (typeof goalsBumpRecoveredSkip === "function") goalsBumpRecoveredSkip();
  } else {
    correct++;
  }
  if (typeof goalsBumpLearned === "function") goalsBumpLearned();
  next();
});
document.getElementById("btnSkip").addEventListener("click", (e) => {
  e.stopPropagation();
  if (practiceMode) {
    // En modo práctica el skip se queda pendiente, no aumenta el total
  } else {
    const v = deck[cursor];
    if (!skippedDeck.includes(v)) skippedDeck.push(v);
    skipped++;
  }
  next();
});
document.getElementById("btnDetail").addEventListener("click", (e) => { e.stopPropagation(); openDetail(); });

document.getElementById("restartBtn").addEventListener("click", () => {
  buildDeck();
  showPracticePill(false);
  document.getElementById("finishScreen").classList.remove("show");
  document.getElementById("stage").style.display = "flex";
  renderCard(true);
});

const shareFinishBtn = document.getElementById("shareFinishBtn");
if (shareFinishBtn) {
  shareFinishBtn.addEventListener("click", (e) => { e.stopPropagation(); shareResults("round"); });
}

document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("overlay").addEventListener("click", (e) => {
  if (e.target === document.getElementById("overlay")) closeModal();
});

document.getElementById("vocabBtn")?.addEventListener("click", (e) => {
  e.stopPropagation();
  openVocabularyLibrary();
});
document.getElementById("vocabClose")?.addEventListener("click", closeVocabularyLibrary);
document.getElementById("vocabOverlay")?.addEventListener("click", (e) => {
  if (e.target === document.getElementById("vocabOverlay")) closeVocabularyLibrary();
});
document.getElementById("vocabSearch")?.addEventListener("input", (e) => {
  vocabQuery = e.target.value || "";
  renderVocabularyLibrary();
});
document.querySelectorAll(".vocab-filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".vocab-filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    vocabFilter = btn.dataset.vocabFilter || "all";
    renderVocabularyLibrary();
  });
});

// Speed selector chips (3 options: lento / normal / rápido)
document.querySelectorAll(".speed-chip, .speed-preset").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    setSpeed(btn.dataset.speed);
  });
});
// Apply persisted speed to UI right now
syncSpeedUI();

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    document.querySelector(".score-correct .score-lbl").textContent = "Learned";
    document.querySelector(".score-skip    .score-lbl").textContent = "Skipped";
    isFlipped = false;
    buildDeck();
    document.getElementById("finishScreen").classList.remove("show");
    document.getElementById("quizScreen").style.display = "none";
    document.getElementById("stage").style.display = "flex";
    renderCard(true);
    hideActions();
  });
});

document.getElementById("shuffleBtn").addEventListener("click", () => {
  document.querySelector(".score-correct .score-lbl").textContent = "Learned";
  document.querySelector(".score-skip    .score-lbl").textContent = "Skipped";
  isFlipped = false;
  buildDeck();
  document.getElementById("finishScreen").classList.remove("show");
  document.getElementById("quizScreen").style.display = "none";
  document.getElementById("stage").style.display = "flex";
  renderCard(true);
  hideActions();
});

document.getElementById("themeToggle").addEventListener("click", () => { dark = !dark; applyTheme(); });

/* Quiz swipe listeners */
const qStackEl = document.getElementById("qStackCards");
qStackEl.addEventListener("mousedown", qDragStart);
qStackEl.addEventListener("touchstart", qDragStart, { passive: true });
document.addEventListener("mousemove", qDragMove);
document.addEventListener("touchmove", qDragMove, { passive: true });
document.addEventListener("mouseup", qDragEnd);
document.addEventListener("touchend", qDragEnd);

/* Keyboard shortcuts */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (document.getElementById("vocabOverlay")?.classList.contains("open")) {
      closeVocabularyLibrary();
      return;
    }
    closeModal();
    return;
  }
  if (document.getElementById("vocabOverlay")?.classList.contains("open")) return;
  if (document.getElementById("overlay").classList.contains("open")) return;
  if (document.getElementById("finishScreen").classList.contains("show")) return;
  if (document.getElementById("quizScreen").style.display !== "none") return;
  if ((e.key === " " || e.key === "ArrowUp") && !isFlipped) { e.preventDefault(); toggleFlip(); }
  if (e.key === "ArrowRight" && isFlipped) { document.getElementById("btnCorrect").click(); }
  if (e.key === "ArrowLeft" && isFlipped) { document.getElementById("btnSkip").click(); }
});

/* ── INIT ── */
buildDeck();
renderCard(false);
renderStreakBadge();

/* Wire streak celebration close + tap badge to peek */
document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "streakCelebrateClose") closeStreakCelebrate();
});
document.addEventListener("click", (e) => {
  const ov = document.getElementById("streakCelebrate");
  if (ov && ov.classList.contains("show") && e.target && e.target.classList.contains("streak-celebrate-bg")) {
    closeStreakCelebrate();
  }
});
const streakBadgeEl = document.getElementById("streakBadge");
if (streakBadgeEl) {
  streakBadgeEl.addEventListener("click", () => {
    const n = parseInt(localStorage.getItem(STREAK_KEY) || "1", 10);
    celebrateStreak(n, false);
  });
}
