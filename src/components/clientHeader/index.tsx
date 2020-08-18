import * as React from 'react';
import './index.less'
import {Button} from 'antd';
import {CommandsRegistry} from "@/utils/command";
import {MinusOutlined, CloseOutlined, PlusSquareOutlined, MinusSquareOutlined} from '@ant-design/icons';
import {useState} from "react";

const win: any = window;


const ClientHeader: React.FC<any> = () => {
    const [isMaxWindow, setIsMaxWindow] = useState(false);

    return <div className={"client-header"}>
        <div className={"drag-header"}/>
        <div className={"client-header-wrapper"}>

            <Button type="primary"  onClick={() => {
                CommandsRegistry.execCommand({code: "miniWindow"})
            }} icon={<MinusOutlined/>}/>

            <Button type="primary"  onClick={() => {
                CommandsRegistry.execCommand({code: "resizeWindow"})
                setIsMaxWindow(!isMaxWindow)
            }} icon={!isMaxWindow ? <PlusSquareOutlined/> : <MinusSquareOutlined/>}/>

            <Button type="primary" danger onClick={() => {
                CommandsRegistry.execCommand({code: "closeWindow"})
            }} icon={<CloseOutlined/>}/>
        </div>
    </div>
}

export default ClientHeader;