import { defineConfig } from 'cypress'

// Tous les tests sont regroupés sous test/ : unitaires (Vitest) dans test/unit, E2E (Cypress) dans test/e2e.
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'test/e2e/**/*.cy.ts',
    supportFile: 'test/e2e/support/e2e.ts',
    fixturesFolder: 'test/e2e/fixtures',
    screenshotsFolder: 'test/e2e/screenshots',
    videosFolder: 'test/e2e/videos',
    downloadsFolder: 'test/e2e/downloads',
    video: false,
  },
})
