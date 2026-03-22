'use client';

import { GraduationCap, Award } from 'lucide-react';
import type { Education as EducationType, Course } from '@/types/portfolio';

interface EducationProps {
  education: EducationType[];
  courses: Course[];
}

export function Education({ education, courses }: EducationProps) {
  return (
    <section id="education" className="py-24 px-6 max-w-4xl w-full border-t border-slate-800/50">
      <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center flex items-center justify-center gap-3">
        <GraduationCap className="text-sky-500 w-8 h-8" /> Formação Acadêmica
      </h2>

      <div className="space-y-12 mb-20 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
        {education.map((edu) => (
          <div
            key={edu.id}
            className="relative flex items-center justify-between md:justify-normal md:even:flex-row-reverse group is-active"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0a0a0a] bg-slate-800 text-slate-400 group-hover:text-sky-400 group-hover:bg-sky-900 group-hover:border-sky-400/30 shadow shrink-0 md:order-1 md:group-even:-translate-x-1/2 md:group-odd:translate-x-1/2 transition-colors z-10">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/[0.02] border border-white/10 p-6 rounded-2xl hover:bg-white/[0.04] hover:border-sky-500/30 transition-all shadow-xl">
              <h3 className="font-bold text-xl text-slate-100 group-hover:text-sky-400 transition-colors mb-2">
                {edu.course}
              </h3>
              <h4 className="text-sky-500 font-semibold mb-3 text-sm">{edu.institution}</h4>
              <div className="inline-block px-3 py-1 bg-slate-800/50 rounded-full text-xs text-slate-400 mb-2 border border-slate-700">
                {edu.period}
              </div>
              <p className="text-slate-400 leading-relaxed text-sm font-medium mt-1">
                Status: <span className="text-emerald-400">{edu.status}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-bold mb-10 text-center flex items-center justify-center gap-3 text-slate-300">
        <Award className="text-sky-500 w-6 h-6" /> Cursos Complementares
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white/[0.02] border border-white/5 p-5 rounded-xl hover:bg-white/[0.05] hover:border-sky-500/30 transition-all"
          >
            <h4 className="text-md font-bold text-slate-200 mb-1">{course.course}</h4>
            <div className="text-sky-500 font-medium text-sm mb-3 opacity-90">{course.institution}</div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="bg-slate-800/80 px-2 py-1 rounded text-slate-400 border border-slate-700">
                {course.duration}
              </span>
              <span className="text-emerald-500 font-medium tracking-wide flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-emerald-500 before:rounded-full before:mr-1.5">
                {course.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
