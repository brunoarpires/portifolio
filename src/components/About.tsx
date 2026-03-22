'use client';

import { Code2 } from 'lucide-react';
import { getIcon } from '@/lib/getIcon';
import type { Personal, Skill } from '@/types/portfolio';

interface AboutProps {
  personal: Personal;
  skills: Skill[];
}

export function About({ personal, skills }: AboutProps) {
  const renderSummary = () => {
    return personal.summary.split('\n').map((paragraph: string, idx: number) => (
      <p key={idx} className="text-lg text-slate-400 leading-relaxed mb-6">
        {paragraph}
      </p>
    ));
  };

  return (
    <section id="about" className="py-24 px-6 max-w-5xl w-full">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
            <Code2 className="text-sky-500 w-8 h-8" /> Sobre Mim
          </h2>
          {renderSummary()}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="bg-white/[0.02] border border-white/5 p-4 rounded-xl hover:bg-white/[0.05] hover:border-sky-500/30 transition-all flex items-center gap-3 group"
            >
              <div className="bg-sky-500/10 p-2 rounded-lg text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                {getIcon(skill.iconType, 'w-4 h-4')}
              </div>
              <span className="font-medium text-sm text-slate-300 group-hover:text-white transition-colors">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
