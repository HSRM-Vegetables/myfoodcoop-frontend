# Frontend

## Installation
* Installiere dir NodeJS (Ohne die C / C++ Tools falls du in der Installation danach gefragt wirst)
* Gib Testweise mal nacheinander `node` und `npm` in eine Kommandozeile ein. Bei beiden sollte ein Rückmeldung kommen, die dir zeigt, dass die beiden Tools installiert sind!
* Clone das Repository hier.
* Gehe in den entsprechend Ordner, vermutlich `cd myfoodcoop-frontend`
* Installiere alle Abhängigkeiten mit `npm install`
* Starte die Dev-Umgebung: `npm run dev`
* Öffne deine Browser und rufe: `http://localhost:3000` auf

## Hinweise
* Du kannst zB. mal die Datei `src/routes/index.svelte` abändern und die Datei speichern. Anschließend solltest du sehen wie sich dein Browser gleich refresht.
* Ich habe in verschieden Ordnern `Readme.md`'s verteilt. Lest die euch bei Gelegenheit mal durch.

## Code linting
* Eslint: `npm run lint`. Linted alle Javascript-Dateien sowie den Javascript Part in den Svelte Dateien
* Prettier: `npm run format`. Formatiert die Svelte-Dateien, vorallem das HTML darin.

## Stack
* Wir verwenden [Sapper](https://sapper.svelte.dev), welches auf [Svelte](https://svelte.dev) basiert.
* Als CSS Framwork setzen wir momentan auf [Bulma](https://bulma.io/) (Wichtig: Bulma wird ohne JavaScript ausgeliefert)
* Als Icon Library benutzen wir [MaterialDesignIcons](https://materialdesignicons.com/). Dort kannst du auch nach neuen Icons suchen.

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
