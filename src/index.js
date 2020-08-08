import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import authReducer from "./store/reducers/auth";
import signupReducer from './store/reducers/signup';
import policiesReducer from './store/reducers/policies';
import { watchAuth, watchPolicies,watchCustomerSignup } from "./store/sagas";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({ 
  auth: authReducer,
  signup:signupReducer,
  policy:policiesReducer
 });

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchPolicies);
sagaMiddleware.run(watchCustomerSignup);

const app = (
  <Provider store={store}>
    <BrowserRouter>
    <CssBaseline />
      <App />
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(
  app,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
