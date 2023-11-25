import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import App from "./App";
import Gallery from "./Gallery";
import Map from "./Map";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: []
  },
  {
    path: '/:albumName',
    element: <Gallery />
  },
  {
    path: '/map',
    element: <Map />
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
