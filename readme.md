# checkcortiez

## Description

checkcortiez is a checkout bot designed for the Cortiez website. It uses Puppeteer and Puppeteer Extra with the Stealth plugin to automate the process of finding a product, adding it to the cart, and filling in the checkout details.

## Features

-   Automated product search
-   Intelligent product selection using string similarity
-   Automated checkout process
-   Stealth plugin for bypassing bot detection

## Installation

1.  Clone the repository:

    ```sh
    git clone https://github.com/yawdjan/checkcortiez.git
    ```

2.  Navigate to the project directory:

    ```sh
    cd checkcortiez
    ```

3.  Install the dependencies:

    ```sh
    npm install
    ```

## Usage

1.  Configure the bot:

    *   Modify the `target_name` in the [`x_cc`](CortF.js) constructor in [index.js](index.js) to match the desired product name.
    *   Update the credit card and address details in the [`x_cc`](CortF.js) constructor in [index.js](index.js).
    *   Adjust the `findProducts` function call in [index.js](index.js) with a few letters of the product name.

2.  Run the bot:

    ```sh
    node index.js
    ```

## Dependencies

-   [puppeteer-core](https://www.npmjs.com/package/puppeteer-core): A Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol.
-   [puppeteer-extra](https://www.npmjs.com/package/puppeteer-extra): A toolkit for puppeteer.
-   [puppeteer-extra-plugin-stealth](https://www.npmjs.com/package/puppeteer-extra-plugin-stealth): A plugin for puppeteer-extra that adds stealth capabilities.
-   [string-similarity](https://www.npmjs.com/package/string-similarity): A library to compare the similarity between two strings.

## Configuration

The following configurations can be adjusted in [index.js](index.js):

-   `executablePath`: Path to the Chrome executable.
-   `userDataDir`: Chrome user data directory.
-   `headless`: Whether to run Chrome in headless mode.
-   `target_name`: The target product name for the bot to search.
-   Credit card and address details in the [`x_cc`](CortF.js) constructor.

## Troubleshooting

-   If the bot is not finding the product, try adjusting the `target_name` and the search term in the `findProducts` function.
-   If the bot is being detected, ensure that the `puppeteer-extra-plugin-stealth` plugin is correctly configured.

`puppeteer fond of messing with inputs but not enought time to use selenium so check card number and address well then just click button again to process evrything else will still run`

## License

ISC