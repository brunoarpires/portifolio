import type { Personal } from '@/types/portfolio';

interface FooterProps {
  personal: Personal;
}

export function Footer({ personal }: FooterProps) {
  return (
    <footer className="py-8 text-center border-t border-white/5 text-slate-600 bg-[#050505]">
      <p className="text-sm">
        Feito com <span className="text-sky-500">♥</span> em Next.js & TailwindCSS por{' '}
        {personal.name.split(' ')[0]} {personal.name.split(' ').slice(-1)[0]}.<br />© {new Date().getFullYear()} Todos os direitos reservados.
      </p>
    </footer>
  );
}
