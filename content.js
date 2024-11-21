// Pause the video when switching tabs or minimizing the window
window.addEventListener('blur', () => {
    const video = document.querySelector('video');
    if (video) {
      video.pause();
    }
  });
  
  // Resume the video when the page is back in focus
  window.addEventListener('focus', () => {
    const video = document.querySelector('video');
    if (video) {
      video.play();
    }
  });
  