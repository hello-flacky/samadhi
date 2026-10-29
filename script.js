/**
 * SAMADHI'S 22ND BIRTHDAY INTERACTIVE SCRIPT
 * Calm, Romantic, Responsive Experience
 * Date: 2026-10-30
 */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientCanvas();
  initCountdown();
  initMusicBox();
  initThemeToggle();
  initWaxSeal();
  initWishesCarousel();
  initPhotoGallery();
  initCakeCandle();
  initHeartBurst();
});

/* ===================================================================
   1. AMBIENT PETALS & PARTICLES CANVAS
   =================================================================== */
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

  const petals = [];
  const petalCount = window.innerWidth < 768 ? 22 : 40;

  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.size = Math.random() * 8 + 8;
      this.speedY = Math.random() * 0.9 + 0.6;
      this.speedX = Math.random() * 0.8 - 0.4;
      this.angle = Math.random() * Math.PI * 2;
      this.angularSpeed = (Math.random() - 0.5) * 0.02;
      this.opacity = Math.random() * 0.45 + 0.35;
      // Soft rose & champagne tones
      const colors = [
        'rgba(244, 199, 203, ', // soft rose
        'rgba(232, 165, 171, ', // primary rose
        'rgba(250, 228, 203, ', // champagne
        'rgba(216, 196, 232, '  // lavender mist
      ];
      this.colorPrefix = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.angle) * 0.8 + this.speedX;
      this.angle += this.angularSpeed;

      if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.beginPath();
      // Draw organic petal shape
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size / 2, this.size / 2, 0, this.size);
      ctx.bezierCurveTo(this.size / 2, this.size / 2, this.size / 2, -this.size / 2, 0, 0);
      ctx.fillStyle = `${this.colorPrefix}${this.opacity})`;
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < petalCount; i++) {
    petals.push(new Petal());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < petals.length; i++) {
      petals[i].update();
      petals[i].draw();
    }
    requestAnimationFrame(animate);
  }

  animate();
}

/* ===================================================================
   2. COUNTDOWN TIMER (SAMADHI'S 22ND BIRTHDAY - 2026/10/30)
   =================================================================== */
function initCountdown() {
  const birthdayDate = new Date('2026-10-30T00:00:00+05:30').getTime();
  const daysEl = document.getElementById('count-days');
  const hoursEl = document.getElementById('count-hours');
  const minutesEl = document.getElementById('count-minutes');
  const secondsEl = document.getElementById('count-seconds');
  const countdownTitle = document.getElementById('countdown-title');

  function update() {
    const now = new Date().getTime();
    const distance = birthdayDate - now;

    if (distance <= 0) {
      // It's Samadhi's Birthday!
      if (countdownTitle) {
        countdownTitle.innerHTML = '✨ Today is Samadhi\'s 22nd Birthday! Happy Birthday! ✨';
      }
      if (daysEl) daysEl.textContent = '22';
      if (hoursEl) hoursEl.textContent = '🎂';
      if (minutesEl) minutesEl.textContent = '💖';
      if (secondsEl) secondsEl.textContent = '🎉';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ===================================================================
   3. ROMANTIC MUSIC BOX (WEB AUDIO API - ZERO DEPENDENCY)
   =================================================================== */
function initMusicBox() {
  const musicBtn = document.getElementById('music-toggle-btn');
  if (!musicBtn) return;

  let audioCtx = null;
  let isPlaying = false;
  let timerId = null;

  // Romantic Pentatonic Lullaby Melody (Chords: F#m - D - A - E / Romantic warmth)
  const notes = [
    // Note, duration (seconds)
    { freq: 440.00, dur: 0.6 }, // A4
    { freq: 554.37, dur: 0.6 }, // C#5
    { freq: 659.25, dur: 0.8 }, // E5
    { freq: 554.37, dur: 0.5 }, // C#5
    { freq: 493.88, dur: 0.6 }, // B4
    { freq: 440.00, dur: 0.8 }, // A4
    { freq: 370.00, dur: 0.6 }, // F#4
    { freq: 440.00, dur: 1.0 }, // A4
    { freq: 554.37, dur: 0.6 }, // C#5
    { freq: 659.25, dur: 0.6 }, // E5
    { freq: 739.99, dur: 1.2 }, // F#5
    { freq: 659.25, dur: 0.6 }, // E5
    { freq: 554.37, dur: 0.6 }, // C#5
    { freq: 493.88, dur: 1.2 }  // B4
  ];

  let currentNote = 0;

  function playTone(freq, duration) {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      // Triangle gives warm romantic music box chime sound
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.18, audioCtx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration + 0.3);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration + 0.35);
    } catch (e) {
      console.error(e);
    }
  }

  function scheduleNextNote() {
    if (!isPlaying) return;
    const note = notes[currentNote];
    playTone(note.freq, note.dur);
    currentNote = (currentNote + 1) % notes.length;
    timerId = setTimeout(scheduleNextNote, note.dur * 1000 + 150);
  }

  function startMusic() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    isPlaying = true;
    musicBtn.classList.add('playing');
    musicBtn.setAttribute('title', 'Pause Melody');
    scheduleNextNote();
  }

  function stopMusic() {
    isPlaying = false;
    clearTimeout(timerId);
    musicBtn.classList.remove('playing');
    musicBtn.setAttribute('title', 'Play Calm Melody');
  }

  musicBtn.addEventListener('click', () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  });
}

