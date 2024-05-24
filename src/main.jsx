import React from 'react';
import { App } from './app/App.jsx';
import { createRoot } from 'react-dom/client';
import { ProductsProvider } from './context/ProductsContext.jsx';

const root = createRoot(document.getElementById('app'));

root.render(
  <React.StrictMode>
    <ProductsProvider>
      <App />
    </ProductsProvider>
  </React.StrictMode>
);
