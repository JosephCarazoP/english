/* ── RACHA DIARIA (streak) ─────────────────────────────────
   Persistencia 100% local con localStorage.
   - vfc_streak: número de días consecutivos
   - vfc_lastDate: YYYY-MM-DD del último día con actividad
   ───────────────────────────────────────────────────────── */
const STREAK_KEY = "vfc_streak";
const STREAK_DATE_KEY = "vfc_lastDate";

function _streakToday() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function _streakDaysBetween(a, b) {
  // Diferencia en días (b - a) usando solo la parte de fecha.
  const [ya, ma, da] = a.split("-").map(Number);
  const [yb, mb, db_] = b.split("-").map(Number);
  const da1 = Date.UTC(ya, ma - 1, da);
  const da2 = Date.UTC(yb, mb - 1, db_);
  return Math.round((da2 - da1) / (1000 * 60 * 60 * 24));
}

/**
 * Calcula y persiste la racha. Devuelve { streak, prev, kind }
 *   kind: "unlocked" | "incremented" | "kept" | "reset"
 */
function updateStreak() {
  const prev = parseInt(localStorage.getItem(STREAK_KEY) || "0", 10);
  const last = localStorage.getItem(STREAK_DATE_KEY);
  const today = _streakToday();

  let streak = prev;
  let kind = "kept";

  if (!last || prev === 0) {
    // Primera vez en este dispositivo → desbloquea
    streak = 1;
    kind = (prev === 0) ? "unlocked" : "incremented";
  } else if (last === today) {
    if (streak < 1) { streak = 1; kind = "unlocked"; }
    else { kind = "kept"; }
  } else {
    const diff = _streakDaysBetween(last, today);
    if (diff === 1) {
      streak = prev + 1;
      kind = "incremented";
    } else if (diff > 1) {
      streak = 1;
      kind = "reset";
    } else {
      if (streak < 1) { streak = 1; kind = "unlocked"; }
      else { kind = "kept"; }
    }
  }

  localStorage.setItem(STREAK_KEY, String(streak));
  localStorage.setItem(STREAK_DATE_KEY, today);
  return { streak, prev, kind };
}

/* ── Streak milestones (used for the progressbar) ── */
const STREAK_MILESTONES = [3, 7, 14, 30, 60, 100, 200, 365];

function _streakMilestoneInfo(n) {
  // Returns { prevMs, nextMs, pct }
  let prevMs = 0;
  let nextMs = STREAK_MILESTONES[0];
  for (let i = 0; i < STREAK_MILESTONES.length; i++) {
    if (n < STREAK_MILESTONES[i]) {
      nextMs = STREAK_MILESTONES[i];
      prevMs = i === 0 ? 0 : STREAK_MILESTONES[i - 1];
      break;
    }
    if (i === STREAK_MILESTONES.length - 1 && n >= STREAK_MILESTONES[i]) {
      // capped at the top
      prevMs = STREAK_MILESTONES[i - 1] || 0;
      nextMs = STREAK_MILESTONES[i];
    }
  }
  const span = Math.max(1, nextMs - prevMs);
  const into = Math.max(0, n - prevMs);
  const pct = Math.min(100, Math.round((into / span) * 100));
  return { prevMs, nextMs, pct };
}

function _setStreakNumText(n) {
  const el = document.getElementById("streakNum");
  if (el) el.textContent = String(n);
  const badge = document.getElementById("streakBadge");
  if (badge) {
    const lbl = n === 1 ? "1 día seguido" : `${n} días seguidos`;
    badge.title = `Llevas ${lbl} · Próxima meta: ${_streakMilestoneInfo(n).nextMs} días`;
    badge.setAttribute("aria-label", lbl);
  }
  // Update target text + progress bar
  const info = _streakMilestoneInfo(n);
  const tgt = document.getElementById("streakTarget");
  if (tgt) {
    if (n >= STREAK_MILESTONES[STREAK_MILESTONES.length - 1]) {
      tgt.textContent = "🏆 Leyenda";
    } else {
      tgt.textContent = `→ ${info.nextMs}`;
    }
  }
  const fill = document.getElementById("streakProgressFill");
  if (fill) fill.style.width = info.pct + "%";
}

function renderStreakBadge() {
  try {
    const { streak, prev, kind } = updateStreak();
    const badge = document.getElementById("streakBadge");
    if (!badge) return;
    badge.classList.add("show");
    _setStreakNumText(streak);

    if (kind === "unlocked") {
      // Pequeño retraso para que el resto de la UI esté lista
      setTimeout(() => celebrateStreak(streak, true), 380);
    } else if (kind === "incremented") {
      // Animación de incremento estilo Duolingo
      setTimeout(() => animateStreakIncrement(prev, streak), 320);
    } else if (kind === "reset" && prev > 0) {
      // Sutil indicador de reinicio (no celebración)
      badge.classList.add("streak-reset-flash");
      setTimeout(() => badge.classList.remove("streak-reset-flash"), 900);
    }

    // Notify the goals system that the streak might have changed
    if (typeof checkGoals === "function") {
      try { checkGoals({ silent: kind === "kept" }); } catch (e) { }
    }
  } catch (err) {
    // localStorage no disponible
  }
}

