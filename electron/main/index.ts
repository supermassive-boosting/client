import { app, BrowserWindow, shell, ipcMain, dialog, protocol, Menu } from 'electron';
import { release } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/* eslint-disable-next-line*/
process.on('uncaughtException', (err, _) => {
  const dialogOpts: Electron.MessageBoxOptions = {
    type: 'error',
    title: 'Supermassive',
    message: 'An error occured while running Supermassive and it will now quit. To report the issue, click Report.',
    buttons: ['Report', 'OK'],
  };

  dialog.showMessageBox(dialogOpts).then(returnValue => {
    if (returnValue.response === 0) {
      shell.openExternal('https://github.com/supermassive-boosting/App/issues');
    }
    app.quit();
  });
});

globalThis.__filename = fileURLToPath(import.meta.url);
globalThis.__dirname = dirname(__filename);

process.env.DIST_ELECTRON = join(__dirname, '..');
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist');

process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST;

const isDevelopment = process.env.NODE_ENV !== 'production';
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = isDevelopment ? 'true' : 'false';

protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }]);

if (release().startsWith('6.1')) app.disableHardwareAcceleration();

if (process.platform === 'win32') app.setAppUserModelId(app.getName());

Menu.setApplicationMenu(null);

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

let win: BrowserWindow | null = null;
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, 'index.html');

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    icon: join(process.env.VITE_PUBLIC, 'favicon.ico'),
    autoHideMenuBar: true,
    width: 1600,
    height: 1000,
    backgroundColor: '#1D1D1E',
    resizable: false,
    webPreferences: {
      allowRunningInsecureContent: false,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(url);
    // win.webContents.openDevTools();
  } else {
    win.loadFile(indexHtml);
  }

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url);
    return { action: 'deny' };
  });
  // win.webContents.on('will-navigate', (event, url) => { }) #344
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  win = null;

  if (process.platform !== 'darwin') app.quit();
});

app.on('second-instance', () => {
  if (win) {
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows();

  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`);
  } else {
    childWindow.loadFile(indexHtml, { hash: arg });
  }
});
