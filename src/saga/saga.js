/**
 * @file saga
 */
import actions from '../action/action';
import * as api from '../api/api';

import {fork, put, call, take, all, select} from 'redux-saga/effects';

function* getPageData() {
    try {
        const [initConfig] = yield all([
            call(api.getProjects),
        ]);
        yield put(actions.renderPageData(initConfig));
    }
    catch (e) {
        // yield put(console.log(e));
    }
}

function* initPage() {
    yield fork(getPageData);
}


export default function* root() {
    yield all([
        fork(initPage),
    ]);
}
