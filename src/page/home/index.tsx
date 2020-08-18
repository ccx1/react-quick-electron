import * as React from 'react';
import {connect, DispatchProp} from "react-redux";
import {IPageInfo} from "@/reducer/BasicReducer";
import {Link, RouteComponentProps} from "react-router-dom";
import {Button, Input, Modal, Select} from "antd";
import {UploadFile} from "@/components/upload";
import * as config from '@/conts/conf';
import TransferBar from "@/transferBar";

const Option = Select.Option;

interface IHomeState {
    showUploadModal: boolean
}

type IHomeBaseProps = RouteComponentProps & DispatchProp;

interface IHomeProps extends IHomeBaseProps {
    pageInfo: IPageInfo,
}

class Home extends React.Component<IHomeProps, IHomeState> {

    state = {
        showUploadModal: false
    };

    constructor(props: IHomeProps) {
        super(props);
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    const pageInfo = state.pageInfo;
    return {pageInfo};
};

export default connect(mapStateToProps)(Home);
