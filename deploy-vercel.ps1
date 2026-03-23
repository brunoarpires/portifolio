# Script de deploy na Vercel
# Execute no PowerShell dentro da pasta do projeto

Write-Host "=== Deploy no Vercel ===" -ForegroundColor Cyan
Write-Host ""

# Login (primeira vez - abrirá o navegador)
Write-Host "1. Fazendo login na Vercel..." -ForegroundColor Yellow
npx vercel login

if ($LASTEXITCODE -ne 0) {
    Write-Host "Login cancelado ou falhou. Execute novamente quando estiver logado." -ForegroundColor Red
    exit 1
}

# Deploy
Write-Host ""
Write-Host "2. Iniciando deploy..." -ForegroundColor Yellow
npx vercel --prod

Write-Host ""
Write-Host "Deploy concluído! Acesse: https://brunopires.vercel.app" -ForegroundColor Green
