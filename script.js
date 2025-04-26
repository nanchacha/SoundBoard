const buttons       = document.querySelectorAll('button[data-sound]');
let currentAudio    = null;
const isTouchDevice = 'ontouchstart' in window;

buttons.forEach(btn => {
  const soundFile = btn.dataset.sound;
  const audio     = new Audio(`sounds/${soundFile}`);
  audio.load();

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

  // Press 효과 주기
  const addPress = () => btn.classList.add('pressed');
  const removePress = () => btn.classList.remove('pressed');

  if (isTouchDevice) {
    btn.addEventListener('touchstart', addPress);
    btn.addEventListener('touchend', removePress);
    btn.addEventListener('touchend', playSound);
    // 혹시 터치가 취소될 때도 효과 해제
    btn.addEventListener('touchcancel', removePress);
  } else {
    btn.addEventListener('mousedown', addPress);
    btn.addEventListener('mouseup', removePress);
    btn.addEventListener('mouseleave', removePress);
    btn.addEventListener('click', playSound);
  }
});
