const ipcRenderer = require('electron').ipcRenderer;
const remote = require('electron').remote;

var closeBtn = document.querySelector(".close"),
    menuBtn = document.querySelector(".menu"),
    panel = document.querySelector(".panel"),
    playBtn = document.querySelector(".play-btn"),
	player = videojs('player'),
	errorMessage = '';

function play() {
	var input = document.getElementById("video-url").value;
	if (!input)
		return;

  videojs('player').src({"src": input, "type": "video/youtube"});
  togglePanel();
}

function togglePanel() {
  panel.classList.toggle('is-visible');
  menuBtn.classList.toggle("is-panel-visible");
}

function onInputKeyup(event) {
	if (event.which == 13) {
		play();
	}
}

function onError(err) {
	togglePanel();
	document.querySelector('.message').innerHTML = player.error().code;
}

function onLoadedMetadata() {
	document.querySelector('.message').innerHTML = '';
}

function onUserActive() {
	document.querySelector('.action-bar').classList.remove('hidden');
}

function onUserInactive() {
	if (!(player.paused() || panel.classList.contains('is-visible')))
		document.querySelector('.action-bar').classList.add('hidden');
}
function shutdown() {
	ipcRenderer.send('asynchronous-message', 'shutdown')
}

menuBtn.addEventListener("click", togglePanel);
playBtn.addEventListener("click", play);
closeBtn.addEventListener("click", shutdown);
player.on('error', onError, true);
player.on('loadedmetadata', onLoadedMetadata, true);
player.on('useractive', onUserActive, true);
player.on('userinactive', onUserInactive, true);

window.onresize = function (event) {
	var win = remote.getCurrentWindow();
	var bounds = win.getBounds();
	var newWidth = window.innerWidth;
	var newHeight = window.innerHeight;
	var newX = bounds.x - (newWidth - bounds.width);
	var newY = bounds.y - (newHeight - bounds.height);
	win.setBounds({
		x: newX,
		y: newY,
		width: newWidth,
		height: newHeight
	});
}