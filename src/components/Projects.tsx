'use client';

import { useId, useMemo, useState } from 'react';
import { FolderGit2, Github, ChevronDown } from 'lucide-react';
import type { Project, ProjectSubcategory } from '@/types/portfolio';
import { ProjectCarousel } from '@/components/ProjectCarousel';
import { ProjectCardsCarousel } from '@/components/ProjectCardsCarousel';

interface ProjectsProps {
  projects: Project[];
  subcategories?: ProjectSubcategory[];
}

interface SubcategoryGroup {
  label: string;
  description?: string;
  count: number;
  projects: Project[];
}

const TODOS = 'Todos';
const FALLBACK_SUBCATEGORY = 'Outros';

function organizeSubcategories(projects: Project[], catalog: ProjectSubcategory[] = []): SubcategoryGroup[] {
  const meta = new Map(catalog.map((item) => [item.label, item]));
  const seen = new Set<string>();
  const order: string[] = [];

  for (const item of catalog) {
    if (!seen.has(item.label)) {
      seen.add(item.label);
      order.push(item.label);
    }
  }
  for (const project of projects) {
    const label = project.subcategory?.trim() || FALLBACK_SUBCATEGORY;
    if (!seen.has(label)) {
      seen.add(label);
      order.push(label);
    }
  }

  return order
    .map((label) => {
      const items = projects.filter((project) => (project.subcategory?.trim() || FALLBACK_SUBCATEGORY) === label);
      return {
        label,
        description: meta.get(label)?.description,
        count: items.length,
        projects: items,
      };
    })
    .filter((group) => group.count > 0);
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative bg-[#0a0a0a] border border-slate-800 rounded-2xl overflow-hidden hover:border-sky-500/50 transition-all duration-300 shadow-xl flex flex-col h-full w-full">
      <ProjectCarousel
        title={project.title}
        slides={
          project.gallery && project.gallery.length > 0
            ? project.gallery
            : [{ src: project.image, alt: `Captura de tela do ${project.title}` }]
        }
      />

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start gap-3 mb-4">
          <h3 className="font-bold text-xl text-slate-200 group-hover:text-sky-400 transition-colors">{project.title}</h3>
          <span
            className={`shrink-0 px-3 py-1 text-xs rounded-full font-medium ${
              project.type === 'Cliente'
                ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
            }`}
          >
            {project.type}
          </span>
        </div>

        <p className="text-slate-400 leading-relaxed text-sm mb-4">{project.description}</p>

        {project.highlights && project.highlights.length > 0 && (
          <details className="mb-6 rounded-xl border border-slate-800 bg-white/[0.02] px-4 py-3 group/detalhes">
            <summary className="cursor-pointer text-sm font-medium text-sky-400 hover:text-sky-300 flex items-center justify-between gap-2 list-none [&::-webkit-details-marker]:hidden [&::marker]:hidden">
              Detalhes técnicos
              <ChevronDown className="w-4 h-4 shrink-0 transition-transform duration-200 group-open/detalhes:rotate-180" />
            </summary>
            <ul className="mt-3 space-y-2.5 text-sm text-slate-400 leading-relaxed list-disc pl-4">
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </details>
        )}

        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs bg-white/5 text-slate-300 px-3 py-1 rounded-md border border-white/5">
              {tag}
            </span>
          ))}
        </div>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-sky-500 hover:text-sky-400 transition-colors"
        >
          <Github className="w-4 h-4" /> Ver no GitHub
        </a>
      </div>
    </article>
  );
}

export function Projects({ projects, subcategories = [] }: ProjectsProps) {
  const baseId = useId();
  const groups = useMemo(() => organizeSubcategories(projects, subcategories), [projects, subcategories]);
  const [selected, setSelected] = useState(TODOS);
  const showFilters = groups.length > 0;
  const activeGroup = groups.find((group) => group.label === selected);
  const visibleProjects = selected === TODOS || !activeGroup ? projects : activeGroup.projects;
  const description = selected === TODOS ? undefined : activeGroup?.description;

  if (!projects.length) return null;

  const filters = [
    { label: TODOS, count: projects.length, description: undefined as string | undefined },
    ...groups.map((group) => ({ label: group.label, count: group.count, description: group.description })),
  ];

  const onTabKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const index = filters.findIndex((item) => item.label === selected);
    const last = filters.length - 1;
    let next = index;
    if (e.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    else if (e.key === 'ArrowLeft') next = index <= 0 ? last : index - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    const label = filters[next]?.label;
    if (!label) return;
    setSelected(label);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  return (
    <section id="projects" className="py-24 px-6 max-w-5xl 2xl:max-w-7xl w-full border-t border-slate-800/50">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center flex items-center justify-center gap-3">
        <FolderGit2 className="text-sky-500 w-8 h-8" /> Projetos
      </h2>
      <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
        Trabalho com código aberto no GitHub, organizado em subcategorias. Hoje estão os projetos pessoais; outras
        subcategorias entram conforme o portfólio cresce.
      </p>

      {showFilters && (
        <div
          role="tablist"
          aria-label="Subcategorias de projetos"
          onKeyDown={onTabKeyDown}
          className={`flex flex-wrap justify-center gap-2 ${description ? 'mb-4' : 'mb-10'}`}
        >
          {filters.map((item, index) => {
            const isActive = item.label === selected;
            return (
              <button
                key={item.label}
                id={`${baseId}-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`${baseId}-panel`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setSelected(item.label)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  isActive
                    ? 'bg-sky-500/10 text-sky-300 border-sky-500/40'
                    : 'bg-white/[0.02] text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-600'
                }`}
              >
                {item.label}
                <span
                  className={`min-w-5 h-5 px-1.5 rounded-full text-[11px] leading-5 text-center ${
                    isActive ? 'bg-sky-500/20 text-sky-200' : 'bg-white/5 text-slate-400'
                  }`}
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {description && (
        <p className="text-center text-slate-400 text-sm max-w-2xl mx-auto mb-10">{description}</p>
      )}

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={showFilters ? `${baseId}-tab-${filters.findIndex((item) => item.label === selected)}` : undefined}
      >
        <ProjectCardsCarousel resetKey={selected}>
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ProjectCardsCarousel>
      </div>
    </section>
  );
}
