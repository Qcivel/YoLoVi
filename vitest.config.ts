import { defineConfig } from 'vitest/config'

// Tests unitaires : logique pure (validation, construction du mail) et handler API avec dépendances mockées.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/unit/**/*.spec.ts'],
  },
})
