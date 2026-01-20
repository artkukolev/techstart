# План исправления ошибок

## Исправления

### 1. Исправить утечку памяти в useScrollPosition
**Файл:** `src/hooks/useScrollPosition.ts`
**Проблема:** Flag `ticking` не сбрасывается при размонтировании компонента
**Решение:** Добавить cleanup для сброса флага
**Статус:** ✅ Исправлено

### 2. Исправить stale closure в useIntersectionObserver  
**Файл:** `src/hooks/useIntersectionObserver.ts`
**Проблема:** `hasTriggered` может быть stale из-за неправильной зависимости
**Решение:** Использовать useRef для хранения hasTriggered
**Статус:** ✅ Исправлено

### 3. Добавить обработчик клика на scroll indicator в Hero
**Файл:** `src/components/Hero/Hero.tsx`
**Проблема:** Иконка прокрутки не реагирует на клик
**Решение:** Добавить onClick handler
**Статус:** ✅ Исправлено

### 4. Исправить сброс formError в Contact
**Файл:** `src/components/Contact/Contact.tsx`
**Проблема:** formError не сбрасывается при успешной отправке
**Решение:** Проверено - resetForm уже сбрасывает formError
**Статус:** ✅ Проверено (исправление не требовалось)

### 5. Экспортировать useSmoothScroll из hooks/index.ts
**Файл:** `src/hooks/index.ts`
**Проблема:** useSmoothScroll не экспортируется
**Решение:** Проверено - useSmoothScroll уже экспортируется
**Статус:** ✅ Проверено (исправление не требовалось)

### 6. Исправить устаревшие настройки в tsconfig.json
**Файл:** `tsconfig.json`
**Проблема:** 
- `moduleResolution=node` устарел
- `rootDir` должен быть явно установлен  
**Решение:** Обновить настройки для TypeScript 6.0+
**Статус:** ✅ Исправлено

## Статус

- [x] 1. Исправить утечку памяти в useScrollPosition
- [x] 2. Исправить stale closure в useIntersectionObserver
- [x] 3. Добавить обработчик клика на scroll indicator в Hero
- [x] 4. Исправить сброс formError в Contact
- [x] 5. Экспортировать useSmoothScroll из hooks/index.ts
- [x] 6. Исправить устаревшие настройки в tsconfig.json

## Проверка

- ✅ TypeScript type-check: успешно
- ✅ Production build: успешно

