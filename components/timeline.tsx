"use client"

import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

const experiences = [
  {
    title: "Reunión inicial con el cliente",
    period: "Entender las necesidades del cliente y el propósito del proyecto",
    description:
      "Entender el propósito de la web (empresa, tienda online, blog, etc.), establecer las funcionalidades necesarias y acordar un plazo y presupuesto",
  },
  {
    title: "Estructuración del contenido",
    period: "Planificar el contenido y la estructura de la página web",
    description:
      "Revisar páginas similares (si el cliente cuenta con ejemplos), organizar la estructura jerárquica de la web (qué páginas habrá, cómo estarán relacionadas entre sí, y crear bocetos ilustrativos de las principales páginas",
  },
  {
    title: "Desarrollo de la Web",
    period: "Convertir las ideas, contenido y bocetos en una realidad",
    description:
      "Crear versiones detalladas de las páginas requeridas, incorporando colores, tipografías y elementos visuales definidos anteriormente",
  },
  {
    title: "Presentación de la Version 1",
    period: "Mostrar la versión obtenida al cliente",
    description: "Aqui el cliente puede ver todo lo contruido, las funcionalidades, el contenido, para obtener feedback y asi llegar a posibles cambios",
  },
  {
    title: "Corregir cambios pedidos",
    period: "Opcional si el cliente decidio cambiar algo de la Version 1",
    description: "Se corrigen los cambios pedidios para llegar a al version final de la Web",
  },
  {
    title: "Lanzamiento de la Web",
    period: "Poner la version final en línea",
    description: "Se configura hosting y dominio personal, tambien se realizan las ultimas rondas de pruebas para asegurarse de que todo esté funcionando correctamente.",
  },
]

export function Timeline() {
  const isMobile = useMobile()

  return (
    <div
      className={`space-y-12 relative ${
        !isMobile
          ? "before:absolute before:inset-0 before:left-1/2 before:ml-0 before:-translate-x-px before:border-l-2 before:border-zinc-700 before:h-full before:z-0"
          : ""
      }`}
    >
      {experiences.map((experience, index) => (
        <div
          key={index}
          className={`relative z-10 flex items-center ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
        >
          <motion.div
            className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pl-10" : "md:pr-10"}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-6 transition-all duration-300 hover:border-purple-500/50">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur opacity-25 hover:opacity-100 transition duration-1000 hover:duration-200"></div>

              <div className="relative">
                <h3 className="text-xl font-bold">{experience.title}</h3>
                <div className="text-zinc-400 mb-4">
                  {/*experience.company*/} | {experience.period}
                </div>
                <p className="text-zinc-300">{experience.description}</p>
              </div>
            </div>
          </motion.div>

          {!isMobile && (
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
              <motion.div
                className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 z-10 flex items-center justify-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </motion.div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
