/* ==========================================================================
   HEARTFELT APOLOGY, REGRET & ENDLESS LOVE - SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientCanvas();
  initNameRotators();
  initAudioMelody();
  initInteractions();
  initLoveNotes();
  initVowsSystem();
  initReconciliationFlow();
  initSurpriseScreen();
});

/* Show affectionate names gently, one at a time. */
function initNameRotators() {
  const rotators = document.querySelectorAll('[data-name-rotator]');
  if (!rotators.length) return;

  const names = ['My Beautiful Rose', 'My Lil Pumpkin', 'My Kanna', 'My Kanao'];
  let nameIndex = 0;

  setInterval(() => {
    nameIndex = (nameIndex + 1) % names.length;
    rotators.forEach((element) => {
      element.classList.add('changing');
      setTimeout(() => {
        const keepLowercase = element.closest('.footer-quote');
        element.textContent = keepLowercase ? names[nameIndex].toLowerCase() : names[nameIndex];
        element.classList.remove('changing');
      }, 250);
    });
  }, 2800);
}

/* ==========================================================================
   1. AMBIENT CANVAS (STARS & FLOATING SOFT PETALS)
   ========================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Stars
  const stars = [];
  const starCount = Math.min(80, Math.floor(width / 15));
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005,
      direction: Math.random() > 0.5 ? 1 : -1,
    });
  }

  // Petals / Glowing embers
  const petals = [];
  const petalCount = Math.min(30, Math.floor(width / 35));
  for (let i = 0; i < petalCount; i++) {
    petals.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 6 + 4,
      speedY: Math.random() * 0.6 + 0.4,
      speedX: Math.sin(Math.random() * Math.PI) * 0.5,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 1.2,
      opacity: Math.random() * 0.6 + 0.3,
      color: Math.random() > 0.3 ? 'rgba(255, 117, 143,' : 'rgba(243, 198, 143,',
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw Stars
    stars.forEach((star) => {
      star.alpha += star.speed * star.direction;
      if (star.alpha <= 0.1 || star.alpha >= 0.9) {
        star.direction *= -1;
      }
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(253, 246, 238, ${star.alpha})`;
      ctx.fill();
    });

    // Draw Floating Petals
    petals.forEach((p) => {
      p.y += p.speedY;
      p.x += Math.sin(p.y * 0.01) * 0.5;
      p.rotation += p.rotSpeed;

      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);

      // Draw subtle petal ellipse
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color} ${p.opacity})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(255, 117, 143, 0.4)';
      ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. SYNTHESIZED GENTLE AMBIENT MELODY (WEB AUDIO API)
   ========================================================================== */
function initAudioMelody() {
  const toggleBtn = document.getElementById('music-toggle-btn');
  const label = document.getElementById('music-label');
  if (!toggleBtn) return;

  let audioCtx = null;
  let isPlaying = false;
  let timerId = null;

  // Soothing chords
  const chords = [
    [261.63, 329.63, 392.00, 523.25], // C Major
    [220.00, 261.63, 329.63, 440.00], // A Minor
    [174.61, 220.00, 261.63, 349.23], // F Major
    [196.00, 246.94, 293.66, 392.00]  // G Major
  ];

  let chordIndex = 0;

  function updateAudioButton(playing, blocked = false) {
    toggleBtn.classList.toggle('playing', playing);
    toggleBtn.setAttribute('aria-pressed', String(playing));
    label.textContent = playing
      ? 'Pause Soft Melody'
      : blocked
        ? 'Tap to Start Melody'
        : 'Play Soft Melody';
  }

  function playGentleNote(freq, time, duration = 2.5) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.08, time + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(time);
    osc.stop(time + duration);
  }

  function scheduleMelodyStep() {
    if (!isPlaying || !audioCtx) return;
    const now = audioCtx.currentTime;
    const currentChord = chords[chordIndex % chords.length];
    chordIndex++;

    currentChord.forEach((note, idx) => {
      playGentleNote(note, now + idx * 0.4, 3.2);
    });

    const melodyTone = currentChord[Math.floor(Math.random() * currentChord.length)] * 2;
    playGentleNote(melodyTone, now + 1.2, 2.0);

    timerId = setTimeout(scheduleMelodyStep, 2800);
  }

  async function startMelody() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) {
        label.textContent = 'Music unavailable';
        return false;
      }
      audioCtx = new AudioContext();
    }

    if (audioCtx.state === 'suspended') {
      await audioCtx.resume();
    }

    if (audioCtx.state === 'running' && !isPlaying) {
      isPlaying = true;
      updateAudioButton(true);
      scheduleMelodyStep();
    }
    return audioCtx.state === 'running';
  }

  function stopMelody() {
    isPlaying = false;
    updateAudioButton(false);
    if (timerId) clearTimeout(timerId);
  }

  toggleBtn.addEventListener('click', async () => {
    if (isPlaying) {
      stopMelody();
    } else {
      await startMelody();
    }
  });

  // Try true autoplay first. If the browser blocks audible audio, begin on the
  // visitor's first click, tap, or key press without requiring the music button.
  function enableInteractionFallback() {
    updateAudioButton(false, true);
    const startAfterInteraction = async (event) => {
      if (toggleBtn.contains(event.target)) return;
      if (await startMelody()) {
        ['pointerdown', 'keydown', 'touchstart'].forEach((eventName) => {
          document.removeEventListener(eventName, startAfterInteraction);
        });
      }
    };
    ['pointerdown', 'keydown', 'touchstart'].forEach((eventName) => {
      document.addEventListener(eventName, startAfterInteraction, { passive: true });
    });
  }

  startMelody()
    .then((started) => {
      if (!started) enableInteractionFallback();
    })
    .catch(enableInteractionFallback);
}

