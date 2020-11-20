# hsrm sapper demo

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

## Stack
* Wir verwenden [Sapper](https://sapper.svelte.dev), welches auf [Svelte](https://svelte.dev) basiert.
* Als CSS Framwork setzen wir momentan auf [Bulma](https://bulma.io/) (Wichtig: Bulma wird ohne JavaScript ausgeliefert)
* Als Bulma Theme verwenden wir das Theme [Darkly](https://jenil.github.io/bulmaswatch/darkly/) von [Bulmaswatch](https://jenil.github.io/bulmaswatch/)
