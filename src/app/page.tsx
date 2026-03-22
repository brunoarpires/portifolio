'use client';

import { useState } from 'react';
import portfolioData from '@/data/info.json';
import type { PortfolioData } from '@/types/portfolio';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { ExperienceSection } from '@/components/Experience';
import { Education } from '@/components/Education';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

const data = portfolioData as PortfolioData;

export default function Home() {
  const { personal, experiences, skills, education, courses, projects } = data;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Variável de Controle: Mude para 'true' quando quiser exibir a sessão de Projetos!
  const mostrarProjetos = false;

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const targetElement = document.getElementById(targetId.replace('#', ''));
    if (targetElement) {
      const headerOffset = 100;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#0a0a0a] text-slate-200 overflow-x-hidden selection:bg-sky-500/30">
      {/* Background Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-sky-400/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onNavClick={handleSmoothScroll}
        mostrarProjetos={mostrarProjetos}
      />

      <main className="flex-1 pt-24 flex flex-col items-center">
        <Hero personal={personal} onNavClick={handleSmoothScroll} />
        <About personal={personal} skills={skills} />
        <ExperienceSection experiences={experiences} />
        <Education education={education} courses={courses} />
        {mostrarProjetos && <Projects projects={projects} />}
        <Contact personal={personal} />
      </main>

      <Footer personal={personal} />
    </div>
  );
}
