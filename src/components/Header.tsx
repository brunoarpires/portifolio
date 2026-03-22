'use client';

import { Briefcase, User, Code2, GraduationCap, FolderGit2, Menu, X } from 'lucide-react';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
  mostrarProjetos: boolean;
}

const navLinks = [
  { name: 'Início', href: '#home', icon: <User className="w-4 h-4" /> },
  { name: 'Sobre', href: '#about', icon: <Code2 className="w-4 h-4" /> },
  { name: 'Experiência', href: '#experience', icon: <Briefcase className="w-4 h-4" /> },
  { name: 'Formação', href: '#education', icon: <GraduationCap className="w-4 h-4" /> },
];

export function Header({ isMobileMenuOpen, onMobileMenuToggle, onNavClick, mostrarProjetos }: HeaderProps) {
  return (
    <header className="fixed top-0 w-full p-5 bg-[#0a0a0a]/70 backdrop-blur-xl z-50 border-b border-white/5 transition-all">
      <nav className="flex justify-between items-center max-w-6xl mx-auto px-4">
        <div className="text-xl font-bold tracking-tighter text-white z-50">
          BRUNO<span className="text-sky-500">PIRES</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => onNavClick(e, link.href)}
              className="flex items-center gap-2 text-slate-400 hover:text-sky-400 font-medium text-sm transition-colors uppercase tracking-wider"
            >
              {link.icon} {link.name}
            </a>
          ))}

          {mostrarProjetos && (
            <a
              href="#projects"
              onClick={(e) => onNavClick(e, '#projects')}
              className="flex items-center gap-2 text-slate-400 hover:text-sky-400 font-medium text-sm transition-colors uppercase tracking-wider"
            >
              <FolderGit2 className="w-4 h-4" /> Projetos
            </a>
          )}
        </div>
        <div className="hidden md:block">
          <a
            href="#contato"
            onClick={(e) => onNavClick(e, '#contato')}
            className="bg-sky-500/10 text-sky-400 hover:bg-sky-500 hover:text-white px-5 py-2 rounded-full font-medium text-sm border border-sky-500/20 transition-all"
          >
            Contato
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-300 hover:text-white z-50 p-2"
          onClick={onMobileMenuToggle}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Dropdown Nav */}
      <div
        className={`fixed inset-0 bg-[#0a0a0a]/95 backdrop-blur-3xl z-40 transition-transform duration-300 ease-in-out md:hidden flex flex-col items-center justify-center gap-8 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={(e) => onNavClick(e, link.href)}
            className="flex items-center gap-3 text-2xl text-slate-300 hover:text-sky-400 font-medium transition-colors"
          >
            {link.icon} {link.name}
          </a>
        ))}
        <a
          href="#contato"
          onClick={(e) => onNavClick(e, '#contato')}
          className="mt-4 bg-sky-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-sky-400 transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)]"
        >
          Entrar em Contato
        </a>
      </div>
    </header>
  );
}
