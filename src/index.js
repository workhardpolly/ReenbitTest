import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UploadDB from './components/db/UploadDB';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UploadDB />
    <App />
  </React.StrictMode>
);