/* ── Celebración: nueva racha desbloqueada ── */
function celebrateStreak(n, isUnlock) {
  const overlay = document.getElementById("streakCelebrate");
  if (!overlay) return;

  document.getElementById("streakCounterNum").textContent = String(n);
  document.getElementById("streakCounterLbl").textContent = (n === 1 ? "día" : "días seguidos");

  const titleEl = document.getElementById("streakCelebrateTitle");
  const msgEl = document.getElementById("streakCelebrateMsg");
  if (isUnlock) {
    titleEl.textContent = "¡Racha desbloqueada!";
    msgEl.textContent = "Empezaste tu camino diario. Vuelve mañana para sumar otro día.";
  } else {
    titleEl.textContent = "¡Racha en marcha!";
    msgEl.textContent = `Llevas ${n} ${n === 1 ? "día" : "días seguidos"} practicando.`;
  }

  // Generar confetti dinámico
  spawnStreakConfetti();

  overlay.classList.add("show");
  document.body.style.overflow = "hidden";

  // Pulse del badge en sincronía
  const badge = document.getElementById("streakBadge");
  if (badge) {
    badge.classList.add("streak-bump");
    setTimeout(() => badge.classList.remove("streak-bump"), 900);
  }
}

function closeStreakCelebrate() {
  const overlay = document.getElementById("streakCelebrate");
  if (!overlay) return;
  overlay.classList.remove("show");
  document.body.style.overflow = "";
  const cf = document.getElementById("streakConfetti");
  if (cf) cf.innerHTML = "";
}

function spawnStreakConfetti() {
  const cf = document.getElementById("streakConfetti");
  if (!cf) return;
  cf.innerHTML = "";
  const colors = ["#ff6b35", "#ffb35a", "#ffd86b", "#7c5cfc", "#0dbfa0", "#f43f5e", "#fff"];
  const N = 32;
  for (let i = 0; i < N; i++) {
    const piece = document.createElement("span");
    piece.className = "streak-confetti-piece";
    const angle = (i / N) * 360 + (Math.random() - 0.5) * 14;
    const dist = 130 + Math.random() * 90;
    const dx = Math.cos(angle * Math.PI / 180) * dist;
    const dy = Math.sin(angle * Math.PI / 180) * dist;
    const rot = (Math.random() - 0.5) * 720;
    const dur = 0.9 + Math.random() * 0.7;
    const delay = Math.random() * 0.15;
    const size = 6 + Math.random() * 6;
    piece.style.setProperty("--dx", dx + "px");
    piece.style.setProperty("--dy", dy + "px");
    piece.style.setProperty("--rot", rot + "deg");
    piece.style.animationDuration = dur + "s";
    piece.style.animationDelay = delay + "s";
    piece.style.background = colors[i % colors.length];
    piece.style.width = size + "px";
    piece.style.height = (size * (0.55 + Math.random() * 0.5)) + "px";
    cf.appendChild(piece);
  }
}

/* ── Animación de incremento de racha (estilo Duolingo) ── */
function animateStreakIncrement(prev, next) {
  const badge = document.getElementById("streakBadge");
  const numEl = document.getElementById("streakNum");
  const fill = document.getElementById("streakProgressFill");
  const tgt = document.getElementById("streakTarget");
  if (!badge || !numEl) return;

  // Mostrar primero el número anterior y la barra al estado anterior
  numEl.textContent = String(prev);
  const prevInfo = _streakMilestoneInfo(prev);
  if (fill) fill.style.width = prevInfo.pct + "%";
  if (tgt) tgt.textContent = `→ ${prevInfo.nextMs}`;

  badge.classList.add("streak-fill-anim");

  // Burst de partículas alrededor del badge
  spawnStreakBurst(badge);

  // A mitad de animación, swap del número con flip + animar la barra al nuevo estado
  setTimeout(() => {
    numEl.classList.add("streak-num-flip");
    setTimeout(() => {
      numEl.textContent = String(next);
      const newInfo = _streakMilestoneInfo(next);
      if (fill) fill.style.width = newInfo.pct + "%";
      if (tgt) {
        if (next >= STREAK_MILESTONES[STREAK_MILESTONES.length - 1]) {
          tgt.textContent = "🏆 Leyenda";
        } else {
          tgt.textContent = `→ ${newInfo.nextMs}`;
        }
      }
    }, 180);
    setTimeout(() => {
      numEl.classList.remove("streak-num-flip");
    }, 420);
  }, 380);

  setTimeout(() => {
    badge.classList.remove("streak-fill-anim");
  }, 1500);
}

function spawnStreakBurst(anchorEl) {
  if (!anchorEl) return;
  const rect = anchorEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const layer = document.createElement("div");
  layer.className = "streak-burst-layer";
  document.body.appendChild(layer);
  const colors = ["#ff6b35", "#ffb35a", "#ffd86b", "#fff"];
  const N = 16;
  for (let i = 0; i < N; i++) {
    const p = document.createElement("span");
    p.className = "streak-burst-particle";
    const angle = (i / N) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
    const dist = 50 + Math.random() * 40;
    p.style.left = cx + "px";
    p.style.top = cy + "px";
    p.style.setProperty("--bx", Math.cos(angle) * dist + "px");
    p.style.setProperty("--by", Math.sin(angle) * dist + "px");
    p.style.background = colors[i % colors.length];
    p.style.animationDelay = (Math.random() * 0.08) + "s";
    layer.appendChild(p);
  }
  setTimeout(() => layer.remove(), 1400);
}
