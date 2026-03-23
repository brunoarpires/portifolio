'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Briefcase, User, Code2, GraduationCap, FolderGit2, Menu, X } from 'lucide-react';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
  mostrarProjetos: boolean;
}

const navLinks = [
  { name: 'Início', href: '#home', icon: <User className="w-5 h-5 shrink-0" /> },
  { name: 'Sobre', href: '#about', icon: <Code2 className="w-5 h-5 shrink-0" /> },
  { name: 'Experiência', href: '#experience', icon: <Briefcase className="w-5 h-5 shrink-0" /> },
  { name: 'Formação', href: '#education', icon: <GraduationCap className="w-5 h-5 shrink-0" /> },
];

export function Header({ isMobileMenuOpen, onMobileMenuToggle, onNavClick, mostrarProjetos }: HeaderProps) {
  // Bloquear scroll do body quando menu mobile está aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const mobileMenuOverlay = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navegação"
      className={`fixed inset-0 z-[9999] bg-[#0a0a0a] md:hidden transition-opacity duration-300 ease-out ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}
    >
      {/* Overlay de fundo sólido - cobre todo o conteúdo */}
      <div
        className="absolute inset-0 bg-[#0a0a0a] backdrop-blur-xl"
        onClick={onMobileMenuToggle}
        aria-hidden="true"
      />
      {/* Conteúdo do menu - acima do overlay */}
      <div className="relative z-10 flex flex-col min-h-full">
        {/* Barra superior com logo e botão fechar - sempre visível e clicável */}
        <div className="flex justify-between items-center p-5 border-b border-white/10 shrink-0">
          <span className="text-xl font-bold tracking-tighter text-white">
            BRUNO<span className="text-sky-500">PIRES</span>
          </span>
          <button
            onClick={onMobileMenuToggle}
            className="p-2 -m-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Fechar menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col flex-1 overflow-y-auto py-6 px-6" style={{ paddingBottom: 'env(safe-area-inset-bottom, 1.5rem)' }}>
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => onNavClick(e, link.href)}
                className="flex items-center gap-4 py-4 px-4 rounded-xl text-lg text-slate-300 hover:bg-white/5 hover:text-sky-400 font-medium transition-colors active:bg-white/10 border-b border-white/5 last:border-b-0"
              >
                {link.icon} {link.name}
              </a>
            ))}
            {mostrarProjetos && (
              <a
                href="#projects"
                onClick={(e) => onNavClick(e, '#projects')}
                className="flex items-center gap-4 py-4 px-4 rounded-xl text-lg text-slate-300 hover:bg-white/5 hover:text-sky-400 font-medium transition-colors active:bg-white/10 border-b border-white/5"
              >
                <FolderGit2 className="w-5 h-5 shrink-0" /> Projetos
              </a>
            )}
          </div>
          <a
            href="#contato"
            onClick={(e) => onNavClick(e, '#contato')}
            className="mt-6 py-4 px-6 rounded-2xl bg-sky-500 text-white text-center font-bold text-lg hover:bg-sky-400 active:bg-sky-600 transition-all shadow-[0_0_24px_rgba(14,165,233,0.3)]"
          >
            Entrar em Contato
          </a>
        </nav>
      </div>
    </div>
  );

  return (
    <>
      <header className="fixed top-0 w-full p-5 bg-[#0a0a0a]/70 backdrop-blur-xl z-50 border-b border-white/5 transition-all">
        <nav className="flex justify-between items-center max-w-6xl mx-auto px-4">
          <div className="text-xl font-bold tracking-tighter text-white">
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
            className="md:hidden text-slate-300 hover:text-white p-2 -m-2"
            onClick={onMobileMenuToggle}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu - renderizado via Portal fora do header para evitar conflitos de z-index */}
      {typeof document !== 'undefined' &&
        createPortal(mobileMenuOverlay, document.body)}
    </>
  );
}
