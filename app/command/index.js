/**
 * 信号桥梁,两端互通的桥梁
 */
const {ipcMain, ipcRenderer} = require('electron')

const CommandsRegistry = new class {


    /**
     *  注册命令
     * @param {string} name 命令名称
     * @param {function(event,...args)} exec 命令执行体
     */
    registerCommand = (name, exec) => {
        if (typeof name === 'string') {
            ipcMain.on(name, (event, args) => exec(event,args));
        }
    }

    /**
     * 执行指定命令
     * @param {{code:string,data?:any}} data  端信号数据
     */
    execCommand = (data) => {
        ipcRenderer.send(data.code, data);
    }
}

module.exports = {CommandsRegistry};