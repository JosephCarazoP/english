/* ════════════════════════════════════════════════════════════════
   ONBOARDING — primera visita
   ════════════════════════════════════════════════════════════════ */
const ONBOARDING_KEY = "vfc_hasSeenOnboarding";



(function initOnboarding() {
  const _forceOnboarding = new URLSearchParams(location.search).has('preview');
  if (!_forceOnboarding && localStorage.getItem(ONBOARDING_KEY)) return;
  const overlay = document.getElementById("onboardingOverlay");
  if (!overlay) return;

  overlay.style.display = "flex";
  overlay.style.opacity = "0";
  requestAnimationFrame(() => { overlay.style.opacity = "1"; });

  let current = 0;
  const slides = overlay.querySelectorAll(".onboarding-slide");
  const dots = overlay.querySelectorAll(".ob-dot");
  const btnBack = document.getElementById("obBack");
  const btnNext = document.getElementById("obNext");
  const btnStart = document.getElementById("obStart");
  const progFill = document.getElementById("obProgressFill");

  function goTo(n) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    dots[current].setAttribute("aria-selected", "false");
    current = n;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
    dots[current].setAttribute("aria-selected", "true");
    btnBack.style.visibility = current === 0 ? "hidden" : "visible";
    btnNext.style.display = current < slides.length - 1 ? "inline-flex" : "none";
    btnStart.style.display = current === slides.length - 1 ? "inline-flex" : "none";
    // Update progress bar
    if (progFill) {
      const pct = Math.round(((current + 1) / slides.length) * 100);
      progFill.style.width = pct + "%";
    }
  }

  btnNext.addEventListener("click", () => { if (current < slides.length - 1) goTo(current + 1); });
  btnBack.addEventListener("click", () => { if (current > 0) goTo(current - 1); });
  btnStart.addEventListener("click", closeOnboarding);
  dots.forEach(d => d.addEventListener("click", () => goTo(+d.dataset.target)));

  // Set initial progress
  goTo(0);

  function closeOnboarding() {
    localStorage.setItem(ONBOARDING_KEY, "1");
    overlay.style.opacity = "0";
    setTimeout(() => { overlay.style.display = "none"; }, 350);
  }
})();


