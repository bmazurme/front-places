# ntlstl.places

Веб-приложение для публикации и просмотра мест (карточек): лента карточек с фото, тегами и лайками, профили пользователей, авторизация через Яндекс OAuth.

- **Demo:** [place.ntlstl.dev](https://place.ntlstl.dev/)
- **Репозиторий:** [github.com/bmazurme/ntlstl.places](https://github.com/bmazurme/ntlstl.places)

### Tech Stack

![React](https://img.shields.io/badge/-React-black?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/-TypeScript-black?style=flat-square&logo=typescript)
![Redux Toolkit](https://img.shields.io/badge/-Redux%20Toolkit-black?style=flat-square&logo=redux)
![Vite](https://img.shields.io/badge/-Vite-black?style=flat-square&logo=vite)
![Jest](https://img.shields.io/badge/-Jest-black?style=flat-square&logo=jest)
![Cypress](https://img.shields.io/badge/-Cypress-black?style=flat-square&logo=cypress)
![Docker](https://img.shields.io/badge/-Docker-black?style=flat-square&logo=docker)

## Возможности

- Лента карточек мест с изображениями, тегами и лайками
- Создание, редактирование и удаление карточек
- Профили пользователей со списком их карточек, редактирование профиля и аватара
- Теги для фильтрации карточек
- Авторизация и регистрация, OAuth через Яндекс
- Тёмная/светлая тема

## Архитектура

React 18 + TypeScript SPA на Vite, состояние — Redux Toolkit (включая RTK Query для запросов к API).

- `src/pages` — страницы, привязанные к маршрутам (`src/app.tsx`, пути из `src/utils/constants.ts`)
- `src/layouts` — логика загрузки данных и состояния для каждой страницы
- `src/components` — функциональные компоненты (карточки, теги, профиль, модалки и т.д.)
- `src/ui` — UI-примитивы
- `src/store` — Redux store, слайсы и RTK Query API-модули (`auth`, `user`, `card`, `file`, `tag`)
- `src/hooks`, `src/hocs`, `src/providers` — общие хуки, HOC-обёртки (включая `withUser` для гейтинга авторизации) и провайдер темы

## Запуск проекта

Требуется Node.js 22.

```bash
npm install
npm run dev
```

Приложение откроется на `http://localhost:3005`.

### Скрипты

| Команда | Описание |
| --- | --- |
| `npm run dev` | запуск дев-сервера Vite (HMR) |
| `npm run build` | продакшен-сборка в `build/` |
| `npm run lint` | ESLint по `./src` |
| `npm run slint` | Stylelint по `.css`-файлам (с автофиксом) |
| `npm test` | юнит-тесты на Jest |
| `npm run test:cyp` | Cypress в интерактивном режиме |
| `npm run cy:run` | Cypress в headless-режиме (Chrome) |

### Переменные окружения

Используются `*.env.[mode]`-файлы (загружаются через `loadEnv` и инлайнятся в сборку):

- `API_HOST` — адрес API-бэкенда
- `HOST` — базовый адрес фронтенда
- `YA_ENDPOINT` — endpoint для Яндекс OAuth

## Деплой

Образ собирается через `Dockerfile` и публикуется в Yandex Cloud Container Registry при пуше в `main` (см. `.github/workflows/`). Раздача статики и проксирование API настроены в `nginx/`.
