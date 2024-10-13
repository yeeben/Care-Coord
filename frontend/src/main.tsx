
import Home from './Home.tsx';
import CarePlan from './CarePlan.tsx';
import App from './App.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import './index.css';


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/careplan",
        element: <CarePlan />
    },
    {
      path: "/sanity",
      element: <App />,
    },

]);



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>,
)