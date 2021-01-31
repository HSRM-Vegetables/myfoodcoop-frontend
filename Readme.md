# Frontend

## Installation
* Installiere dir NodeJS (Ohne die C / C++ Tools falls du in der Installation danach gefragt wirst)
* Gib Testweise mal nacheinander `node` und `npm` in eine Kommandozeile ein. Bei beiden sollte ein Rückmeldung kommen, die dir zeigt, dass die beiden Tools installiert sind!
* Clone das Repository hier.
* Gehe in den entsprechend Ordner, vermutlich `cd stadgemuese-frontend`
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
* Die Umgebungsvariable `BACKEND_API_URL` muss auf die URL des Backends gesetzt werden.
