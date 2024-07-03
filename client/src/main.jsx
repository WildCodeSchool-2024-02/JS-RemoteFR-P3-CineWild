import "./styles/app.css";
import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getCarrousel, getPopularMovies } from "./services/request";

import App from "./App";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Favoris from "./pages/Favoris"
import User from "./pages/User";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: async () => ({
          trending: await getCarrousel(),
          popular: await getPopularMovies(),
        }),
      },
      {
        path: "/movie",
        element: <Movie />,
      },
      {
        path: "/favoris",
        element: <Favoris />,
      },
      {
        path: "/user",
        element: <User />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
