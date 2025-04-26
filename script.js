const buttons     = document.querySelectorAll('button[data-sound]');
let currentAudio  = null;

buttons.forEach(btn => {
  const audio = new Audio(`sounds/${btn.dataset.sound}`);
  audio.load();  // 미리 로드

  const playSound = () => {
    // 이전 소리 중단
    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    // 새 소리 재생
    currentAudio = audio;
    audio.currentTime = 0;
    audio.play();
  };

  btn.addEventListener('click', playSound);
  btn.addEventListener('touchstart', playSound);
});
