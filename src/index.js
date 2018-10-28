import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './Store';
import App from './App';
import './index.scss';

ReactDOM.render(
    <Provider store={configureStore()}>
        <App />
    </Provider>, 
    document.getElementById('root'))
;
