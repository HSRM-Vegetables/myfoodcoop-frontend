# routes

Das ist der Ordner aus welchem die Routen generiert werden.

Doch was sind die Routen? Kurz: Die URLs. Lang: Beschreiben die einzelnen Unterseiten unserer App.

## Besonderheiten

### index.svelte
Eine Datei die den Namen `index.svelte` hat wird jewals als die Hauptdatei in dem Ordner angesehen. Ihr ruft diese Datei also mit `/` auf. Befindet sich die `index.svelte` in einem Unterverzeichniss ist eure Route folgendermaßen `/unterverzeichniss/`

### _irgendwas.svelte
Diese Dateien werde von Sapper nicht als Routen erkannt und quasi ignoriert. Deswegen heißt die Readme in diesem Ordner auch `_Readme.md`, weil Sapper ansonsten versucht hieraus eine Route zu generieren, was nicht klappt.

### _error.svelte
Diese Route wird aufgerufen, wenn Sapper eine URL zum Beispiel nicht kennt, oder eine Fehler bei der Verarbeitung aufgetreten ist.

### _layout.svelte
In dieser Datei wird quasi das **Hauptlayout** der App definiert. Dort kann zum Beispiel die Navigation eingebunden werden, weil sie auf jeder Seite vorhanden sein soll.

### [orderId].svelte
Die `[]` geben an, dass es sich hier nich um einen konkreten Seitennamen handelt, sondern um parameter in der URL abzufangen. Der Parameter kann zum Beispiel aus einer Zahl oder Zeichen bestehen. Gleiches kann man auch für Ordner machen, allerdings muss man hier das `.svelte` weglassen. Man kann Parameter verchachteln.