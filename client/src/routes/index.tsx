import { createBrowserRouter } from "react-router";

import Dashboard from "@/app/dashboard";
import Programacion from "@/app/programacion";

import Root from "@/routes/root";

export const RouterMain = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "programacion",
        element: <Programacion />
      }
    ]
  }
])