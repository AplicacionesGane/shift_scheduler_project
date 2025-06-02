import { Calendar, Users, Settings, Home, LogOut, Sun, ArrowBigRightDashIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export function NavBar() {

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: Calendar, label: "Calendario", href: "/programacion" },
    { icon: ArrowBigRightDashIcon, label: "Asignar Turnos", href: "/asing-schedules" },
    { icon: Sun, label: "Turnos", href: "/shifts" },
    { icon: Users, label: "Empleados", href: "/employees" },
    { icon: Settings, label: "Configuración", href: "/config" },
  ]

  return (
    <>
      {/* Header */}
      <div className="p-4 flex items-center justify-center border-b w-full">
        <h2 className="text-xl font-bold">Shift Scheduler</h2>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-12"
                asChild
              >
                <a href={item.href}>
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </a>
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      <Separator />

      {/* Footer */}
      <div className="p-4">
        <Button variant="ghost" className="w-full justify-start gap-3 h-12">
          <LogOut className="h-5 w-5" />
          Cerrar Sesión
        </Button>
      </div>
    </>
  )
}