/* ==========================================================================
   3. INTERACTIONS & SCROLL
   ========================================================================== */
function initInteractions() {
  const openLetterBtn = document.getElementById('open-letter-btn');
  const letterSection = document.getElementById('letter-section');

  if (openLetterBtn && letterSection) {
    openLetterBtn.addEventListener('click', () => {
      letterSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Flip Cards on Mobile/Click
  const flipCards = document.querySelectorAll('.interactive-flip-card');
  flipCards.forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.toggle('is-flipped');
    });
  });
}

/* ==========================================================================
   4. INTERACTIVE LOVE NOTES FOR KANNA
   ========================================================================== */
function initLoveNotes() {
  const jarBtn = document.getElementById('love-jar-btn');
  const noteText = document.getElementById('note-text');
  const noteBox = document.getElementById('note-display');

  const loveNotes = [
    "“You are my beautiful rose, and losing you is my greatest fear. I love you with all my soul, Kanna.”",
    "“For 4 years you stood by me through everything, my lil pumpkin. I will spend the rest of my days cherishing your heart.”",
    "“Your smile is my favorite sight in this world, Kanao. I am deeply sorry for causing tears where there should only be joy.”",
    "“You are not just a part of my life; you are my entire world, Kanna. You will always be my highest priority.”",
    "“My biggest regret is taking my beautiful rose for granted. My biggest vow is to love you deeper with every passing sunrise.”",
    "“Thank you for loving me unconditionally for 4 years, my sweet lil pumpkin. I promise to be the partner you always deserved.”"
  ];

  let lastIndex = -1;

  if (jarBtn && noteText && noteBox) {
    jarBtn.addEventListener('click', () => {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * loveNotes.length);
      } while (randomIndex === lastIndex);
      lastIndex = randomIndex;

      triggerMiniSparkles(jarBtn);

      noteBox.style.opacity = '0';
      setTimeout(() => {
        noteText.textContent = loveNotes[randomIndex];
        noteBox.style.opacity = '1';
      }, 200);
    });
  }
}

/* ==========================================================================
   5. VOWS & SACRED PROMISES SYSTEM
   ========================================================================== */
function initVowsSystem() {
  const vowItems = document.querySelectorAll('.vow-item');
  const fillBar = document.getElementById('vow-fill');
  const progressLabel = document.getElementById('vow-progress-label');
  const total = vowItems.length;

  function updateProgress() {
    const sealedCount = document.querySelectorAll('.vow-item.sealed').length;
    const percentage = (sealedCount / total) * 100;
    if (fillBar) fillBar.style.width = `${percentage}%`;
    if (progressLabel) {
      if (sealedCount === total) {
        progressLabel.textContent = `✨ All ${total} Sacred Promises Sealed for Kanna ✨`;
      } else {
        progressLabel.textContent = `${sealedCount} of ${total} Promises Sealed`;
      }
    }
  }

  vowItems.forEach((vow) => {
    vow.addEventListener('click', () => {
      vow.classList.toggle('sealed');
      const statusSpan = vow.querySelector('.vow-status');
      if (vow.classList.contains('sealed')) {
        if (statusSpan) statusSpan.textContent = 'Sealed for Kanna ❤️';
        triggerMiniSparkles(vow);
      } else {
        if (statusSpan) statusSpan.textContent = 'Tap to seal';
      }
      updateProgress();
    });
  });
}

function triggerMiniSparkles(element) {
  const rect = element.getBoundingClientRect();
  const heart = document.createElement('div');
  heart.textContent = '🌹';
  heart.style.position = 'fixed';
  heart.style.left = `${rect.left + rect.width / 2}px`;
  heart.style.top = `${rect.top}px`;
  heart.style.fontSize = '26px';
  heart.style.pointerEvents = 'none';
  heart.style.zIndex = '9999';
  heart.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
  document.body.appendChild(heart);

  requestAnimationFrame(() => {
    heart.style.transform = `translate(-50%, -60px) scale(1.5)`;
    heart.style.opacity = '0';
  });

  setTimeout(() => {
    heart.remove();
  }, 1000);
}

/* ==========================================================================
   6. RECONCILIATION FLOW & MODAL RESPONSES
   ========================================================================== */
