const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const { generateDescription } = require("./gpt");

const main = () => {
  handleInstallerStartupEvents();
  registerIpcEventListeners();
  app.whenReady().then(createWindow);
  app.on("window-all-closed", quitApp);
  app.on("activate", activateApp);
};

const handleInstallerStartupEvents = () => {
  if (require("electron-squirrel-startup")) {
    app.quit();
  }
};

const registerIpcEventListeners = () => {
  ipcMain.handle("generateDescription", async (_, productName, specification) => await generateDescription(productName, specification));
};

const createWindow = () => {
  const window = new BrowserWindow({
    width: 1600,
    height: 900,
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
