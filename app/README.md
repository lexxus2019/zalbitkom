# Зал Бит.коМ — сайт группы

React + Spring Boot + PostgreSQL. Публичный сайт, админка, форма связи.

## Структура
```
app/
  docker-compose.yml     # опционально: Postgres в docker
  backend/               # Spring Boot 3.3 / Java 21, Maven
    src/main/resources/application.yml
  frontend/              # Vite + React 18 + TypeScript
    public/img/          # фото группы и логотип
  pgsql/                 # переносной PostgreSQL 18 (local)
  pgdata/                # данные локальной БД
```

## Быстрый старт (Windows, локально)
```
start-dev.ps1            # одна команда: БД + бэкенд + фронт
```
- Сайт:      http://localhost:5173/
- Админка:  http://localhost:5173/admin  (admin / admin123 — смени!)
- API:      http://localhost:8080/api/...

Вручную:
1. БД: `app\pgsql\bin\pg_ctl -D ..\pgdata -o "-p 5432 -c listen_addresses=127.0.0.1" start`
2. Бэкенд: `cd backend && mvn -DskipTests package && java -jar target\zalbit-backend-0.1.0.jar`
3. Фронт: `cd frontend && npm install && npm run dev`

## Механика
- **Миграции**: Liquibase при старте (`backend/src/main/resources/db/changelog/`); сид треков/ссылок — `002-seed.yaml` (только при пустых таблицах).
- **API**:
  - `GET /api/public/site` — треки + ссылки (публично)
  - `POST /api/public/contact` — форма связи
  - `POST /api/admin/login` — JWT (12 ч)
  - `CRUD /api/admin/tracks|links`, `GET/PUT/DELETE /api/admin/messages`, `POST /api/admin/media` (загрузка обложек, до 5 МБ)
  - `GET /uploads/**` — статика загруженных файлов (`./data/uploads`)
- **Админка** — по адресу `/admin`: порядок/названия/ссылки треков, плашки «Новинка», ссылки соцсетей, входящие сообщения со статусами NEW/IN_PROGRESS/DONE.
- **Логин админа** сидируется из env: `ADMIN_USER`/`ADMIN_PASSWORD` (при смене — удалить юзера из таблицы `admin_user` или задать BCrypt-хэш вручную).
- **Бэкап БД**: `app\pgsql\bin\pg_dump -U zalbit -h 127.0.0.1 zalbit > backup.sql`.

## Прод-сборка
1. `cd frontend && npm run build` → `dist/` (отдать любым статик-сервером, либо прокинуть в Spring — см. ниже).
2. `cd backend && mvn -DskipTests package` → один jar.
3. Нужен обратный прокси (Caddy/nginx): `/api` и `/uploads` → 8080, остальное → статика; для SPA — fallback на index.html.

Вариант «один jar» (Spring раздаёт и фронт):
- скопировать `dist/` в `backend/src/main/resources/static/`, добавить fallback-контроллер;
- тогда достаточно `java -jar` + БД.

## Контент-план
- Тексты блока «Что по делу» и состав пока зашиты в `frontend/src/site/` — при росте вынести в БД по той же схеме, что треки.

## Корпоративный прокси
- `frontend/.npmrc` переключает npm на registry.npmjs.org (внутренний Artifactory npm отвечает 503), системный прокси подхватывается из `~/.npmrc`.
- Docker Desktop / Maven используют Artifactory и корп. прокси из своих конфигов.
