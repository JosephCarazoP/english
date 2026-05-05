/* ── DETAIL MODAL ── */
async function openDetail(verbOverride) {
  const verb = verbOverride || deck[cursor];
  if (!verb) return;
  const ipa = VERB_IPA[verb.present] || { pres: "", past: "" };

  // Hero words
  document.getElementById("modalPresent").textContent = verb.present;
  document.getElementById("modalPast").textContent = verb.past;
  document.getElementById("modalIpaPres").textContent = ipa.pres || "";
  document.getElementById("modalIpaPast").textContent = ipa.past || "";

  // Spanish meaning chip
  document.getElementById("modalMeaningChip").textContent =
    VERB_MEANINGS_ES[verb.present] || "Sin traducción disponible";

  // Examples
  document.getElementById("modalSentencePres").innerHTML = verb.sentencePres;
  document.getElementById("modalSentencePast").innerHTML = verb.sentencePast;

  function playDetailAudio(btn, text, kind) {
    document.querySelectorAll(".pron-btn, .ex-mini-play").forEach(el => el.classList.remove("is-playing"));
    btn.classList.add("is-playing");
    const utter = speakVerb(text, { kind });
    if (!utter) {
      btn.classList.remove("is-playing");
      return;
    }
    const stop = () => btn.classList.remove("is-playing");
    utter.onend = stop;
    utter.onerror = stop;
  }

  // Pronunciation: a single "Escuchar" button per card. Rate is taken from currentSpeed.
  const presWord = verb.present;
  const pastWord = verb.past.split("/")[0].trim();
  document.querySelectorAll(".pron-btn").forEach(btn => {
    const form = btn.dataset.form;
    btn.onclick = (e) => {
      e.stopPropagation();
      const text = form === "pres" ? presWord : pastWord;
      playDetailAudio(btn, text, "word");
    };
  });

  // Sentence play buttons
  document.getElementById("playSentencePres").onclick = (e) => {
    e.stopPropagation();
    playDetailAudio(e.currentTarget, stripHtml(verb.sentencePres), "sentence");
  };
  document.getElementById("playSentencePast").onclick = (e) => {
    e.stopPropagation();
    playDetailAudio(e.currentTarget, stripHtml(verb.sentencePast), "sentence");
  };

  // Badge with phonetic sound tag for regular verbs
  const badge = document.getElementById("modalBadge");
  if (verb.type === "irregular") {
    badge.textContent = "Irregular";
    badge.style.background = "var(--text)";
    badge.style.color = "var(--bg)";
  } else {
    badge.textContent = verb.sound ? `Regular · ${verb.sound}` : "Regular";
    badge.style.background = "var(--accent-soft)";
    badge.style.color = "var(--accent)";
  }

  // Reset speed UI to current value
  syncSpeedUI();

  const gifEl = document.getElementById("modalGif");
  gifEl.innerHTML = `<span class="gif-msg">Loading GIF…</span>`;
  document.getElementById("overlay").classList.add("open");
  document.body.style.overflow = "hidden";

  try {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${encodeURIComponent(verb.gif)}&limit=6&rating=g`;
    const res = await fetch(url);
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
      gifEl.innerHTML = `<span class="gif-msg">No GIF found</span>`;
    }
  } catch (error) {
    gifEl.innerHTML = `<span class="gif-msg" style="color:red;text-transform:none;">Error: ${error.message}</span>`;
  }
}

function closeModal() {
  document.getElementById("overlay").classList.remove("open");
  document.body.style.overflow = "";
  // Stop any in-progress speech when the user closes the modal
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

/* ── VOCABULARY LIBRARY ── */
let vocabFilter = "all";
let vocabQuery = "";

function vocabIconSvg(type) {
  if (type === "regular") {
    return (
      '<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="M20 6 9 17l-5-5"></path>' +
      '<path d="M4 19h16"></path>' +
      '</svg>'
    );
  }
  return (
    '<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M12 3 4 7l8 4 8-4-8-4Z"></path>' +
    '<path d="M4 11l8 4 8-4"></path>' +
    '<path d="M4 15l8 4 8-4"></path>' +
    '</svg>'
  );
}

function vocabArrowSvg() {
  return (
    '<svg class="ui-icon vocab-open-icon" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M5 12h14"></path>' +
    '<path d="m13 6 6 6-6 6"></path>' +
    '</svg>'
  );
}

function getVocabularyMatches() {
  const q = vocabQuery.trim().toLowerCase();
  return ALL_VERBS.filter(verb => {
    if (vocabFilter !== "all" && verb.type !== vocabFilter) return false;
    if (!q) return true;
    const meaning = VERB_MEANINGS_ES[verb.present] || "";
    return [
      verb.present,
      verb.past,
      verb.participle,
      verb.type,
      verb.sound,
      meaning
    ].some(value => String(value || "").toLowerCase().includes(q));
  });
}

function renderVocabularyLibrary() {
  const grid = document.getElementById("vocabGrid");
  const count = document.getElementById("vocabCount");
  const empty = document.getElementById("vocabEmpty");
  if (!grid || !count || !empty) return;

  const matches = getVocabularyMatches();
  count.textContent = `${matches.length} ${matches.length === 1 ? "word" : "words"}`;
  grid.innerHTML = "";
  empty.hidden = matches.length > 0;

  matches.forEach(verb => {
    const meaning = VERB_MEANINGS_ES[verb.present] || "Sin traducción disponible";
    const card = document.createElement("button");
    card.className = "vocab-card";
    card.type = "button";
    card.dataset.type = verb.type;
    card.setAttribute("aria-label", `Open details for ${verb.present}`);

    const icon = document.createElement("span");
    icon.className = "vocab-card-icon";
    icon.innerHTML = vocabIconSvg(verb.type);

    const main = document.createElement("span");
    main.className = "vocab-card-main";

    const title = document.createElement("span");
    title.className = "vocab-card-title";

    const present = document.createElement("span");
    present.className = "vocab-present";
    present.textContent = verb.present;

    const past = document.createElement("span");
    past.className = "vocab-past";
    past.textContent = verb.past;

    const meaningEl = document.createElement("span");
    meaningEl.className = "vocab-meaning";
    meaningEl.textContent = meaning;

    title.append(present, past);
    main.append(title, meaningEl);

    const meta = document.createElement("span");
    meta.className = "vocab-card-meta";
    const dot = document.createElement("span");
    dot.className = "vocab-type-dot";
    const arrow = document.createElement("span");
    arrow.innerHTML = vocabArrowSvg();
    meta.append(dot, arrow);

    card.append(icon, main, meta);
    card.addEventListener("click", () => {
      closeVocabularyLibrary();
      openDetail(verb);
    });
    grid.appendChild(card);
  });
}

function openVocabularyLibrary() {
  const overlay = document.getElementById("vocabOverlay");
  if (!overlay) return;
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  renderVocabularyLibrary();
  setTimeout(() => document.getElementById("vocabSearch")?.focus(), 80);
}

function closeVocabularyLibrary() {
  const overlay = document.getElementById("vocabOverlay");
  if (!overlay) return;
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

/* ── SPEED CONTROL (3 chips only: slow / normal / fast) ── */
const SPEED_KEY = "vfc_speed";
function setSpeed(value) {
  let v = Math.min(1.4, Math.max(0.25, parseFloat(value) || 1));
  if (v > 0.55 && v <= 0.75) v = 0.45;
  currentSpeed = v;
  try { localStorage.setItem(SPEED_KEY, String(v)); } catch (e) { }
  syncSpeedUI();
}

function syncSpeedUI() {
  document.querySelectorAll(".speed-chip, .speed-preset").forEach(b => {
    const speed = parseFloat(b.dataset.speed);
    const matches = Math.abs(speed - currentSpeed) < 0.01 || (speed <= 0.55 && currentSpeed <= 0.75);
    b.classList.toggle("active", matches);
    b.setAttribute("aria-checked", matches ? "true" : "false");
  });
}

/* Restore persisted speed (if any) on load */
(function restoreSpeed() {
  try {
    const saved = parseFloat(localStorage.getItem(SPEED_KEY));
    if (!isNaN(saved) && saved > 0) {
      currentSpeed = Math.min(1.4, Math.max(0.25, saved));
      if (currentSpeed > 0.55 && currentSpeed <= 0.75) currentSpeed = 0.45;
    }
  } catch (e) { }
})();
