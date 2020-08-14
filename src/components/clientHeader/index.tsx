import * as React from 'react';
import './index.less'
import {Button} from 'antd';
import {CommandsRegistry} from "@/utils/command";
import { MinusOutlined,CloseOutlined } from '@ant-design/icons';

const ClientHeader: React.FC<any> = () => {

    return <div className={"client-header"}>
        <div className={"drag-header"}/>
        <div className={"client-header-wrapper"}>
            <Button type="primary" shape="circle" onClick={() => {
                CommandsRegistry.execCommand({code:"closeWindow"})
            }} icon={<CloseOutlined />}/>
            <Button type="primary" shape="circle" danger onClick={()=>{
                CommandsRegistry.execCommand({code:"miniWindow"})
            }} icon={<MinusOutlined />}/>
        </div>
    </div>
}

export default ClientHeader;