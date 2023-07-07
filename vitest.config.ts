import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    globals: true,
    includeSource: ['helper/**/*.{js, ts}']
  },
})