// script.js
const buttons       = document.querySelectorAll('button[data-sound]');
let currentAudio    = null;
const isTouchDevice = 'ontouchstart' in window;

buttons.forEach(btn => {
  const soundFile = btn.dataset.sound;               // ex) "cow.mp3"
  const audio     = new Audio(`sounds/${soundFile}`);
  audio.load();

  const playSound = e => {
    // 터치 디바이스에서는 기본 클릭 이벤트 방지
    if (e.cancelable) e.preventDefault();

    // 이전 사운드 정리
    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    currentAudio = audio;
    audio.currentTime = 0;
    audio.play().catch(console.error);
  };

  if (isTouchDevice) {
    btn.addEventListener('touchend', playSound);
  } else {
    btn.addEventListener('click', playSound);
  }
});
