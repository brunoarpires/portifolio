'use client';

import { FolderGit2, ExternalLink } from 'lucide-react';
import type { Project } from '@/types/portfolio';

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="py-24 px-6 max-w-5xl w-full border-t border-slate-800/50">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center flex items-center justify-center gap-3">
        <FolderGit2 className="text-sky-500 w-8 h-8" /> Projetos em Destaque
      </h2>
      <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
        Aqui apresento alguns dos meus projetos técnicos desenvolvidos, envolvendo tanto laboratórios de estudos avançados quanto soluções corporativas reais arquitetadas para clientes.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="group relative bg-[#0a0a0a] border border-slate-800 rounded-2xl overflow-hidden hover:border-sky-500/50 transition-all duration-300 shadow-xl flex flex-col h-full"
          >
            <div className="w-full h-48 bg-slate-800/50 relative overflow-hidden group-hover:opacity-80 transition-opacity">
              <div className="absolute inset-0 flex items-center justify-center text-slate-600">
                [Imagem de Capa {proj.image}]
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-xl text-slate-200 group-hover:text-sky-400 transition-colors">
                  {proj.title}
                </h3>
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${proj.type === 'Cliente' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'}`}
                >
                  {proj.type}
                </span>
              </div>

              <p className="text-slate-400 leading-relaxed text-sm mb-6 flex-1">{proj.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
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
                Acessar Projeto <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button
          disabled
          className="px-6 py-3 border border-slate-700 bg-transparent rounded-full text-slate-500 text-sm font-medium cursor-not-allowed"
        >
          Carregando mais projetos...
        </button>
      </div>
    </section>
  );
}
