/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // Чистая логика не трогает DOM — хватает node-окружения (быстрее).
    // Если будешь тестировать React-компоненты или DOMMatrix/CameraController,
    // поменяй на 'jsdom' (npm i -D jsdom) или 'happy-dom'.
    environment: 'node',
    // Файлы тестов: *.test.ts / *.test.tsx рядом с кодом в src/.
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
})
