const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

var appIcon = null;
var WIN_HEIGHT = 250;
var WIN_WIDTH = 420
app.on('ready', () => {
  
  var screen = electron.screen;
  var displays = screen.getAllDisplays();
  var top = displays[0].workAreaSize.height - WIN_HEIGHT;
  var left = displays[0].workAreaSize.width - WIN_WIDTH;
  var win = new BrowserWindow({
    height: WIN_HEIGHT,
    width: WIN_WIDTH,
    show: false,
    frame: false,
    x: left,
    y: top,
    alwaysOnTop: true
  });

  win.loadURL('file://' + __dirname + '/index.html');
  win.show();

  ipcMain.on('asynchronous-message', function (event, arg) {
    if (arg == "shutdown")
      app.quit();
  })
});