/* ===================================================================
   4. THEME TOGGLE (CANDLELIGHT NIGHT / ROSE DAYLIGHT)
   =================================================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (!themeBtn) return;

  const currentTheme = localStorage.getItem('samadhi-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeBtn.addEventListener('click', () => {
    const active = document.documentElement.getAttribute('data-theme');
    const newTheme = active === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('samadhi-theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    const icon = themeBtn.querySelector('span');
    if (icon) {
      icon.textContent = theme === 'light' ? '🌙' : '✨';
    }
    const tip = themeBtn.querySelector('.tooltip');
    if (tip) {
      tip.textContent = theme === 'light' ? 'Candlelight Mode' : 'Daylight Mode';
    }
  }
}

/* ===================================================================
   5. WAX SEAL & LETTER REVEAL
   =================================================================== */
function initWaxSeal() {
  const waxSeal = document.getElementById('wax-seal-btn');
  const letterBody = document.getElementById('letter-content-body');
  if (!waxSeal || !letterBody) return;

  waxSeal.addEventListener('click', () => {
    waxSeal.style.transform = 'scale(0.85) rotate(-15deg)';
    setTimeout(() => {
      waxSeal.style.opacity = '0.4';
      waxSeal.style.pointerEvents = 'none';
      const hint = document.getElementById('seal-hint-text');
      if (hint) hint.textContent = '💌 Letter Unsealed with Love';
      triggerHeartShower();
    }, 250);
  });
}

/* ===================================================================
   6. 22 REASONS & BIRTHDAY WISHES CAROUSEL
   =================================================================== */
