import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { SectionHeading } from "@/components/section-heading"
import { projects } from "@/lib/projects"

export default function ProjectsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-white overflow-hidden py-32 relative">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
                <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
            </div>

            <div className="container relative z-10">
                <div className="flex flex-col items-center mb-12">
                    <Link href="/">
                        <Button variant="ghost" className="mb-8 text-zinc-400 hover:text-white">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al inicio
                        </Button>
                    </Link>
                    <SectionHeading title="Todos mis Proyectos" subtitle="Explora mi portafolio completo" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            title={project.title}
                            description={project.description}
                            tags={project.tags}
                            image={project.image}
                            demoUrl={project.demoUrl}
                            repoUrl={project.repoUrl}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
