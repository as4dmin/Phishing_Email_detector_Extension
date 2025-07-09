function scanEmailContent() {
  const emailBody = Array.from(document.querySelectorAll('.a3s, .ii, .gt, .gs')).map(el => el.innerText).join(' ');
  const sender = document.querySelector('.gD')?.innerText || document.querySelector('[email]')?.getAttribute('email') || 'Unknown';
  
  if (!emailBody) return;

  const suspiciousKeywords = ['urgent', 'verify your account', 'login now', 'bank details', 'click here'];
  const unsafeLinkRegex = /http[s]?:\/\/[^\s]*\.(info|xyz|click|top|co|tk|ml|ga|cf|gq|bit\.ly)/i;
  const links = emailBody.match(/http[s]?:\/\/[^\s]+/g) || [];

  let warnings = [];
  
  // Check keywords
  suspiciousKeywords.forEach(keyword => {
    if (emailBody.toLowerCase().includes(keyword)) {
      warnings.push(`Suspicious keyword: "${keyword}"`);
    }
  });

  // Check links with Google Safe Browsing API
  if (links.length > 0) {
    const apiKey = "your key; // Replace with your API key
    fetch(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client: { clientId: "yourcompany", clientVersion: "1.0" },
        threatInfo: {
          threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"],
          platformTypes: ["ANY_PLATFORM"],
          threatEntryTypes: ["URL"],
          threatEntries: links.map(link => ({ url: link }))
        }
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.matches) {
        data.matches.forEach(match => {
          warnings.push(`Unsafe link detected by Google Safe Browsing: "${match.threat.url}" (${match.threatType})`);
        });
      }
      checkSenderAndSend(warnings, sender);
    })
    .catch(error => {
      console.error('Safe Browsing API error:', error);
      warnings.push('Error checking links with Safe Browsing API');
      checkSenderAndSend(warnings, sender);
    });
  } else {
    checkSenderAndSend(warnings, sender);
  }
}

function checkSenderAndSend(warnings, sender) {
  // Sender reputation check (placeholder for external API)
  const senderDomain = sender.includes('@') ? sender.split('@')[1].toLowerCase() : '';
  fetch('https://api.spamcheck.com/check?email=' + sender, { // Replace with real spam API endpoint
    method: 'GET'
  })
  .then(response => response.json())
  .then(data => {
    if (data.isSpam) {
      warnings.push(`Controversial sender detected: "${sender}"`);
    }
    sendResult(warnings, sender);
  })
  .catch(() => {
    // Fallback: basic controversial domain check
    const controversialDomains = ['@example.com', '@spamdomain.com'];
    if (controversialDomains.includes('@' + senderDomain)) {
      warnings.push(`Controversial sender: "${sender}"`);
    }
    sendResult(warnings, sender);
  });
}

function sendResult(warnings, sender) {
  chrome.runtime.sendMessage({
    type: 'scanResult',
    sender: sender,
    warnings: warnings
  });
}

const observer = new MutationObserver(() => {
  if (document.querySelector('.a3s, .ii, .gt, .gs')) {
    scanEmailContent();
  }
});
observer.observe(document.body, { childList: true, subtree: true });
