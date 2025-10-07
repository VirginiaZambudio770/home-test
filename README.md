# Home Test Automation

Automated test suite for the demo web application `automaticbytes/demo-app`
##Run docker before
Open docker desktop app

## Prerequisites

- Node.js installed (v16+ recommended)
- Docker Desktop
- Internet connection to pull the Docker image

## Run Docker Before Tests

##Pull the docker image containing the web app
docker pull automaticbytes/demo-app

##Run the image
docker run -p 3100:3100 automaticbytes/demo-app

##Verify the app is shown in below url and set it as the base url for the tests. http://localhost:3100

## Install Playwright

npm init -y
npm install -D @playwright/test
npx playwright install

Playwright Configuration

The project uses a centralized configuration playwright.config.js with:

baseURL: http://localhost:3100

Cross-browser testing: Chromium, Firefox, WebKit

Mobile emulation: iPhone 14, Pixel 5

Headless or headed execution

Screenshots and videos on failure

Trace on first retry

## How to run test cases

##Run the test cases with the following command
npx playwright test

##Run tests with selected browser
Available projects: "Chromium", "Firefox", "WebKit"
npx playwright test tests/checkout --project=Chromium

##Run a specific file
npx playwright test tests/checkout/checkout.spec.js
