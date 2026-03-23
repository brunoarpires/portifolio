# Deploy no Vercel - Passo a Passo

## Para ter a URL brunopires.vercel.app

### Passo 1: Importar o projeto
Na tela "Deploy your first project":
- Clique em **Import Project** (ou **Add New...** → **Project**)

### Passo 2: Conectar o GitHub (se pedir)
- Escolha **GitHub** como provedor
- Autorize o acesso ao repositório **portifolio**

### Passo 3: Configurar o projeto
Na tela de importação do repositório `brunoarpires/portifolio`:

1. **Project Name** – altere para: **`brunopires`**
   - Assim a URL será: `brunopires.vercel.app`
   - Se não vir esse campo, use "Configure Project" ou "Edit" para expor as opções

2. **Framework Preset:** Next.js (detectado automaticamente)

3. Deixe as demais opções padrão e clique em **Deploy**

### Passo 4: Aguardar o deploy
- O build leva 1–2 minutos
- Ao concluir, acesse: **https://brunopires.vercel.app**

### Passo 5 (alternativa): Renomear depois
Se o projeto foi criado com outro nome:
- Vá em **Settings** → **General** → **Project Name**
- Altere para **brunopires** e salve

---

## Opção 2: Via terminal (Vercel CLI)

### 1. Login (primeira vez)
```bash
npx vercel login
```
- Abrirá o navegador para você entrar na conta Vercel
- Use **Continue with GitHub** e autorize

### 2. Deploy
```bash
cd c:\Projetos\Bruno_Pires_DEV
npx vercel
```

### 3. Responder as perguntas
- **Set up and deploy?** → **Y** (Yes)
- **Which scope?** → selecione **brunoarpires**
- **Link to existing project?** → **N** (No)
- **What's your project's name?** → **brunopires**
- **In which directory is your code located?** → **./** (Enter)

### 4. Resultado
- O deploy será feito e você receberá a URL: **https://brunopires.vercel.app**

### Deploy em produção
Após o primeiro deploy (preview), para ir para produção:
```bash
npx vercel --prod
```

---

## Atualizações futuras

Com a integração via GitHub, cada `git push` para o repositório **portifolio** fará um novo deploy automático na Vercel.

---

## Configurar domínio personalizado (brunopires.dev.br)

### 1. Adicionar domínio na Vercel (via terminal)

```bash
cd c:\Projetos\Bruno_Pires_DEV
npx vercel domains add brunopires.dev.br
```

### 2. Configurar DNS no Registro.br

**Opção A – Adicionar registro A (recomendado)**

1. No Registro.br, acesse o domínio **brunopires.dev.br**
2. Vá em **Registros DNS** / **Zona DNS** / **Editar zona**
3. Adicione um novo registro:
   - **Tipo:** A
   - **Nome:** @ (ou vazio para o domínio principal)
   - **Destino/Valor:** `76.76.21.21`
   - **TTL:** 3600
4. Salve as alterações

**Opção B – Usar servidores DNS da Vercel**

1. Em **ALTERAR SERVIDORES DNS**, preencha:
   - **Servidor 1:** `ns1.vercel-dns.com`
   - **Servidor 2:** `ns2.vercel-dns.com`
2. Clique em **SALVAR ALTERAÇÕES**

### 3. Aguardar propagação

A propagação DNS pode levar de 5 minutos a 48 horas. Depois, acesse: **https://brunopires.dev.br**
