'use client';

import Image from 'next/image';
import { Linkedin } from 'lucide-react';
import type { Personal } from '@/types/portfolio';

interface HeroProps {
  personal: Personal;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

export function Hero({ personal, onNavClick }: HeroProps) {
  return (
    <section id="home" className="min-h-[85vh] flex flex-col items-center justify-center text-center p-6 max-w-5xl w-full relative">
      <div className="mb-10 relative group z-10">
        <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-indigo-600 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-[#0a0a0a] shadow-2xl">
          <Image
            src="/imagem-perfil.jpg"
            alt={personal.name}
            width={416}
            height={416}
            quality={95}
            priority
            sizes="(max-width: 768px) 160px, 208px"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
          {personal.name.split(' ').slice(0, 2).join(' ')}
        </span>
        <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-600">
          {personal.name.split(' ').slice(2).join(' ')}
        </span>
      </h1>

      <h2 className="text-xl md:text-2xl text-slate-400 mb-10 max-w-2xl font-light">
        {personal.role}
      </h2>

      <div className="flex flex-wrap justify-center gap-4 mb-14">
        <a
          href="#about"
          onClick={(e) => onNavClick(e, '#about')}
          className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-slate-200 transition-all hover:scale-105 flex items-center gap-2 shadow-xl shadow-white/5"
        >
          Conheça meu trabalho
        </a>
        <a
          href={personal.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0f172a] text-white border border-slate-700 hover:border-sky-500 hover:text-sky-400 px-8 py-3 rounded-full font-semibold transition-all flex items-center gap-2"
        >
          <Linkedin className="w-5 h-5" /> LinkedIn
        </a>
        <a
          href="/Bruno_Augusto_Ramos_Pires.pdf"
          download
          className="bg-transparent text-slate-300 border border-slate-700 hover:bg-slate-800 hover:border-slate-500 px-8 py-3 rounded-full font-semibold transition-all flex items-center gap-2"
        >
          Baixar CV
        </a>
      </div>
    </section>
  );
}
