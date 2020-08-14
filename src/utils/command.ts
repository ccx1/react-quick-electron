/**
 * 与electron之间的沟通桥梁
 */
interface ICommand {
    name: string;
    exec: (...args) => void;
}

const COMMAND_MAP = [];

const win: any = window;
const {ipcRenderer} = win.electron || {};


export const CommandsRegistry = new class {


    /**
     *  注册命令
     * @param {string | Array<string>} name 命令名称
     * @param {function} exec 命令执行体
     */
    registerCommand = (name: string | Array<string>, exec: (...args) => void) => {
        if (typeof name === 'string') {
            let isDuplicate = COMMAND_MAP.find(command => command.name === name);
            if (isDuplicate) {
                console.warn(`command \'${name}\' is already registered!`);
            } else {
                COMMAND_MAP.push({name, exec});
            }
        } else if (Array.isArray(name)) {
            name.forEach(n => {
                let isDuplicate = COMMAND_MAP.find(command => command.name === name);
                if (isDuplicate) {
                    console.warn(`command \'${n}\' is already registered!`);
                } else {
                    COMMAND_MAP.push({n, exec});
                }
            })
        }
    }

    /**
     * 执行指定命令
     * @param {object} data 端信号数据
     */
    execCommand = (data: { code: string, data?: any }) => {
        let command: ICommand = COMMAND_MAP.find(command => command.name === data.code);
        if (command) {
            command.exec(data);
        } else if (ipcRenderer) {
            ipcRenderer.send(data.code, data);
        } else {
            console.warn(`command \'${data.code}\' is not registered!`);
        }
    }


}