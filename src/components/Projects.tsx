'use client';

import { useId, useMemo, useState } from 'react';
import { FolderGit2, Github, ChevronDown } from 'lucide-react';
import type { Project, ProjectCategory } from '@/types/portfolio';
import { ProjectCarousel } from '@/components/ProjectCarousel';

interface ProjectsProps {
  projects: Project[];
  categories?: ProjectCategory[];
}

interface SubcategoryGroup {
  label: string | null;
  projects: Project[];
}

interface CategoryGroup {
  label: string;
  description?: string;
  count: number;
  groups: SubcategoryGroup[];
}

const FALLBACK_CATEGORY = 'Outros';

function organizeProjects(projects: Project[], catalog: ProjectCategory[] = []): CategoryGroup[] {
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
    const label = project.category?.trim() || FALLBACK_CATEGORY;
    if (!seen.has(label)) {
      seen.add(label);
      order.push(label);
    }
  }

  return order
    .map((label) => {
      const items = projects.filter((project) => (project.category?.trim() || FALLBACK_CATEGORY) === label);
      const subSeen = new Set<string>();
      const subOrder: (string | null)[] = [];
      for (const project of items) {
        const sub = project.subcategory?.trim() || null;
        const key = sub ?? '';
        if (!subSeen.has(key)) {
          subSeen.add(key);
          subOrder.push(sub);
        }
      }
      return {
        label,
        description: meta.get(label)?.description,
        count: items.length,
        groups: subOrder.map((sub) => ({
          label: sub,
          projects: items.filter((project) => (project.subcategory?.trim() || null) === sub),
        })),
      };
    })
    .filter((category) => category.count > 0);
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative bg-[#0a0a0a] border border-slate-800 rounded-2xl overflow-hidden hover:border-sky-500/50 transition-all duration-300 shadow-xl flex flex-col h-full">
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
          <h4 className="font-bold text-xl text-slate-200 group-hover:text-sky-400 transition-colors">{project.title}</h4>
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

export function Projects({ projects, categories = [] }: ProjectsProps) {
  const baseId = useId();
  const organized = useMemo(() => organizeProjects(projects, categories), [projects, categories]);
  const [selected, setSelected] = useState(organized[0]?.label ?? '');
  const showTabs = organized.length > 1;
  const visible = showTabs ? organized.filter((category) => category.label === selected) : organized;

  if (!organized.length) return null;

  const onTabKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!showTabs) return;
    const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const index = organized.findIndex((category) => category.label === selected);
    const last = organized.length - 1;
    let next = index;
    if (e.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    else if (e.key === 'ArrowLeft') next = index <= 0 ? last : index - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    const label = organized[next]?.label;
    if (!label) return;
    setSelected(label);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  return (
    <section id="projects" className="py-24 px-6 max-w-5xl w-full border-t border-slate-800/50">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center flex items-center justify-center gap-3">
        <FolderGit2 className="text-sky-500 w-8 h-8" /> Projetos
      </h2>
      <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
        Trabalho com código aberto, organizado por categoria. Começo pelos projetos pessoais que desenvolvi no tempo
        livre; novas categorias e subcategorias entram conforme o portfólio cresce.
      </p>

      {showTabs && (
        <div
          role="tablist"
          aria-label="Categorias de projetos"
          onKeyDown={onTabKeyDown}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {organized.map((category, index) => {
            const isActive = category.label === selected;
            return (
              <button
                key={category.label}
                id={`${baseId}-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`${baseId}-panel-${index}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setSelected(category.label)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  isActive
                    ? 'bg-sky-500/10 text-sky-300 border-sky-500/40'
                    : 'bg-white/[0.02] text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-600'
                }`}
              >
                {category.label}
                <span
                  className={`min-w-5 h-5 px-1.5 rounded-full text-[11px] leading-5 text-center ${
                    isActive ? 'bg-sky-500/20 text-sky-200' : 'bg-white/5 text-slate-400'
                  }`}
                >
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {visible.map((category) => {
        const index = organized.findIndex((item) => item.label === category.label);
        return (
          <div
            key={category.label}
            role={showTabs ? 'tabpanel' : undefined}
            id={showTabs ? `${baseId}-panel-${index}` : undefined}
            aria-labelledby={showTabs ? `${baseId}-tab-${index}` : undefined}
            className="space-y-10"
          >
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-slate-100 flex items-center justify-center md:justify-start gap-3">
                {category.label}
                <span className="text-sm font-medium text-slate-400 bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-full">
                  {category.count}
                </span>
              </h3>
              {category.description && <p className="mt-2 text-slate-400 text-sm max-w-2xl mx-auto md:mx-0">{category.description}</p>}
            </div>

            {category.groups.map((group) => (
              <div key={group.label ?? 'sem-subcategoria'} className="space-y-4">
                {group.label && (
                  <p className="text-sm font-semibold tracking-wide text-sky-400/90 uppercase">
                    {group.label}
                  </p>
                )}
                <div className="grid md:grid-cols-2 gap-8">
                  {group.projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </section>
  );
}
