const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

const main = () => {
  handleStartupEvents();
  disableNativeMenu();
  app.whenReady().then(createWindow);
  app.on("window-all-closed", quitApp);
  app.on("activate", activateApp);
};

const handleStartupEvents = () => {
  if (require("electron-squirrel-startup")) {
    app.quit();
  }
};

const disableNativeMenu = () => {
  Menu.setApplicationMenu(null);
};

const createWindow = () => {
  const window = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      sandbox: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isDev) {
    window.loadURL("http://localhost:3000");
  } else {
    window.loadFile(path.join(__dirname, "build", "index.html"));
  }

  openDevTools(window);
};

const openDevTools = (window) => {
  if (isDev) {
    window.webContents.openDevTools();
  }
};

const quitApp = () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
};

const activateApp = () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
};

main();
