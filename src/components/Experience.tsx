'use client';

import { Briefcase } from 'lucide-react';
import { getIcon } from '@/lib/getIcon';
import type { Experience } from '@/types/portfolio';

interface ExperienceProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceProps) {
  return (
    <section id="experience" className="py-24 px-6 max-w-4xl w-full border-t border-slate-800/50">
      <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center flex items-center justify-center gap-3">
        <Briefcase className="text-sky-500 w-8 h-8" /> Minhas Experiências
      </h2>

      <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0a0a0a] bg-slate-800 text-slate-400 group-hover:text-sky-400 group-hover:bg-sky-900 group-hover:border-sky-400/30 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors z-10">
              {getIcon(exp.iconType, 'w-5 h-5')}
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/[0.02] border border-white/10 p-6 rounded-2xl hover:bg-white/[0.04] hover:border-sky-500/30 transition-all shadow-xl">
              <h3 className="font-bold text-xl text-slate-100 group-hover:text-sky-400 transition-colors mb-2">
                {exp.role}
              </h3>
              <h4 className="text-sky-500 font-semibold mb-3 text-sm">{exp.company}</h4>
              <div className="inline-block px-3 py-1 bg-slate-800/50 rounded-full text-xs text-slate-400 mb-4 border border-slate-700">
                {exp.period}
              </div>
              <p className="text-slate-400 leading-relaxed text-sm whitespace-pre-wrap">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
