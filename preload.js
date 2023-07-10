const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("api", {
  generateDescription: async (productName, specification) => await ipcRenderer.invoke("generateDescription", productName, specification),
});
