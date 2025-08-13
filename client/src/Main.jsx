import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { applyMiddleware, compose } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index.js';
import { StyledEngineProvider } from '@mui/material/styles'; // Import this
import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <StyledEngineProvider injectFirst>
    <Provider store={store}>
      <App />
    </Provider>
  </StyledEngineProvider>
);
