# Frontend

## Installation
* Install NodeJS (without the C / C++ tools if you are asked for them)
* Check if node and npm are installed by running `node -v` and `npm -v` in the command line
* Clone this repository: `git clone https://github.com/HSRM-Vegetables/myfoodcoop-frontend.git`
* Change to the new directory: `cd myfoodcoop-frontend`
* Install dependencies: `npm install`
* Launch the dev environment: `npm run dev`
* Open your browser and go to: `http://localhost:3000`

## Note
* When you edit a file (e.g. `src/routes/index.svelte`) and save it, you should see your browser reload directly.

## Code linting
* Eslint: `npm run lint`. Linted all javascript files as well as the javascript part in the svelte files
* Prettier: `npm run format`. Formats the svelte files, especially the HTML in them.

## Stack
* We use [Sapper](https://sapper.svelte.dev), which is based on [Svelte](https://svelte.dev).
* As CSS framework we use [Bulma](https://bulma.io/), which works without JavaScript.
* As icon library we use [MaterialDesignIcons](https://materialdesignicons.com/).

## Deployment
* The environment variable `BACKEND_API_URL` should be set to the value of the backend url. Be sure that the value of this enviroment variable does **not** contain a trailing `/`

## Customization
There are several ways to customize the look and feel of this webapp.
* In `Nav.svelte` adjust the import path of `logo` to your custom logo, which needs to be placed in `src/node_modules/images`
* You can adjust the default certificates for stock in `src/scripts/stock/CertificateLogos.js`. You can add and remove certificates. You will need to have a large and a small image for each certificate you provide. The images you want to import in this file must be in `src/node_modules/images/certificates`
* In `src/scripts/Config.js` you can adjust a few settings. Primarily you can put a link to your legal notice. If this link is empty, the legal notice will not be displayed.
* You can additionally change the name of the app `src/scripts/Config.js`.
* The favicons were generated with [realfavicongenerator](https://realfavicongenerator.net/). Once you download your favicons from there you just need to extract its content to the `static` folder in the root directory. You should not place the generated `site.webmanifest` in this folder. Just ignore this file.
* You can customize the `static/manifest.json` in order to change the name of the app, which can be installed on mobile phones.
