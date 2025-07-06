document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['warnings', 'sender'], (data) => {
    const warningsList = document.getElementById('warnings');
    const senderSpan = document.getElementById('sender');
    
    senderSpan.textContent = data.sender || 'Unknown';
    
    if (data.warnings && data.warnings.length > 0) {
      data.warnings.forEach(warning => {
        const li = document.createElement('li');
        li.textContent = warning;
        warningsList.appendChild(li);
      });
    } else {
      const li = document.createElement('li');
      li.textContent = 'No issues detected.';
      li.className = 'safe';
      warningsList.appendChild(li);
    }
  });

  document.getElementById('closeButton').addEventListener('click', () => {
    window.close();
  });
});