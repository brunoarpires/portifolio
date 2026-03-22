# Guia: Integrar projeto ao GitHub

## Passo 1: Instalar o Git (se necessário)

1. Baixe o Git em: https://git-scm.com/download/win
2. Execute o instalador e use as opções padrão
3. **Reinicie o terminal** (ou o Cursor) após a instalação

---

## Passo 2: Configurar o Git (primeira vez)

Abra o terminal e execute:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```

Use o mesmo e-mail da sua conta GitHub.

---

## Passo 3: Inicializar o repositório local

No terminal, dentro da pasta do projeto:

```bash
cd c:\Projetos\Bruno_Pires_DEV

git init
git add .
git commit -m "Initial commit: portfólio Next.js"
```

---

## Passo 4: Criar repositório no GitHub

1. Acesse https://github.com/new
2. **Repository name:** `meu-portfolio` (ou outro nome)
3. **Description:** Portfólio profissional - Bruno Pires
4. Escolha **Public**
5. **NÃO** marque "Add a README" (o projeto já tem arquivos)
6. Clique em **Create repository**

---

## Passo 5: Conectar e enviar ao GitHub

Depois de criar o repositório em https://github.com/new, execute:

```bash
git remote add origin https://github.com/brunoarpires/meu-portfolio.git
git branch -M main
git push -u origin main
```

> Se o repositório tiver outro nome, altere `meu-portfolio` na URL.

---

## Próximos commits (depois de alterações)

```bash
git add .
git commit -m "Descrição da alteração"
git push
```
