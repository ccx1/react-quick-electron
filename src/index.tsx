import 'babel-polyfill';
import * as React from 'react';
import {render} from 'react-dom';
import App from '@/App.tsx';
import configureStore from '@/store/configureStore';
import rootSaga from '@/saga/saga';

const store = configureStore();
store.runSaga(rootSaga);
if (module.hot) {
    module.hot.accept('./saga/saga', () => {
        const nextSaga = require('./saga/saga').default;
        store.runSaga(nextSaga);
    });
}

function renderApp() {
    const app = <App store={store}/>;
    render(
        app,
        document.querySelector('#root')
    );
}

renderApp();
