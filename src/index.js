import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createHashRouter,
  RouterProvider,
  HashRouterProps,
} from "react-router-dom";
import './index.css';
import 'leaflet/dist/leaflet.css';
import AppWithNavigate from './App';

const router = createHashRouter([
  {
    path: "/*",
    element: <AppWithNavigate></AppWithNavigate>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} history={HashRouterProps} />
  </React.StrictMode>
);