const TWENTY_TWO_WISHES = [
  {
    num: "01",
    title: "Your Enchanting Smile",
    text: "The way your entire face lights up whenever you laugh makes every tough day instantly softer and brighter."
  },
  {
    num: "02",
    title: "Gentle Heart & Pure Kindness",
    text: "You treat everyone with effortless warmth and respect. Your heart has a natural home for compassion."
  },
  {
    num: "03",
    title: "Traditional Grace",
    text: "Seeing you in traditional Kandyan attire was breathtaking—you carry culture and beauty like royalty."
  },
  {
    num: "04",
    title: "Carefree Spirit",
    text: "Standing beneath the waterfall with joy in your eyes, reminding us that life is meant to be felt deeply."
  },
  {
    num: "05",
    title: "Unmatched Loyalty",
    text: "You are the most dependable, caring soul. Once you hold someone close to your heart, you stand by them through everything."
  },
  {
    num: "06",
    title: "Your Quiet Strength",
    text: "You handle challenges with resilience and silent grace. You are far stronger and braver than you give yourself credit for."
  },
  {
    num: "07",
    title: "Adventurous Soul",
    text: "From late-night mountain viewpoints to chilly night trails, sharing adventures with you is always unforgettable."
  },
  {
    num: "08",
    title: "Playful Energy",
    text: "You have that infectious, sweet playful spark that brings genuine happiness to everyone lucky enough to be near you."
  },
  {
    num: "09",
    title: "Your Warm Embraces",
    text: "A hug from you feels like coming home after a long journey—safe, peaceful, and filled with unconditional warmth."
  },
  {
    num: "10",
    title: "Golden Ambitions",
    text: "Your dedication to your studies and dreams inspires respect. May every ambition of your 22nd year be accomplished."
  },
  {
    num: "11",
    title: "Radiant Humility",
    text: "Even with so much natural beauty and talent, your grounded simplicity remains your most attractive trait."
  },
  {
    num: "12",
    title: "The Sound of Your Voice",
    text: "Hearing your voice and your stories brings an instant wave of calm, melting all stress away."
  },
  {
    num: "13",
    title: "Thoughtful Listener",
    text: "You don't just hear words—you truly listen and understand. Your empathy is a rare, precious gift."
  },
  {
    num: "14",
    title: "Sunny Days Together",
    text: "Walking along sunny beaches with coconut palms, every moment in your company feels like paradise."
  },
  {
    num: "15",
    title: "Deeply Cherished Memories",
    text: "Looking back through our memories, each photograph captures an irreplaceable, golden slice of time."
  },
  {
    num: "16",
    title: "Endless Patience",
    text: "Thank you for your understanding, your gentle forgiveness, and the unconditional patience you offer."
  },
  {
    num: "17",
    title: "Pure Authenticity",
    text: "You are 100% genuine. You never have to pretend—your real self is already extraordinary."
  },
  {
    num: "18",
    title: "Your Infectious Laughter",
    text: "When you genuinely burst into giggles, the whole world seems to pause and smile with you."
  },
  {
    num: "19",
    title: "My Safest Haven",
    text: "In a chaotic world, you are peace. Being beside you feels tranquil, secure, and complete."
  },
  {
    num: "20",
    title: "Chapter 22 Magic",
    text: "22 is the age of flourishing. May this year unlock immense happiness, golden doors, and cherished memories."
  },
  {
    num: "21",
    title: "Blessed to Have You",
    text: "Having you in my life is a blessing I thank the stars for each day. You make this life truly magical."
  },
  {
    num: "22",
    title: "Eternal Love & Wishes",
    text: "Always stay the wonderful, shining Samadhi you are. Happy 22nd Birthday, my dearest favorite girl! 💖"
  }
];

function initWishesCarousel() {
  const numBadge = document.getElementById('wish-num-badge');
  const titleEl = document.getElementById('wish-title-text');
  const bodyEl = document.getElementById('wish-body-text');
  const counterEl = document.getElementById('wish-counter-display');
  const prevBtn = document.getElementById('wish-prev-btn');
  const nextBtn = document.getElementById('wish-next-btn');

  if (!numBadge || !titleEl || !bodyEl) return;

  let currentIndex = 0;

  function renderCard(index) {
    const item = TWENTY_TWO_WISHES[index];
    numBadge.textContent = `REASON & WISH ${item.num} OF 22`;
    titleEl.textContent = item.title;
    bodyEl.textContent = item.text;
    if (counterEl) counterEl.textContent = `${index + 1} / 22`;

    // Gentle fade animation
    titleEl.style.animation = 'none';
    bodyEl.style.animation = 'none';
    void titleEl.offsetWidth; // trigger reflow
    titleEl.style.animation = 'fadeInUp 0.4s ease';
    bodyEl.style.animation = 'fadeInUp 0.5s ease';
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + TWENTY_TWO_WISHES.length) % TWENTY_TWO_WISHES.length;
    renderCard(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % TWENTY_TWO_WISHES.length;
    renderCard(currentIndex);
  });

  // Touch Swipe Support for Mobile
  const displayCard = document.getElementById('wish-display-card');
  if (displayCard) {
    let startX = 0;
    displayCard.addEventListener('touchstart', (e) => {
      startX = e.changedTouches[0].screenX;
    }, { passive: true });

    displayCard.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].screenX;
      if (startX - endX > 45) {
        // swipe left -> next
        currentIndex = (currentIndex + 1) % TWENTY_TWO_WISHES.length;
        renderCard(currentIndex);
      } else if (endX - startX > 45) {
        // swipe right -> prev
        currentIndex = (currentIndex - 1 + TWENTY_TWO_WISHES.length) % TWENTY_TWO_WISHES.length;
        renderCard(currentIndex);
      }
    }, { passive: true });
  }

  renderCard(0);
}

