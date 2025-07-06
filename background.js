chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'scanResult') {
      const { warnings, sender: emailSender } = message;
      
      if (warnings.length > 0) {
        chrome.action.setPopup({ popup: 'popup.html' }, () => {
          chrome.storage.local.set({ warnings: warnings, sender: emailSender }, () => {
            chrome.action.openPopup();
          });
        });
      }
    }
  });