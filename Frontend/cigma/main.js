import { app, BrowserWindow, Menu } from "electron";

function createWindow() {
  // 윈도우 크기 설정
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // 상단부 메뉴 비표시
  Menu.setApplicationMenu(null);

  //로딩할 Url
  win.loadURL("http://cigmacode.com/login");

  // 개발자 도구 열기
  // win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