/* ===================================================================
   7. PHOTO GALLERY & LIGHTBOX
   =================================================================== */
const GALLERY_PHOTOS = [
  {
    src: "assets/photo_2026-10-29_21-26-28.jpg",
    title: "A Royal Moment in Tradition",
    date: "Special Milestone",
    category: "romantic",
    subtitle: "Dressed in timeless Kandyan heritage, pure grace and royalty."
  },
  {
    src: "assets/photo_2026-10-29_21-26-31.jpg",
    title: "Graceful 'Ayubowan' Greeting",
    date: "Traditional Charm",
    category: "solo",
    subtitle: "A gesture of warmth, respect, and your ever-endearing gentleness."
  },
  {
    src: "assets/photo_2026-10-29_21-26-32.jpg",
    title: "That Pretty Radiant Smile",
    date: "Pure Sweetness",
    category: "solo",
    subtitle: "The light in your eyes that can brighten even the cloudiest sky."
  },
  {
    src: "assets/photo_2026-10-29_21-26-33.jpg",
    title: "Carefree by the Waterfalls",
    date: "Nature & Mist",
    category: "adventure",
    subtitle: "Dancing in the cool waterfall mist with your favorite floral dress."
  },
  {
    src: "assets/photo_2026-10-29_21-26-34.jpg",
    title: "Sun-Kissed Beach Day",
    date: "Ocean Breeze",
    category: "adventure",
    subtitle: "Golden sands, swaying palms, and a cheerful red tee."
  },
  {
    src: "assets/photo_2026-10-29_21-26-35.jpg",
    title: "Campus Days & Calm Greenery",
    date: "Quiet Afternoons",
    category: "solo",
    subtitle: "Soft sunlight, gentle breeze, and quiet university memories."
  },
  {
    src: "assets/photo_2026-10-29_21-26-37.jpg",
    title: "Endless Horizons Together",
    date: "Mountain Panorama",
    category: "romantic",
    subtitle: "Looking into the distant mountains, hand in hand with timeless love."
  },
  {
    src: "assets/photo_2026-10-29_21-26-38 (2).jpg",
    title: "Late Night Escapes & Cozy Warmth",
    date: "Under Starlit Skies",
    category: "romantic",
    subtitle: "Sitting on a wooden bench, wrapped up in cool night air and each other."
  },
  {
    src: "assets/photo_2026-10-29_21-26-38.jpg",
    title: "Vibrant Energy & Beautiful Spirit",
    date: "Art & Smiles",
    category: "solo",
    subtitle: "Effortless confidence and an infectious, glowing aura."
  }
];

