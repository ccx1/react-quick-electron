const {app, BrowserWindow, remote } = require('electron')
const path = require('path');
global.electron = require('electron')
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
const {CommandsRegistry} = require('./command');

const area = {
    width:800,
    height:600,
    minWidth:800,
    minHeight:600
}

function createWindow() {
    // 创建浏览器窗口
    let win = new BrowserWindow({
        ...area,
        webPreferences: {
            nodeIntegration: true
        },
        frame: false,
        icon: process.env.NODE_ENV === 'development' ? './logo.ico' : path.resolve(__dirname, '../logo.ico'),
        resizable: true,
        // titleBarStyle: 'default',
        // maximizable:true
    })
    // 加载index.html文件
    if (process.env.NODE_ENV === 'development') {
        win.loadURL('http://127.0.0.1:8080');
        win.webContents.openDevTools();
    } else {
        // 编译ts后生成的js文件放在 output/下，所以对dist的引用地址要改变一下
        win.loadFile(path.resolve(__dirname, '../dist/index.html'));
    }

    CommandsRegistry.registerCommand("closeWindow", () => {
        app.exit(0)
    })

    CommandsRegistry.registerCommand("miniWindow", (event, args) => {
        win.minimize();
    })

    CommandsRegistry.registerCommand("resizeWindow", (event, args) => {
        if (!win.isMaximized()) {
            win.maximize()
        } else {
            win.unmaximize()
        }
    })

}

app.whenReady().then(createWindow);