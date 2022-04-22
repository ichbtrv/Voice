import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    testDir: './test',
    webServer: {
        command: 'npm run e2e-server',
        port: 3001
    },
    use: {
        storageState: 'test/config/storageState.json',
        launchOptions: {
            chromiumSandbox: process.env.CI !== 'true' // Sandbox mode is not supported in bitbucket pipelines
        }
    }
};

export default config;
