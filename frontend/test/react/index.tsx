import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppHeader from '../../src/@components/AppHeader';
// import reportWebVitals from './reportWebVitals';

localStorage.clear();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppHeader messages={["message 1","message 2"]} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
