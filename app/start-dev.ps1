$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

$pg = Join-Path $root 'pgsql\bin\pg_ctl.exe'
if (-not (Test-Path $pg)) { Write-Host "нет app\pgsql — установи/распакуй PostgreSQL в app\pgsql"; exit 1 }
if (-not (Test-Path (Join-Path $root 'pgdata\PG_VERSION'))) {
  Write-Host "инициализация кластера..."
  "zalbit" | Set-Content "$env:TEMP\zalbit-pw.txt" -Encoding ASCII -NoNewline
  & (Join-Path $root 'pgsql\bin\initdb.exe') -D (Join-Path $root 'pgdata') -U zalbit --pwfile="$env:TEMP\zalbit-pw.txt" -E UTF8 --locale=C | Out-Null
  & $pg -D (Join-Path $root 'pgdata') -o "-p 5432 -c listen_addresses=127.0.0.1" -l "$root\pg.log" start | Out-Null
  Start-Sleep 3
  $env:PGPASSWORD = 'zalbit'
  & (Join-Path $root 'pgsql\bin\psql.exe') -U zalbit -h 127.0.0.1 -d postgres -c "create database zalbit" | Out-Null
} else {
  & $pg -D (Join-Path $root 'pgdata') -o "-p 5432 -c listen_addresses=127.0.0.1" -l "$root\pg.log" start | Out-Null
}
Write-Host "Postgres запущен"

$jar = Join-Path $root 'backend\target\zalbit-backend-0.1.0.jar'
if (-not (Test-Path $jar)) {
  Write-Host "сборка бэкенда (mvn package)..."
  Push-Location (Join-Path $root 'backend'); mvn -q -DskipTests package; Pop-Location
}
Start-Process java -ArgumentList '-jar', $jar -WindowStyle Hidden
Write-Host "бэкенд: http://localhost:8080"

Push-Location (Join-Path $root 'frontend')
if (-not (Test-Path node_modules)) { npm install }
Write-Host "фронт:  http://localhost:5173  (админка: /admin)"
npm run dev
Pop-Location
