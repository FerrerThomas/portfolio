"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import emailjs from "@emailjs/browser"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

  useEffect(() => {
    if (publicKey) {
      emailjs.init(publicKey)
    } else {
      console.warn("⚠️ Falta NEXT_PUBLIC_EMAILJS_PUBLIC_KEY")
    }
  }, [publicKey])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (!publicKey) {
        throw new Error("EmailJS public key missing")
      }

      if (!serviceId || !templateId) throw new Error("EmailJS env vars missing")

      // Enviar email usando EmailJS
      const result = await emailjs.sendForm(serviceId, templateId, formRef.current!)

      console.log("Email sent successfully:", result.text)

      toast({
        title: "¡Mensaje enviado!",
        description: "Gracias por contactarme. Te responderé pronto.",
      })

      // Resetear el formulario
      formRef.current?.reset()
    } catch (error) {
      console.error("Error sending email:", error)

      toast({
        title: "Error al enviar",
        description:
          "Hubo un problema al enviar tu mensaje. Por favor, intenta de nuevo o contáctame directamente por email.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-6 transition-all duration-300 hover:border-purple-500/50">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur opacity-25 hover:opacity-100 transition duration-1000 hover:duration-200"></div>

        <div className="relative">
          <h3 className="text-2xl font-bold mb-6">Dejame tu consulta</h3>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                name="from_name"
                placeholder="Tu Nombre"
                required
                className="bg-zinc-900/50 border-zinc-700 focus:border-purple-500 focus:ring-purple-500/20"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="email"
                name="from_email"
                placeholder="Tu Email"
                required
                className="bg-zinc-900/50 border-zinc-700 focus:border-purple-500 focus:ring-purple-500/20"
              />
            </div>
            <div className="space-y-2">
              <Input
                name="subject"
                placeholder="Asunto"
                required
                className="bg-zinc-900/50 border-zinc-700 focus:border-purple-500 focus:ring-purple-500/20"
              />
            </div>
            <div className="space-y-2">
              <Textarea
                name="message"
                placeholder="Tu Mensaje"
                rows={5}
                required
                className="bg-zinc-900/50 border-zinc-700 focus:border-purple-500 focus:ring-purple-500/20"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 border-0"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>Enviando...</>
              ) : (
                <>
                  Enviar Mensaje <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          
        </div>
      </div>
    </motion.div>
  )
}