(function initSettings() {
  const overlay = document.getElementById("settingsOverlay");
  const openBtn = document.getElementById("settingsBtn");
  const closeBtn = document.getElementById("settingsClose");
  if (!overlay || !openBtn) return;

  let s = loadVFCSettings();
  applyVFCSettings(s);
  let hasPendingVerbChanges = false;

  /* ── Toggle helper ── */
  function _syncToggle(id, isOn) {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.dataset.val = isOn ? "on" : "off";
    btn.setAttribute("aria-pressed", String(isOn));
    btn.classList.toggle("is-on", isOn);
  }

  /* ── Deck info chip ── */
  function _updateDeckInfo() {
    const el = document.getElementById("settingDeckInfo");
    if (!el) return;
    const vm = s.verbMode || "all";
    const filter = window.currentFilter || "all";
    const base = filter === "all" ? ALL_VERBS : ALL_VERBS.filter(v => v.type === filter);

    if (vm === "all") {
      el.textContent = `${base.length} verbos disponibles · Quiz: 30 preguntas aleatorias`;
    } else {
      let pd = parseInt(s.verbsPerDay, 10) || 10;
      if (s.verbsPerDay === "custom") {
        pd = Math.max(1, Math.min(ALL_VERBS.length, parseInt(s.verbsPerDayCustom, 10) || 10));
      }
      const today = new Date();
      const startDate = _dailyProgressStartDate(s, true);
      const days = Math.max(0, Math.floor((today - startDate) / 86400000));
      const unlocked = Math.min(base.length, (days + 1) * pd);
      el.textContent = `${unlocked} de ${base.length} verbos desbloqueados · +${pd}/día`;
    }
  }

  /* ── Verb mode UI sync ── */
  function _syncVerbUI() {
    const verbModeEl = document.getElementById("settingVerbMode");
    const perDayEl = document.getElementById("settingVerbsPerDay");
    const customEl = document.getElementById("settingVerbsPerDayCustom");
    const perDayRow = document.getElementById("settingPerDayRow");
    const customRow = document.getElementById("settingCustomRow");
    const applyRow = document.getElementById("settingApplyRow");
    const applyBtn = document.getElementById("settingApplyVerbChanges");

    if (verbModeEl) verbModeEl.value = s.verbMode || "all";
    if (perDayEl) perDayEl.value = s.verbsPerDay || "10";
    if (customEl) customEl.value = s.verbsPerDayCustom || "10";

    const isDaily = s.verbMode === "daily";
    const isCustom = isDaily && s.verbsPerDay === "custom";
    if (perDayRow) perDayRow.style.display = isDaily ? "" : "none";
    if (customRow) customRow.style.display = isCustom ? "" : "none";
    if (applyRow) applyRow.style.display = "";
    if (applyBtn) {
      applyBtn.disabled = !hasPendingVerbChanges;
      applyBtn.classList.toggle("is-pending", hasPendingVerbChanges);
    }
    _updateDeckInfo();
  }

  function _markPendingVerbChanges() {
    hasPendingVerbChanges = true;
    _syncVerbUI();
  }

  function _applyVerbChanges() {
    if (typeof buildDeck === "function") buildDeck();
    if (typeof renderCard === "function" && Array.isArray(deck) && deck.length > 0) renderCard(true);
    hasPendingVerbChanges = false;
    _syncVerbUI();
    if (typeof showShareToast === "function") showShareToast("Cambios aplicados ✅");
  }

  /* ── Sync all controls ── */
  function syncControls() {
    const tEl = document.getElementById("settingTheme");
    const aEl = document.getElementById("settingAudioSpeed");
    if (tEl) tEl.value = s.theme;
    if (aEl) {
      if (parseFloat(s.audioSpeed) > 0.55 && parseFloat(s.audioSpeed) <= 0.75) {
        s.audioSpeed = "0.45";
        saveVFCSettings(s);
      }
      aEl.value = s.audioSpeed;
    }
    _syncToggle("settingAnimations", s.animations === "on");
    _syncToggle("settingAutoPlay", s.autoPlay === "on");
    _syncVerbUI();
  }

  /* ── Selects: tema y velocidad de audio ── */
  [["settingTheme", "theme"], ["settingAudioSpeed", "audioSpeed"]].forEach(([id, key]) => {
    document.getElementById(id)?.addEventListener("change", e => {
      s[key] = e.target.value;
      saveVFCSettings(s);
      applyVFCSettings(s);
    });
  });

  /* ── Toggles ── */
  [["settingAnimations", "animations"], ["settingAutoPlay", "autoPlay"]].forEach(([id, key]) => {
    document.getElementById(id)?.addEventListener("click", () => {
      const isOn = document.getElementById(id).dataset.val !== "on";
      s[key] = isOn ? "on" : "off";
      saveVFCSettings(s);
      _syncToggle(id, isOn);
      applyVFCSettings(s);
    });
  });

  /* ── Verb mode select ── */
  document.getElementById("settingVerbMode")?.addEventListener("change", e => {
    const prevMode = s.verbMode || "all";
    s.verbMode = e.target.value;
    if (s.verbMode === "daily" && prevMode !== "daily" && !s.dailyStartDate) {
      s.dailyStartDate = _todayIsoLocal();
    }
    saveVFCSettings(s);
    _markPendingVerbChanges();
  });

  /* ── Verbos por día select ── */
  document.getElementById("settingVerbsPerDay")?.addEventListener("change", e => {
    s.verbsPerDay = e.target.value;
    saveVFCSettings(s);
    _markPendingVerbChanges();
  });

  /* ── Custom number input ── */
  document.getElementById("settingVerbsPerDayCustom")?.addEventListener("input", e => {
    const raw = parseInt(e.target.value, 10);
    const v = isNaN(raw) ? 10 : Math.max(1, Math.min(ALL_VERBS.length, raw));
    s.verbsPerDayCustom = String(v);
    saveVFCSettings(s);
    _markPendingVerbChanges();
    _updateDeckInfo();
  });
  document.getElementById("settingVerbsPerDayCustom")?.addEventListener("change", () => {
    _markPendingVerbChanges();
  });
  document.getElementById("settingApplyVerbChanges")?.addEventListener("click", _applyVerbChanges);

  /* ── Reset racha ── */
  document.getElementById("settingResetStreak")?.addEventListener("click", () => {
    if (!confirm("¿Resetear tu racha diaria?")) return;
    try {
      localStorage.removeItem(STREAK_KEY);
      localStorage.removeItem(STREAK_DATE_KEY);
    } catch { }
    _setStreakNumText(0);
    if (typeof showShareToast === "function") showShareToast("Racha reseteada 🔄");
  });

  /* ── Borrar todo ── */
  document.getElementById("settingResetAll")?.addEventListener("click", () => {
    if (!confirm("¿Borrar TODO el progreso? Esta acción no se puede deshacer.")) return;
    [STREAK_KEY, STREAK_DATE_KEY, GOALS_KEY, GOALS_STATS, SETTINGS_KEY,
      ONBOARDING_KEY, "vfc_speed"].forEach(k => {
        try { localStorage.removeItem(k); } catch { }
      });
    if (typeof showShareToast === "function") showShareToast("Progreso borrado 🗑️");
    setTimeout(() => location.reload(), 900);
  });

  /* ── Abrir ── */
  function openSettings() {
    s = loadVFCSettings();
    hasPendingVerbChanges = false;
    syncControls();
    overlay.style.display = "flex";
    requestAnimationFrame(() => overlay.classList.add("is-open"));
    if (typeof window._pwaMaybeShowManual === "function") window._pwaMaybeShowManual();
  }

  /* ── Cerrar ── */
  function closeSettings() {
    overlay.classList.remove("is-open");
    setTimeout(() => { overlay.style.display = "none"; }, 290);
  }

  openBtn.addEventListener("click", openSettings);
  closeBtn.addEventListener("click", closeSettings);
  overlay.addEventListener("click", e => { if (e.target === overlay) closeSettings(); });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && overlay.style.display !== "none") closeSettings();
  });
})();


