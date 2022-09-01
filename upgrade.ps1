Write-Host ""
Write-Host "Pulling the latest:"  -ForegroundColor Green
git pull

if(git status --porcelain | Where-Object {$_ -match '^\?\?'}){
    throw "Untracked files exist"
    exit 
} 
elseif(git status --porcelain | Where-Object {$_ -notmatch '^\?\?'}) {
    throw "Uncommitted changes"
}

Push-Location packages


$dir = dir .
$c = $dir.count
$c += 1

foreach ($d in $dir){

    $i = $dir.IndexOf($d)
    $i += 1
    
    Push-Location $d
    Write-Host ""
    Write-Host "($i/$c) Upgrading ste-events:" -ForegroundColor Yellow
    npx npm-check-updates -u
    npm install
    npm audit fix
    Pop-Location
}

Pop-Location

Write-Host ""
Write-Host "($c/$c) Upgrading root" -ForegroundColor Yellow

npx npm-check-updates -u
npm install
npm audit fix

Write-Host ""
Write-Host "Building & testing:" -ForegroundColor Green

npm install
npm run build
npm test

Write-Host ""
Write-Host "Commit to Git" -ForegroundColor Yellow

git add .
git commit -m "Packages upgrade" -ForegroundColor Green
git push

Write-Host "" -ForegroundColor Yellow
Write-Host "Publish" -ForegroundColor Yellow
npm run make

Write-Host ""
Write-Host "Ready!" -ForegroundColor Green