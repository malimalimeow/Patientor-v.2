/// <reference types="node" />
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './',
  timeout: 30000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries:  2 ,
  workers:  1 ,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3003',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run start:test', 
    url: 'http://localhost:3003/api/ping', 
    reuseExistingServer: !process.env.CI,
    env: {
      NODE_ENV: 'test', 
    },
  },
});
