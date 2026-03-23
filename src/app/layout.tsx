import type { Metadata } from 'next';
import './globals.css';
import portfolioData from '@/data/info.json';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://brunopires.dev.br';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Bruno Pires | Desenvolvedor WEB e Analista de CRM',
    template: '%s | Bruno Pires',
  },
  description: 'Portfólio de Bruno Pires - Desenvolvedor WEB e Analista de CRM com mais de 10 anos de experiência. PHP, React, Node.js, Oracle Service Cloud.',
  keywords: ['Bruno Pires', 'Desenvolvedor WEB', 'Analista de CRM', 'Oracle Service Cloud', 'React', 'Next.js', 'PHP', 'Node.js', 'portfólio', 'Santos'],
  authors: [{ name: 'Bruno Pires', url: 'https://brunopires.dev.br' }],
  creator: 'Bruno Pires',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: 'Bruno Pires - Portfólio',
    title: 'Bruno Pires | Desenvolvedor WEB e Analista de CRM',
    description: 'Portfólio profissional - Mais de 10 anos de experiência em PHP, React, Node.js e ecossistema Oracle.',
    images: [{ url: '/imagem-perfil.jpg', width: 416, height: 416, alt: 'Bruno Pires - Desenvolvedor WEB' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bruno Pires | Desenvolvedor WEB e Analista de CRM',
    description: 'Portfólio profissional - Mais de 10 anos em desenvolvimento web e Oracle Service Cloud.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: portfolioData.personal.name,
    jobTitle: portfolioData.personal.role,
    description: portfolioData.personal.summary.split('\n')[0],
    url: SITE_URL,
    sameAs: [portfolioData.personal.linkedin],
    email: portfolioData.personal.email,
    knowsAbout: portfolioData.skills.map((s) => s.name),
  };

  return (
    <html lang="pt-BR">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
