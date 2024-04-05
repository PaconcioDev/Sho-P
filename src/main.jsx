import React from 'react';
import { App } from './app/App.jsx';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('app'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