/* ══════════════════════════════════════════════════════════════════
   PWA — beforeinstallprompt + instrucciones manuales
   REEMPLAZA la función initPWA existente en app.js
   ══════════════════════════════════════════════════════════════════ */
(function initPWA() {
  let deferredPrompt = null;

  const promptRow = document.getElementById("pwaPromptRow");
  const installedRow = document.getElementById("pwaInstalledRow");
  const manualRow = document.getElementById("pwaManualRow");
  const installBtn = document.getElementById("pwaInstallBtn");
  const iosSteps = document.getElementById("pwaIosSteps");
  const braveSteps = document.getElementById("pwaBraveSteps");

  /* ── Detección de entorno ── */
  const ua = navigator.userAgent || "";
  const isIOS = /iP(hone|ad|od)/.test(ua);
  const isSafari = isIOS && /WebKit/.test(ua) && !/CriOS|FxiOS|OPiOS/.test(ua);
  const isStandalone = ("standalone" in navigator && navigator.standalone) ||
    window.matchMedia("(display-mode: standalone)").matches;

  function _showManual() {
    if (!manualRow) return;
    manualRow.style.display = "";
    // Mostrar instrucciones correctas según contexto
    if (iosSteps) iosSteps.style.display = (isSafari || isIOS) ? "" : "none";
    if (braveSteps) braveSteps.style.display = (isSafari || isIOS) ? "none" : "";
  }

  /* ── Ya instalada ── */
  if (isStandalone) {
    if (installedRow) installedRow.style.display = "";
    return;
  }

  /* ── Prompt nativo (Chrome/Edge desktop & Android) ── */
  window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault();
    deferredPrompt = e;
    if (promptRow) promptRow.style.display = "";
    // Ocultar manual si teníamos uno visible
    if (manualRow) manualRow.style.display = "none";
  });

  /* ── Fallback: sin prompt → instrucciones manuales ── */
  // Se activa cuando el settings se abre y no hay prompt nativo
  function _maybeShowManual() {
    if (deferredPrompt) return;      // hay prompt → no necesario
    if (isStandalone) return;      // ya instalada
    _showManual();
  }

  // Exponer para que initSettings lo llame al abrir el panel
  window._pwaMaybeShowManual = _maybeShowManual;

  /* ── Botón instalar (cuando hay prompt nativo) ── */
  async function triggerInstall() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
    if (outcome === "accepted") {
      if (promptRow) promptRow.style.display = "none";
      if (installedRow) installedRow.style.display = "";
      if (typeof showShareToast === "function") showShareToast("¡App instalada! 📲");
    }
  }
  if (installBtn) installBtn.addEventListener("click", triggerInstall);

  /* ── Ya instalada (evento) ── */
  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    if (promptRow) promptRow.style.display = "none";
    if (manualRow) manualRow.style.display = "none";
    if (installedRow) installedRow.style.display = "";
  });

  /* ── Registrar Service Worker ── */
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js")
      .then(reg => console.log("[PWA] SW registered", reg.scope))
      .catch(err => console.warn("[PWA] SW registration failed", err));
  }
})();


/* ════════════════════════════════════════════════════════════════
   RETENCIÓN — mensaje en finish screen
   ════════════════════════════════════════════════════════════════ */
function showRetentionMessage() {
  const retEl = document.getElementById("retentionMsg");
  if (!retEl) return;
  const streak = parseInt(localStorage.getItem(STREAK_KEY) || "0", 10);
  const nextMs = STREAK_MILESTONES.find(m => m > streak) || STREAK_MILESTONES[STREAK_MILESTONES.length - 1];
  retEl.innerHTML = `
    <div class="retention-wrap">
      <p class="retention-main">📅 Volvé mañana por 10 nuevos verbos</p>
      <div class="retention-streak">
        <span class="retention-flame">🔥</span>
        <span class="retention-streak-val">${streak} día${streak !== 1 ? "s" : ""} de racha</span>
        <span class="retention-next">→ siguiente hito: ${nextMs} días</span>
      </div>
    </div>`;
  retEl.style.display = "";
}

// Hook: observar cuando finishScreen se muestra
(function hookFinishRetention() {
  const fsEl = document.getElementById("finishScreen");
  if (!fsEl) return;
  const obs = new MutationObserver(() => {
    if (fsEl.classList.contains("show")) showRetentionMessage();
  });
  obs.observe(fsEl, { attributes: true, attributeFilter: ["class"] });
})();