function initPhotoGallery() {
  const photoGrid = document.getElementById('photo-gallery-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxSub = document.getElementById('lightbox-sub');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  if (!photoGrid) return;

  let activeFilter = 'all';
  let activeIndex = 0;
  let visiblePhotos = [...GALLERY_PHOTOS];

  function renderGallery() {
    photoGrid.innerHTML = '';
    visiblePhotos = GALLERY_PHOTOS.filter(photo => {
      if (activeFilter === 'all') return true;
      return photo.category === activeFilter;
    });

    visiblePhotos.forEach((photo, idx) => {
      const card = document.createElement('div');
      card.className = 'photo-card';
      card.setAttribute('data-index', idx);

      card.innerHTML = `
        <div class="photo-img-wrap">
          <img src="${photo.src}" alt="${photo.title}" class="photo-card-img" loading="lazy" />
          <div class="photo-overlay">
            <div class="photo-zoom-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </div>
          </div>
        </div>
        <div class="photo-info">
          <span class="photo-date">${photo.date}</span>
          <h3 class="photo-caption">${photo.title}</h3>
          <p class="photo-tag">${photo.subtitle}</p>
        </div>
      `;

      card.addEventListener('click', () => {
        openLightbox(idx);
      });

      photoGrid.appendChild(card);
    });
  }

  // Filter tab clicks
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      renderGallery();
    });
  });

  // Lightbox logic
  function openLightbox(index) {
    if (!lightbox) return;
    activeIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    const item = visiblePhotos[activeIndex];
    if (!item) return;
    lightboxImg.src = item.src;
    lightboxImg.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxSub.textContent = `${item.date} • ${item.subtitle}`;
  }

  function showNext() {
    activeIndex = (activeIndex + 1) % visiblePhotos.length;
    updateLightboxContent();
  }

  function showPrev() {
    activeIndex = (activeIndex - 1 + visiblePhotos.length) % visiblePhotos.length;
    updateLightboxContent();
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-dialog')) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

  renderGallery();
}

/* ===================================================================
   8. INTERACTIVE CAKE & CANDLE BLOW
   =================================================================== */
function initCakeCandle() {
  const blowBtn = document.getElementById('blow-candle-btn');
  const flame = document.getElementById('cake-flame');
  const smoke = document.getElementById('cake-smoke');
  const banner = document.getElementById('wish-granted-banner');
  const cakeSubtitle = document.getElementById('cake-instruction-sub');

  if (!blowBtn || !flame) return;

  let blownOut = false;

  blowBtn.addEventListener('click', () => {
    if (blownOut) {
      // Re-light candle
      flame.classList.remove('blown-out');
      if (smoke) smoke.classList.remove('active');
      if (banner) banner.classList.remove('show');
      blowBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        </svg>
        Make a Wish & Blow the Candle
      `;
      if (cakeSubtitle) cakeSubtitle.textContent = 'Close your eyes, make a sweet 22nd birthday wish, and tap below:';
      blownOut = false;
      return;
    }

    // Extinguish flame
    flame.classList.add('blown-out');
    if (smoke) smoke.classList.add('active');

    // Confetti and floating hearts explosion
    triggerConfettiExplosion();
    triggerHeartShower();

    if (banner) banner.classList.add('show');
    if (cakeSubtitle) cakeSubtitle.textContent = '✨ Your wish is glowing in the heavens! ✨';

    blowBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
      </svg>
      Relight Candle & Wish Again
    `;
    blownOut = true;
  });
}

/* ===================================================================
   9. FLOATING HEARTS & CELEBRATION CONFETTI
   =================================================================== */
function triggerHeartShower() {
  const heartIcons = ['💖', '🌸', '✨', '💕', '🌹', '🕯️', '🥂'];
  const count = 18;

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'floating-heart-el';
      el.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];
      el.style.left = `${Math.random() * 85 + 5}vw`;
      el.style.bottom = '10vh';
      el.style.fontSize = `${Math.random() * 1.5 + 1.2}rem`;
      document.body.appendChild(el);

      setTimeout(() => {
        el.remove();
      }, 2900);
    }, i * 90);
  }
}

function triggerConfettiExplosion() {
  const colors = ['#f4c7cb', '#e8a5ab', '#e2b97f', '#fae4cb', '#d8c4e8', '#ffd699'];
  const confettiCount = 50;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'floating-heart-el';
    confetti.style.width = `${Math.random() * 8 + 6}px`;
    confetti.style.height = `${Math.random() * 12 + 8}px`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = '2px';
    confetti.style.left = `${Math.random() * 90 + 5}vw`;
    confetti.style.bottom = `${Math.random() * 20 + 20}vh`;
    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 2800);
  }
}

function initHeartBurst() {
  const heartBtn = document.getElementById('heart-burst-btn');
  if (heartBtn) {
    heartBtn.addEventListener('click', () => {
      triggerHeartShower();
    });
  }
}
