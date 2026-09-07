import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['unit/**/*.spec.ts'],
    globals: true,
    reporters: ['default', 'junit'],
    outputFile: {
      junit: 'test-results/unit-junit.xml',
    },
  },
});
