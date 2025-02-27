# Perché Pixi’VN?

Il motivo per cui è nato Pixi’VN è che gli attuali sistemi per la creazione di visual novel o RPG 2D si basano su vecchi sistemi e presentano molte carenze.

Pixi’VN combina lo sviluppo di vari giochi 2D in un unico motore, avvicinando lo sviluppo di videogiochi alle applicazioni web per sfruttare la loro grande compatibilità e i servizi cloud.

## Che cos'è Pixi’VN?

Pixi’VN è un motore di gioco 2D molto versatile e potente. Si basa su JavaScript/TypeScript e [PixiJS](https://pixijs.com/).

Offre le seguenti funzionalità:

- gestione della narrazione
- fornisce un canvas 2D
- fornire funzionalità per riprodurre suoni e musica
- storage per impostare e ottenere le variabili di gioco.
- salva lo stato attuale dell'intero gioco ad ogni "passo della storia", dando la possibilità di tornare indietro
- funzionalità per salvare e caricare lo stato attuale del gioco.

Per un avvio rapido, sono disponibili vari [template di progetto](/start/getting-started.md#pivivn-templates). Gli sviluppatori meno esperti possono utilizzare questi template anche senza avere grandi conoscenze di JavaScript/TypeScript.

Hai la possibilità di utilizzare vari tipi di linguaggi narrativi (oltre a JavaScript/TypeScript). Attualmente è possibile usare le seguenti:

- [_ink_](/ink/ink.md)
- [Ren'Py](/renpy/renpy.md)

## Caratteristiche di Pixi’VN

La sua grande **versatilità** è dovuta al fatto che Pixi’VN è un pacchetto npm e non un framework. Ciò significa che può essere installato su qualsiasi progetto JavaScript e associato con il tuo framework JavaScript preferito (React, Vue, Angular, ecc.).
È possibile utilizzare le funzionalità fornite per vari scopi, dalla creazione di una visual novel o di un altro tipo di gioco 2D (come avventure punta e clicca, giochi di ruolo, ecc.), all'utilizzo delle sole funzionalità narrative in un gioco 3D, alla visualizzazione di un'animazione su un sito web, ecc.

Per essere il più **leggero** possibile, si occupa solo di funzionalità specifiche, aggiungendone o dando la possibilità di aggiungerne altre con altre librerie. Non è necessario utilizzare IDE pesanti per lo sviluppo, qualsiasi editor di codice andrà bene.

**Non reinventa cose** che già esistono. Pixi'VN unisce diverse librerie molto popolari e fornisce API per interagire con esse e averne pieno accesso. Non inventa nuovi linguaggi di programmazione/narrativi.
