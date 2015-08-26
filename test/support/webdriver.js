/* @flow */

"use strict";

import Webdriver from 'selenium-webdriver';
import http from 'iso-http';

export async function seleniumBrowser(driver: Webdriver.WebDriver): Object {
    var wnd = new Webdriver.WebDriver.Window(driver);
    try {
        var {width, height} = await wnd.getSize();
    } catch (e) {
        // Width and height aren't supported on android
        width = 0;
        height = 0;
    }

    var capabilities = await driver.getCapabilities();
    var res = capabilities.caps_;
    res.version = res.version || res.platformVersion;
    res.width = width;

    res.height = height;
    return res;
};

export function executeInFlow(fn: Function, done: Function): void {
    Webdriver.promise.controlFlow().execute(fn).then(function() {
        done();
    }, done);
}

export function gotoUrl(driver: Webdriver.WebDriver, url: string): Promise {
    var port = process.env.PORT || 8000;
    return driver.get(`http://localhost:${port}${url}`);
}

export default function webDriverInstance(): Webdriver.WebDriver {
    var branch = process.env.TRAVIS_BRANCH || "Manual";
    var baseCaps: Webdriver.Capabilities = {
        username: process.env.SAUCE_USERNAME,
        accessKey: process.env.SAUCE_ACCESS_KEY,
        name: `Ask Izzy ${branch} ${process.env.TRAVIS_PULL_REQUEST || ""}`,
        tags: [
            process.env.TRAVIS_PULL_REQUEST || "Manual",
            branch,
        ],
        screenResolution: "1024x768",
        captureHtml: true,
        timeZone: "Melbourne",
        public: "public",
        build: process.env.TRAVIS_BUILD_NUMBER || "Manual",
        tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
    };

    if (process.env.SELENIUM_DEVICE) {
        baseCaps.appiumVersion = "1.4.10";
        baseCaps.deviceName = process.env.SELENIUM_DEVICE;

        // From selenium-webdriver - we need to
        // fill in some extra fields for appium
        var browser = process.env.SELENIUM_BROWSER.split(/:/, 3);
        var _;
        /* flow:disable unsupported by flow */
        [_, baseCaps.platformVersion, baseCaps.platformName] = browser;

        baseCaps.emulator = true;
    }

    if (process.env.SELENIUM_ORIENTATION) {
        baseCaps.deviceOrientation = process.env.SELENIUM_ORIENTATION;
    }

    var driver = new Webdriver.Builder()
        /* These are used by Sauce Labs
         * You should also pass SELENIUM_REMOTE_URL to connect
         * via Selenium Grid */
        .withCapabilities(baseCaps)
        /* This is the default. Overridden by SELENIUM_BROWSER */
        .forBrowser('firefox')
        .build();

    driver.manage().timeouts().implicitlyWait(10000);

    driver.reportError = function() {
        if (!process.env.SAUCE_USERNAME) {
            return;
        }

        var auth = process.env.SAUCE_AUTH_HEADER;
        var path = `/rest/v1/ask_izzy/jobs/${driver.session_.value_.id_}`;
        var url = `https://saucelabs.com${path}`;

        var requestOptions = {
            url: url,
            method: 'PUT',
            headers: {Authorization: "Basic " + auth},
            data: JSON.stringify({passed: false}),
        };
        console.log(requestOptions);
        try {

        http.request(requestOptions, function(response) {
            console.log(response);
            console.log(arguments);
        });
        } catch (e) {
            console.log("wut");
            console.log(e);
        }
        console.log("ok then")
    }
    return driver;
}
