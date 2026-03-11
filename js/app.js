console.log('app.js loaded');

const playBtn = document.getElementById('playBtn');
const audioPlayer = document.getElementById('audioPlayer');
const statusText = document.getElementById('status');

playBtn.addEventListener('click', async () => {
  try {
    await audioPlayer.play();
    statusText.textContent = 'Status: playing audio';
  } catch (error) {
    console.error('Audio play error:', error);
    statusText.textContent = `Status: playback failed - ${error.message}`;
  }
});

audioPlayer.addEventListener('loadeddata', () => {
  console.log('Audio loaded successfully');
});

audioPlayer.addEventListener('error', () => {
  console.error('Audio element error:', audioPlayer.error);
  statusText.textContent = 'Status: audio file could not be loaded';
});