# Bruno Pires - Meu Portifólio

Portfólio profissional com estrutura modular e componentes separados.

## Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx       # Página principal (composição dos componentes)
│   ├── layout.tsx
│   └── globals.css
├── components/        # Componentes React reutilizáveis
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── Education.tsx
│   ├── Projects.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── data/
│   └── info.json      # Dados centralizados do portfólio
├── types/
│   └── portfolio.ts   # Interfaces TypeScript
└── lib/
    └── getIcon.tsx    # Utilitário de ícones
```

## Tecnologias

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide React (ícones)

## Como rodar

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Variáveis de Ambiente

Copie `.env.example` para `.env.local` e ajuste conforme necessário:

- `NEXT_PUBLIC_FORM_SUBMIT_REDIRECT` - URL de redirecionamento após envio do formulário (FormSubmit)

## Diferenças da versão original

- Componentes extraídos e modulares
- Tipos TypeScript definidos para os dados
- Utilitário `getIcon` em `lib/`
- `.gitignore` e `.env.example` configurados
- `package.json` ajustado (removido `main` desnecessário)
