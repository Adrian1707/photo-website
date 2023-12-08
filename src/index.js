import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import App from "./App";
const Albums = React.lazy(() => import("./Albums"))
const Flags = React.lazy(() => import("./Flags"))
const Map = React.lazy(() => import("./Map"))
const Gallery = React.lazy(() => import("./Gallery"))

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Albums />
      },
      {
        path: ':albumName',
        element: <Gallery />
      },
      {
        path: 'map',
        element: <Map />
      },
      {
        path: 'flags',
        element: <Flags />
      }
    ]
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
