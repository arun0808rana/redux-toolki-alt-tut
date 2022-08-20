import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
// notice it is different than redux
// infact redux nowadays throws depreciation err
import { configureStore } from '@reduxjs/toolkit';

// redux toolkit enforces the name features for making slices
// in features/user, user is the slice, should have been userSlice
// for better readability 
import userReducer from './features/user';

const store = configureStore({
  reducer: {
    // user is the name of the reducer
    user: userReducer,
    // you can add multiple reducers here and name them
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
