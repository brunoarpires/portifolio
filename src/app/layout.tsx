import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bruno Augusto Ramos Pires | Portfólio',
  description: 'Portfólio de Bruno Pires, Desenvolvedor WEB e Analista de CRM.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
