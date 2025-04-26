const buttons    = document.querySelectorAll('button[data-sound]');
let currentAudio = null;

buttons.forEach(btn => {
  const audio     = new Audio(`sounds/${btn.dataset.sound}`);
  audio.load();

  let removeTimer;

  const playSound = e => {
    e.preventDefault();
    // 이전 재생 중단
    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    currentAudio = audio;
    audio.currentTime = 0;
    audio.play().catch(console.error);
  };

  const addPress = () => {
    clearTimeout(removeTimer);
    btn.classList.add('pressed');
  };
  const removePress = () => {
    // 80ms 뒤에 클래스 제거 → 최소 한두 프레임 유지
    removeTimer = setTimeout(() => {
      btn.classList.remove('pressed');
    }, 80);
  };

  // Pointer Events로 통합 처리 (모바일/데스크탑 공통)
  btn.addEventListener('pointerdown', e => {
    e.preventDefault();
    addPress();
  });
  btn.addEventListener('pointerup', e => {
    playSound(e);
    removePress();
  });
  btn.addEventListener('pointercancel', removePress);
  btn.addEventListener('pointerleave', removePress);
});

const fsBtn = document.getElementById('enterFullscreen');
fsBtn.addEventListener('click', () => {
  const el = document.documentElement;
  if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen();
  }
  fsBtn.style.display = 'none'; // 한번만 표시
});

