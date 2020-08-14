const { app, BrowserWindow,Menu,ipcMain } = require('electron')
const path = require('path');
global.electron = require('electron')
function createWindow () {
    // 创建浏览器窗口
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            devTools:false
        },
        frame: false,
        icon: process.env.NODE_ENV === 'development'? './logo.ico': path.resolve(__dirname, '../logo.ico'),
        resizable: false
    })
    // 加载index.html文件
    if (process.env.NODE_ENV === 'development') {
        win.loadURL('http://127.0.0.1:8080');
        win.webContents.openDevTools();
    } else {
        // 编译ts后生成的js文件放在 output/下，所以对dist的引用地址要改变一下
        win.loadFile(path.resolve(__dirname, '../dist/index.html'));
    }
    // Menu.setApplicationMenu(null);

    ipcMain.on("closeWindow",(event,args)=>{
        // console.log("收到")
        app.quit();
    })

}

app.whenReady().then(createWindow);