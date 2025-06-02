import { createBrowserRouter } from "react-router";

import Configuracion from "@/app/configuracion";
import AsingSchedules from "@/app/asingschedules";
import Programacion from "@/app/calendario";
import Employees from "@/app/employees";
import Dashboard from "@/app/dashboard";
import Shifts from "@/app/turnos";

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
      },
      {
        path: "shifts",
        element: <Shifts />
      },
      {
        path: "asing-schedules",
        element: <AsingSchedules />
      }
    ]
  }
])