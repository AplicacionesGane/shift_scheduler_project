import { useEffect } from "react"
import axios from "axios"
import { API_SERVER_URL } from "@/utils/constants"

export default function programacion() {

  useEffect(() => {
    axios.get(`${API_SERVER_URL}/work-schedules/39825`)
  }, [])

  return (
    <div className="px-4">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <h1 className="text-2xl font-bold">Programación</h1>
        <p>Esta es la página de programación.</p>
      </div>
    </div>
  )
}