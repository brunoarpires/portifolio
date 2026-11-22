'use client';

import { FolderGit2, Github, ChevronDown } from 'lucide-react';
import type { Project } from '@/types/portfolio';
import { ProjectCarousel } from '@/components/ProjectCarousel';

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="py-24 px-6 max-w-5xl w-full border-t border-slate-800/50">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center flex items-center justify-center gap-3">
        <FolderGit2 className="text-sky-500 w-8 h-8" /> Projetos
      </h2>
      <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
        Projetos pessoais que desenvolvi no tempo livre, com código aberto no GitHub.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="group relative bg-[#0a0a0a] border border-slate-800 rounded-2xl overflow-hidden hover:border-sky-500/50 transition-all duration-300 shadow-xl flex flex-col h-full"
          >
            <ProjectCarousel
              title={proj.title}
              slides={proj.gallery && proj.gallery.length > 0 ? proj.gallery : [{ src: proj.image, alt: `Captura de tela do ${proj.title}` }]}
            />

            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start gap-3 mb-4">
                <h3 className="font-bold text-xl text-slate-200 group-hover:text-sky-400 transition-colors">
                  {proj.title}
                </h3>
                <span
                  className={`shrink-0 px-3 py-1 text-xs rounded-full font-medium ${
                    proj.type === 'Cliente'
                      ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                      : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                  }`}
                >
                  {proj.type}
                </span>
              </div>

              <p className="text-slate-400 leading-relaxed text-sm mb-4">{proj.description}</p>

              {proj.highlights && proj.highlights.length > 0 && (
                <details className="mb-6 rounded-xl border border-slate-800 bg-white/[0.02] px-4 py-3 group/detalhes">
                  <summary className="cursor-pointer text-sm font-medium text-sky-400 hover:text-sky-300 flex items-center justify-between gap-2 list-none [&::-webkit-details-marker]:hidden [&::marker]:hidden">
                    Detalhes técnicos
                    <ChevronDown className="w-4 h-4 shrink-0 transition-transform duration-200 group-open/detalhes:rotate-180" />
                  </summary>
                  <ul className="mt-3 space-y-2.5 text-sm text-slate-400 leading-relaxed list-disc pl-4">
                    {proj.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </details>
              )}

              <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-white/5 text-slate-300 px-3 py-1 rounded-md border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-sky-500 hover:text-sky-400 transition-colors"
              >
                <Github className="w-4 h-4" /> Ver no GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
