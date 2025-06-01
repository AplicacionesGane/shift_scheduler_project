import { createBrowserRouter } from "react-router";

import Configuracion from "@/app/configuracion";
import Programacion from "@/app/programacion";
import Employees from "@/app/employees";
import Dashboard from "@/app/dashboard";

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
      },
      {
        path: "employees",
        element: <Employees />
      },
      {
        path: "config",
        element: <Configuracion />
      }
    ]
  }
])