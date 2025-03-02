const fs = require('fs');
const path = require('path');
const cucumberJson = require('wdio-cucumberjs-json-reporter');
const report = require('multiple-cucumber-html-reporter');
const configProperties = require('./resources/config.json');

exports.config = {
    runner: 'local',
    specs: [
        './features/**/*.feature'
    ],
    maxInstances: 1,
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['--disable-gpu',
                `--window-size=${configProperties.windowSize}`,
                ...(configProperties.headless ? ['--headless'] : [])
            ]
        },
        acceptInsecureCerts: true
    }],
    logLevel: configProperties.logLevel,
    baseUrl: configProperties.baseUrl,
    waitforTimeout: configProperties.waitforTimeout,
    connectionRetryTimeout: configProperties.connectionRetryTimeout,
    connectionRetryCount: 3,
    framework: 'cucumber',
    cucumberOpts: {
        require: ['./features/step-definitions/**/*.js'],
        backtrace: false,
        dryRun: false,
        failFast: false,
        format: ['pretty'],
        colors: true,
        snippets: true,
        source: true,
        profile: [],
        strict: false,
        tagExpression: '',
        timeout: 60000
    },
    reporters: [
        'spec',
        ['cucumberjs-json', {
            jsonFolder: './reports/json/',
            language: 'en',
            disableHooks: false,
            disableSteps: false
        }]
    ],
    services: [],
    onPrepare: function (config, capabilities) {
        const jsonDir = path.join(__dirname, 'reports/json');
        const htmlDir = path.join(__dirname, 'reports/html');
        if (fs.existsSync(jsonDir)) {
            fs.rmSync(jsonDir, { recursive: true, force: true });
        }
        if (fs.existsSync(htmlDir)) {
            fs.rmSync(htmlDir, { recursive: true, force: true });
        }
        fs.mkdirSync(jsonDir, { recursive: true });
    },
    onComplete: function (exitCode, config, capabilities, results) {
        report.generate({
            jsonDir: path.join(__dirname, 'reports/json'),
            reportPath: path.join(__dirname, 'reports/html'),
            openReportInBrowser: true,
        });
    },
    afterScenario: async function (world, result) {
        if (!result.passed) {
            console.log('Scenario failed, take screenshot...');
            if (cucumberJson.attach && typeof cucumberJson.attach === 'function') {
                cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
            } else {
                console.warn('this.attach is not available in afterScenario.');
            }
        }
    },
};