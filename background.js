let activeTabId = null;

// Check initial auto-pause setting from storage
chrome.storage.local.get('autoPauseEnabled', (data) => {
  const autoPauseEnabled = data.autoPauseEnabled !== undefined ? data.autoPauseEnabled : true;

  chrome.tabs.onActivated.addListener((activeInfo) => {
    activeTabId = activeInfo.tabId;
    if (autoPauseEnabled) {
      chrome.scripting.executeScript({
        target: { tabId: activeInfo.tabId },
        function: pauseVideo
      });
    }
  });

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && tab.url.includes('youtube.com') && autoPauseEnabled) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: checkAndPlay
      });
    }
  });

  chrome.windows.onFocusChanged.addListener((windowId) => {
    if (windowId === chrome.windows.WINDOW_ID_NONE && autoPauseEnabled) {
      chrome.scripting.executeScript({
        target: { tabId: activeTabId },
        function: pauseVideo
      });
    }
  });

  function checkAndPlay() {
    const currentUrl = window.location.href;
    const video = document.querySelector('video');
    if (video && currentUrl.includes('youtube.com')) {
      video.play();
    }
  }

  function pauseVideo() {
    const video = document.querySelector('video');
    if (video) {
      video.pause();
    }
  }
});
