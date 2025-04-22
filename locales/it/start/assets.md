# Assets

**Cosa sono gli assets?** Gli assets sono tutti i file che non sono codice, come immagini, suoni e video.

È possibile utilizzare risorse salvate localmente nel progetto oppure online (per la seconda opzione, è necessario assicurarsi che il servizio cloud utilizzato consenta le _richieste CORS_). Naturalmente, se i tuoi assets sono online, uno dei requisiti del gioco sarà la connessione online. Successivamente dovrai avvisare l'utente e bloccare il gioco in assenza di connessione.

Se stai creando una visual novel, è consigliabile conservare localmente solo gli assets che utilizzi frequentemente. Per gli assets utilizzati una sola volta nel gioco, invece, è consigliabile pubblicarle online.

Per caricare e manipolare risorse (immagini, gif, video...) sarà necessario utilizzare `Assets`. `Assets` è una classe con molte funzionalità e proviene dalla libreria PixiJS, se vuoi maggiori informazioni leggi [qui](https://pixijs.com/8.x/guides/components/assets). È inoltre molto importante leggere questa documentazione per [organizzare al meglio il caricamento delle risorse](/start/assets-management.md).

Principalmente hai due possibilità per decidere dove salvare i tuoi assets: in locale o online.

## Assets del progetto

Per salvare e utilizzare le risorse in locale, puoi usare qualsiasi cartella, non ci sono restrizioni. Ma è consigliabile utilizzare la cartella `assets`. All'interno di questa cartella puoi creare delle sottocartelle per organizzare meglio le tue risorse.

Ecco un esempio di come importare e caricare una risorsa nel tuo progetto:

```ts [/utils/assets.ts]
import { Assets } from "@drincs/pixi-vn";
import bg01hallway from "../assets/images/bg01-hallway.webp";

Assets.add({
    alias: "bg01-hallway",
    src: bg01hallway,
});
```

### ![icon](/pixijs-assetpack.svg){style="width:30px;height:30px;margin-right:5px;float:left;border-radius:5px"} PixiJS AssetPack

AssetPack è uno strumento per ottimizzare le risorse locali per il web. Può essere utilizzato per trasformare, combinare e comprimere gli assets.

Se vuoi utilizzare AssetPack, puoi trovare la documentazione [qui](https://pixijs.io/assetpack)

## Hosting degli assets

Puoi salvare i tuoi assets online. Questa è una buona opzione se vuoi risparmiare spazio sul tuo computer. Puoi utilizzare qualsiasi servizio cloud che ti consenta di caricare file e generare un URL pubblico (CORS abilitato).

Ecco un esempio di come importare e caricare una risorsa nel tuo progetto:

```ts [/utils/assets.ts]
import { Assets } from "@drincs/pixi-vn";

Assets.add({
    alias: "bg01-hallway",
    src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fbg01-hallway.webp?alt=media",
});
```

Puoi salvare i tuoi assets come preferisci, in totale libertà. Se intendi salvare i tuoi assets online, ecco alcune opzioni:

### ![icon](/github.svg){style="width:30px;height:30px;margin-right:5px;float:left;border-radius:50%;background-color:white"} Github

Puoi utilizzare Github per ospitare i tuoi assets. Puoi usare il raw link del file per utilizzarlo nel tuo progetto. Il collegamento avrà il seguente formato: `https://github.com/[repository]/raw/refs/heads/main/[percorso file]`

- **Prezzo**: Completamente gratuito.
- **Limiti di spazio**: Non ci sono limiti di spazio. Ma ogni singolo file non deve superare i 100 MB.
- **Tipo di file**: puoi caricare qualsiasi tipo di file.
- **Traffico**: La velocità non è delle migliori.
- **Edit assets**: You can edit the file keeping the same URL.

### Hosting di immagini

L'hosting di immagini è un servizio che consente di caricare immagini. Ci sono molti siti per caricare immagini gratuitamente, ad esempio [imgbb](https://imgbb.com/), [imgix](https://www.imgix.com/), [imgur](https://imgur.com/). Puoi usare il link dell'immagine per utilizzarla nel tuo progetto.

- **Prezzo**: Completamente gratuito. Ma è possibile pagare per avere più funzionalità.
- **Limiti di spazio**: Non ci sono limiti di spazio. Ma ogni singolo file può avere una dimensione massima.
- **Tipo di file**: puoi caricare solo immagini.
- **Traffico**: La velocità è buona.
- **Edit assets**: You can't edit the file keeping the same URL.

### Cloud storage

Cloud storage is a service that allows you to upload files. There are more sites to upload files for free, but with some limits.

- **Price**: Usually paid or with free version with limits.
- **Space limits**: Monthly cost based on space occupied by use. (Usually if you do not exceed a certain threshold it is free)
- **Tipo di file**: puoi caricare qualsiasi tipo di file.
- **Traffico**: La velocità è buona.
- **Edit assets**: You can edit the file keeping the same URL.

Here is a list of some of the most popular cloud storage services:

- ![icon](/firebase.svg){style="width:20px;height:20px;margin-right:5px;float:left"} **Firebase Storage** is a cloud service very easy to use. Firebase have two plans: Spark (free) and Blaze (pay as you go). You can find more information [here](https://firebase.google.com/pricing).\
  **Solving Firebase Storage CORS Issue**:
  - Installa [gcloud CLI](https://cloud.google.com/sdk/docs/install)
  - Leggi questa [documentazione](https://medium.com/@we.viavek/setting-cors-in-firebase-19a2cce2fe28) per risolvere il problema CORS.
- ![icon](/aws.svg){style="width:20px;height:20px;margin-right:5px;float:left"} **Amazon S3** is a cloud service. Compared to its competitors, it has many settings, but it may be more difficult to use. There is a payment plan to use Amazon S3. You can find more information [here](https://aws.amazon.com/s3/pricing/).
- ![icon](/supabase.svg){style="width:20px;height:20px;margin-right:5px;float:left"} **Supabase** is an open-source Firebase alternative. Supabase have two plans: Free and Pay as you go. Puoi trovare maggiori informazioni [qui](https://supabase.io/pricing).
- **Convex** is a cloud service that allows you to store and serve user-generated content, such as photos or videos or other files. Convex have two plans: Free and Pay as you go. Puoi trovare maggiori informazioni [qui](https://www.convex.dev/pricing).
