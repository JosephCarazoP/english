/* ── RENDER CARD ── */
function renderCard(animate = true) {
  const verb = deck[cursor];
  document.getElementById("stage").style.display = "flex";
  document.getElementById("finishScreen").classList.remove("show");

  const scene = document.getElementById("cardScene");
  scene.className = `card-scene col-${colorIdx(verb)}`;

  document.getElementById("cardPresent").textContent = verb.present;
  document.getElementById("cardPast").textContent = verb.past;
  document.getElementById("cardPresentRef").textContent = `← ${verb.present}`;

  const badge = document.getElementById("cardBadge");
  badge.textContent = verb.type === "irregular" ? "Irregular" : "Regular";
  badge.className = "type-badge " + (verb.type === "irregular" ? "badge-irr" : "badge-reg");

  const pct = (cursor / deck.length) * 100;
  document.getElementById("progressFill").style.width = pct + "%";
  document.getElementById("progressLabel").textContent = `${cursor + 1} / ${deck.length}`;
  document.getElementById("scoreCorrect").textContent = correct;
  document.getElementById("scoreSkip").textContent = skipped;

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
  const scene = document.getElementById("cardScene");
  const cardInner = scene.querySelector(".card-inner");
  const backText = document.getElementById("cardPast");

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
    if (skippedDeck.length > 0) {
      // Vuelta de práctica: reordenar con los que quedan
      startPracticeRound();
      return;
    }
    // Todo dominado → mostrar finish
    practiceMode = false;
    showPracticePill(false);
    showFinish();
  } else {
    renderCard(true);
    backText.style.visibility = "visible";
  }
}

/* ── PRÁCTICA DE ERRORES ── */
function startPracticeRound() {
  // Reordena el deck con los pendientes y entra en modo práctica
  practiceMode = true;
  deck = shuffle(skippedDeck);
  cursor = 0;
  isFlipped = false;
  // Mostrar pill de modo práctica
  showPracticePill(true);
  renderCard(true);
}

function showPracticePill(show) {
  let pill = document.getElementById("practicePill");
  if (show) {
    if (!pill) {
      pill = document.createElement("div");
      pill.id = "practicePill";
      pill.className = "practice-banner practice-banner-round";
      pill.innerHTML = (
        '<span class="practice-banner-icon">🎯</span>' +
        '<div class="practice-banner-body">' +
        '<div class="practice-banner-title">Practicando errores</div>' +
        '<div class="practice-banner-sub">Domina cada verbo para terminar la ronda</div>' +
        '</div>' +
        '<div class="practice-banner-count"><b id="practiceCount">0</b><span>por dominar</span></div>'
      );
      const wrap = document.querySelector(".progress-wrap");
      wrap.parentNode.insertBefore(pill, wrap);
    }
    pill.classList.add("show");
    const cnt = document.getElementById("practiceCount");
    if (cnt) {
      const oldVal = parseInt(cnt.textContent || "0", 10);
      const newVal = skippedDeck.length;
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

/* ── FINISH ── */
function showFinish() {
  document.getElementById("stage").style.display = "none";
  document.getElementById("quizScreen").style.display = "none";
  document.getElementById("finishScreen").classList.add("show");
  // Goals: count this finished round, and check no-skip rounds
  if (typeof goalsOnRoundFinished === "function") {
    goalsOnRoundFinished({ skipped: skipped, correct: correct, total: (originalDeckLen || deck.length) });
  }

  const total = originalDeckLen || deck.length;
  const pct = Math.round((correct / Math.max(1, total)) * 100);
  document.getElementById("fCorrect").textContent = correct;
  document.getElementById("fSkip").textContent = skipped;
  document.getElementById("fTotal").textContent = total;
  document.getElementById("finishSubtitle").textContent =
    pct >= 80 ? "Excellent work! 🔥" : pct >= 50 ? "Good progress, keep going!" : "Keep practicing, you'll get there!";
  document.getElementById("finishEmoji").textContent =
    pct >= 80 ? "🎉" : pct >= 50 ? "💪" : "📚";
  document.getElementById("progressFill").style.width = "100%";
  document.getElementById("progressLabel").textContent = `${total} / ${total}`;
}
