# PowerShell script to push BungoEats to GitHub

Write-Host "\n🚀 Pushing BungoEats to GitHub..." -ForegroundColor Cyan

# Navigate to project directory
Set-Location "C:\Users\HP\Documents\BungoEats_Delivery_System"

# Initialize git if not already initialized
if (-not (Test-Path ".git")) {
    Write-Host "\n📦 Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✓ Git initialized" -ForegroundColor Green
} else {
    Write-Host "\n✓ Git already initialized" -ForegroundColor Green
}

# Add remote if not exists
$remoteExists = git remote | Select-String "origin"
if (-not $remoteExists) {
    Write-Host "\n🔗 Adding GitHub remote..." -ForegroundColor Yellow
    git remote add origin https://github.com/thirteenthesaint/BungoEats-Delivery.git
    Write-Host "✓ Remote added" -ForegroundColor Green
} else {
    Write-Host "\n✓ Remote already exists" -ForegroundColor Green
}

# Add all files
Write-Host "\n📝 Adding files to git..." -ForegroundColor Yellow
git add .
Write-Host "✓ Files added" -ForegroundColor Green

# Commit
Write-Host "\n💾 Creating commit..." -ForegroundColor Yellow
git commit -m "Complete BungoEats delivery system with SnackIt integration"
Write-Host "✓ Commit created" -ForegroundColor Green

# Push to GitHub
Write-Host "\n⬆️  Pushing to GitHub..." -ForegroundColor Yellow
git branch -M main
git push -u origin main --force

Write-Host "\n✅ Successfully pushed to GitHub!" -ForegroundColor Green
Write-Host "\n🔗 Repository: https://github.com/thirteenthesaint/BungoEats-Delivery" -ForegroundColor Cyan
Write-Host "\n" 
