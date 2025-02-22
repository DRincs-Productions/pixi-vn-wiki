# Perché Pixi’VN?

Il motivo per cui è nato Pixi’VN è che gli attuali sistemi per la creazione di visual novel o RPG 2D si basano su vecchi sistemi e presentano molte carenze.

Pixi’VN combina lo sviluppo di vari giochi 2D in un unico motore, avvicinando lo sviluppo di videogiochi alle applicazioni web per sfruttare la loro grande compatibilità e i servizi cloud.

## Che cos'è Pixi’VN?

Pixi’VN è un motore di gioco 2D molto versatile e potente. Si basa su JavaScript/TypeScript e [PixiJS](https://pixijs.com/).

Offre le seguenti funzionalità:

- gestione della narrazione
- provides a 2D canvas
- fornire funzionalità per riprodurre suoni e musica
- storage to set and get game variables.
- saves the current state of the entire game at each "story step" giving the possibility to go back
- funzionalità per salvare e caricare lo stato attuale del gioco.

Per un avvio rapido, sono disponibili vari [template di progetto](/start/getting-started.md#pivivn-templates). Gli sviluppatori meno esperti possono utilizzare questi template anche senza avere grandi conoscenze di JavaScript/TypeScript.

Hai la possibilità di utilizzare vari tipi di linguaggi narrativi (oltre a JavaScript/TypeScript). Attualmente è possibile usare le seguenti:

- [_ink_](/ink/ink.md)
- [Ren'Py](/renpy/renpy.md)

## Caratteristiche di Pixi’VN

La sua grande **versatilità** è dovuta al fatto che Pixi’VN è un pacchetto npm e non un framework. This means that it can be installed on any Node.js project and coupled with your favorite JavaScript framework (React, Vue, Angular, etc.).
You may use the provided functionality (even if only partially) for a variety of purposes, from creating a visual novel or other type of 2D game (such as point-and-click adventure, RPGs, etc.), using only the narrative features in a 3D game, displaying an animation on a website, etc.

To be as **lightweight** as possible, it only takes care of certain specific features, giving the possibility to add more with other libraries. It is not necessary to use heavy IDEs for development, any code editor can be sufficient.

**Non reinventa cose** che già esistono. Pixi'VN unisce diverse librerie molto popolari e fornisce API per interagire con esse e averne pieno accesso. Non inventa nuovi linguaggi di programmazione/narrativi.
