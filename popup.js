// popup.js
document.getElementById('toggle').addEventListener('click', () => {
  const statusText = document.getElementById('status');
  const toggleButton = document.getElementById('toggle');

  chrome.storage.local.get('autoPauseEnabled', (data) => {
    const currentStatus = data.autoPauseEnabled !== undefined ? data.autoPauseEnabled : true;
    const newStatus = !currentStatus;

    // Update storage with new status
    chrome.storage.local.set({ autoPauseEnabled: newStatus });

    // Update UI based on the status
    if (newStatus) {
      statusText.innerHTML = 'Auto-Pause is <strong>Enabled</strong>';
      toggleButton.innerHTML = 'Disable Auto-Pause';
    } else {
      statusText.innerHTML = 'Auto-Pause is <strong>Disabled</strong>';
      toggleButton.innerHTML = 'Enable Auto-Pause';
    }
  });
});

// Initialize status on popup open
chrome.storage.local.get('autoPauseEnabled', (data) => {
  const statusText = document.getElementById('status');
  const toggleButton = document.getElementById('toggle');
  const currentStatus = data.autoPauseEnabled !== undefined ? data.autoPauseEnabled : true;

  if (currentStatus) {
    statusText.innerHTML = 'Auto-Pause is <strong>Enabled</strong>';
    toggleButton.innerHTML = 'Disable Auto-Pause';
  } else {
    statusText.innerHTML = 'Auto-Pause is <strong>Disabled</strong>';
    toggleButton.innerHTML = 'Enable Auto-Pause';
  }
});
