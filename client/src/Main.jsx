import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {Provider} from 'react-redux'
import './index.css'

//provider is going to keep track of that store which is a global state and that allows us to access that store from anywhere in the app
import{applyMiddleware,compose} from 'redux'
import { legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk'
import reducers from './reducers/index.js';

const store = createStore(reducers,compose(applyMiddleware(thunk)))

// import store from './store/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store  = {store}>
    <App />
  </Provider>
    
  
);