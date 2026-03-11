const playBtn = document.getElementById('playBtn');
const audioPlayer = document.getElementById('audioPlayer');
const statusText = document.getElementById('status');

playBtn.addEventListener('click', async () => {
  try {
    await audioPlayer.play();
    statusText.textContent = 'Status: playing audio';
  } catch (error) {
    console.error(error);
    statusText.textContent = 'Status: playback failed';
  }
});