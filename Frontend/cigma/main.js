import { app, BrowserWindow, Menu  } from 'electron'

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    Menu.setApplicationMenu(null)
    win.loadURL('http://localhost:5173');
    
    // 개발자 도구 열기
    // win.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});