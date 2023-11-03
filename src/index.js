// index.js
import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Albums } from "./Albums";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Albums />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
