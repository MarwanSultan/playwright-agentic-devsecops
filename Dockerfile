FROM node:22.14.0-bookworm-slim AS dependencies

WORKDIR /work
COPY package.json package-lock.json ./
RUN npm ci

FROM mcr.microsoft.com/playwright:v1.63.0-noble AS runner

ENV NODE_ENV=production \
    CI=true \
    HEADLESS=true
WORKDIR /work

COPY --from=dependencies /work/node_modules ./node_modules
COPY --chown=pwuser:pwuser package.json package-lock.json tsconfig.json playwright.config.ts vitest.config.ts .prettierrc.json ./
COPY --chown=pwuser:pwuser api ./api
COPY --chown=pwuser:pwuser config ./config
COPY --chown=pwuser:pwuser data ./data
COPY --chown=pwuser:pwuser fixtures ./fixtures
COPY --chown=pwuser:pwuser pages ./pages
COPY --chown=pwuser:pwuser tests ./tests
COPY --chown=pwuser:pwuser types ./types
COPY --chown=pwuser:pwuser unit ./unit
COPY --chown=pwuser:pwuser utils ./utils
RUN mkdir -p /work/test-results /work/playwright-report \
    && chown -R pwuser:pwuser /work

USER pwuser
CMD ["npm", "test", "--", "--project=chromium"]
