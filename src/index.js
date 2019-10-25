import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import App from './App';
import theme from './config/theme';
import * as serviceWorker from './serviceWorker';

import reducer from './store/reducer';
import { watchAuth } from './store/sagas';

const composeEnhancers = 
    process.env.NODE_ENV === "development"
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : null || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(watchAuth);

const app = (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <BrowserRouter basename="/">
                <CssBaseline />
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </Provider>);

ReactDOM.render(
    app, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
