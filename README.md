# URL Shortener Project

## Описание

Приложение для создания коротких ссылок ссылок на базе NestJS (backend), React (frontend) и PostgreSQL (база данных). Поддерживает prod- и test- режимы через Docker Compose.

---

## Production запуск

1. **Соберите и запустите сервисы:**
   ```bash
   docker compose --profile prod up --build
   ```
   - Поднимутся сервисы: backend, frontend, postgres.
   - Backend будет доступен на порту 3001.
   - Frontend будет доступен на порту 80 (http://localhost/).
   - База данных будет доступна на порту 5431.

2. **Остановка сервисов:**
   ```bash
   docker compose --profile prod down
   ```

---

## Тестовое окружение (e2e)

1. **Запустите тестовую БД и e2e-тесты:**
   ```bash
   docker compose --profile test up --build --abort-on-container-exit
   ```
   - Поднимется только тестовая база данных и контейнер с e2e-тестами.
   - После завершения тестов все сервисы остановятся автоматически.

---

## Переменные окружения

- Для prod и test используются разные базы данных и порты.
- Все параметры подключения к БД задаются через переменные окружения в docker-compose.yml.
- Для e2e-тестов используется отдельная база `3205-test-e2e` на порту 5430.

---

## Структура проекта

- `backend/` — NestJS backend (API, бизнес-логика, работа с БД)
- `frontend/` — React frontend (интерфейс пользователя)
- `docker-compose.yml` — оркестрация сервисов и профилей