function initReconciliationFlow() {
  const modal = document.getElementById('response-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalIcon = document.getElementById('modal-icon');
  const closeBtn = document.getElementById('modal-close-btn');
  const ackBtn = document.getElementById('modal-ack-btn');

  const btnHug = document.getElementById('btn-hug');
  const btnTime = document.getElementById('btn-time');
  const btnForgive = document.getElementById('btn-forgive');

  function openModal(icon, title, htmlContent) {
    if (!modal) return;
    modalIcon.textContent = icon;
    modalTitle.textContent = title;
    modalBody.innerHTML = htmlContent;
    modal.classList.add('active');
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (ackBtn) ackBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (btnHug) {
    btnHug.addEventListener('click', () => {
      openModal(
        '🫂',
        'I Am Here For You, Kanna',
        `<p>I am ready to hold my lil pumpkin tight and listen to everything you have kept inside for these 4 years.</p>
         <p style="margin-top: 12px;">No distractions, no rushing, no excuses. You have my full, undivided presence whenever you are ready. I love you so much, my beautiful rose.</p>`
      );
    });
  }

  if (btnTime) {
    btnTime.addEventListener('click', () => {
      openModal(
        '🕊️',
        'Take All The Time You Need, Lil Pumpkin',
        `<p>Your feelings and healing come first, Kanao. I will never rush you, pressure you, or expect you to simply move past this pain.</p>
         <p style="margin-top: 12px;">I will patiently stand by you every single day, waiting for you and continuously showing my love and remorse through actions.</p>`
      );
    });
  }

  if (btnForgive) {
    btnForgive.addEventListener('click', () => {
      createPetalCelebration();
      openModal(
        '💖',
        'Thank You For Believing In Us, Kanna',
        `<p>Thank you with all my soul for giving our love a new dawn, my beautiful rose. I promise to treat your heart like the sacred treasure it is.</p>
         <p style="margin-top: 12px; color: #f3c68f;">From this second forward, my Kanna is first, foremost, and forever in my life. I love you endlessly.</p>`
      );
    });
  }
}

/* ==========================================================================
   7. SURPRISE SCREEN INTERACTIVE SLIDES
   ========================================================================== */
function initSurpriseScreen() {
  const surpriseBtn = document.getElementById('trigger-surprise-btn');
  const surpriseOverlay = document.getElementById('surprise-screen');
  const closeBtn = document.getElementById('surprise-close-btn');

  const giftTrigger = document.getElementById('gift-open-trigger');
  const slide1Next = document.getElementById('slide1-next-btn');
  const slide2Prev = document.getElementById('slide2-prev-btn');
  const slide2Next = document.getElementById('slide2-next-btn');
  const slide3Prev = document.getElementById('slide3-prev-btn');
  const slide3Finish = document.getElementById('slide3-finish-btn');

  const slides = document.querySelectorAll('.surprise-slide');

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function openSurprise() {
    if (!surpriseOverlay) return;
    surpriseOverlay.classList.add('active');
    showSlide(0);
    createPetalCelebration();
  }

  function closeSurprise() {
    if (!surpriseOverlay) return;
    surpriseOverlay.classList.remove('active');
  }

  if (surpriseBtn) surpriseBtn.addEventListener('click', openSurprise);
  if (closeBtn) closeBtn.addEventListener('click', closeSurprise);

  if (giftTrigger) {
    giftTrigger.addEventListener('click', () => {
      createPetalCelebration();
      showSlide(1);
    });
  }

  if (slide1Next) {
    slide1Next.addEventListener('click', () => {
      createPetalCelebration();
      showSlide(1);
    });
  }

  if (slide2Prev) {
    slide2Prev.addEventListener('click', () => showSlide(0));
  }

  if (slide2Next) {
    slide2Next.addEventListener('click', () => {
      createPetalCelebration();
      showSlide(2);
    });
  }

  if (slide3Prev) {
    slide3Prev.addEventListener('click', () => showSlide(1));
  }

  if (slide3Finish) {
    slide3Finish.addEventListener('click', () => {
      createPetalCelebration();
      closeSurprise();
    });
  }
}

function createPetalCelebration() {
  const colors = ['#ff758f', '#f7cad0', '#f3c68f', '#fff0f3'];
  for (let i = 0; i < 40; i++) {
    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.left = `${Math.random() * 100}vw`;
    el.style.top = `-20px`;
    el.style.width = `${Math.random() * 10 + 6}px`;
    el.style.height = `${Math.random() * 14 + 8}px`;
    el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    el.style.borderRadius = '50% 0 50% 50%';
    el.style.zIndex = '20000';
    el.style.pointerEvents = 'none';
    el.style.transform = `rotate(${Math.random() * 360}deg)`;
    el.style.transition = `transform ${Math.random() * 2 + 2}s cubic-bezier(0.2, 0.8, 0.2, 1), top ${Math.random() * 2 + 2}s linear, opacity 3s ease`;

    document.body.appendChild(el);

    requestAnimationFrame(() => {
      el.style.top = '105vh';
      el.style.transform = `rotate(${Math.random() * 720}deg) translateX(${Math.random() * 100 - 50}px)`;
      el.style.opacity = '0';
    });

    setTimeout(() => el.remove(), 4000);
  }
}
