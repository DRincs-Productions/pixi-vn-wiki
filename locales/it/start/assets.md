# Assets

**Cosa sono gli assets?** Gli assets sono tutti i file che non sono codice, come immagini, suoni e video.

È possibile utilizzare risorse salvate localmente nel progetto oppure online (per la seconda opzione, è necessario assicurarsi che il servizio cloud utilizzato consenta le _richieste CORS_). Naturalmente, se i tuoi assets sono online, uno dei requisiti del gioco sarà la connessione online. Successivamente dovrai avvisare l'utente e bloccare il gioco in assenza di connessione.

Se stai creando una visual novel, è consigliabile conservare localmente solo gli assets che utilizzi frequentemente. Per gli assets utilizzati una sola volta nel gioco, invece, è consigliabile pubblicarle online.

È inoltre molto importante leggere questa documentazione per [organizzare al meglio il caricamento delle risorse](/start/assets-management.md).

## ![icon](/pixijs-assetpack.svg){style="width:30px;height:30px;margin-right:5px;float:left;border-radius:5px"} PixiJS AssetPack

AssetPack è uno strumento per ottimizzare gli assets per il web. Può essere utilizzato per trasformare, combinare e comprimere gli assets.

Se vuoi utilizzare AssetPack, puoi trovare la documentazione [qui](https://pixijs.io/assetpack)

## Hosting degli assets

Puoi salvare i tuoi assets come preferisci, in totale libertà. Se intendi salvare i tuoi assets online, ecco alcune opzioni:

### ![icon](/github.svg){style="width:30px;height:30px;margin-right:5px;float:left;border-radius:50%;background-color:white"} Github

Puoi utilizzare Github per ospitare i tuoi assets. Puoi usare il raw link del file per utilizzarlo nel tuo progetto. Il collegamento avrà il seguente formato: `https://github.com/[repository]/raw/refs/heads/main/[percorso file]`

- **Prezzo**: Completamente gratuito.
- **Limiti di spazio**: Non ci sono limiti di spazio. Ma ogni singolo file non deve superare i 100 MB.
- **Tipo di file**: puoi caricare qualsiasi tipo di file.
- **Traffico**: La velocità non è delle migliori.
- **Modifica gli assets**: Puoi modificare il file mantenendo lo stesso URL.

### Hosting di immagini

L'hosting di immagini è un servizio che consente di caricare immagini. Ci sono molti siti per caricare immagini gratuitamente, ad esempio [imgbb](https://imgbb.com/), [imgix](https://www.imgix.com/), [imgur](https://imgur.com/). Puoi usare il link dell'immagine per utilizzarla nel tuo progetto.

- **Prezzo**: Completamente gratuito. Ma è possibile pagare per avere più funzionalità.
- **Limiti di spazio**: Non ci sono limiti di spazio. Ma ogni singolo file può avere una dimensione massima.
- **Tipo di file**: puoi caricare solo immagini.
- **Traffico**: La velocità è buona.
- **Modifica gli assets**: non puoi modificare il file mantenendo lo stesso URL.

### ![icon](/firebase.svg){style="width:30px;height:30px;margin-right:5px;float:left"} Firebase Storage

Firebase Storage è un servizio cloud che consente di archiviare e fornire contenuti generati dagli utenti, come foto, video o altri file. Puoi usare l'URL pubblico del file per utilizzarlo nel tuo progetto.

- **Prezzo**: Firebase offre due piani: Spark (gratuito) e Blaze (a pagamento). Puoi trovare maggiori informazioni [qui](https://firebase.google.com/pricing).
- **Limiti di spazio**: hai a disposizione 5 GB di storage di archiviazione gratuito e 1 GB al giorno di download. È possibile aumentare lo spazio di archiviazione passando al piano Blaze. Per 50GB pagherai circa $1,17.
- **Tipo di file**: puoi caricare qualsiasi tipo di file.
- **Traffico**: La velocità è buona.
- **Modifica gli assets**: Puoi modificare il file mantenendo lo stesso URL.

**Risoluzione del problema CORS di Firebase Storage**:

- Installa [gcloud CLI](https://cloud.google.com/sdk/docs/install)
- Leggi questa [documentazione](https://medium.com/@we.viavek/setting-cors-in-firebase-19a2cce2fe28) per risolvere il problema CORS.

### ![icon](/aws.svg){style="width:30px;height:30px;margin-right:5px;float:left"} Amazon S3

Amazon S3 è un servizio cloud che consente di archiviare e distribuire contenuti generati dagli utenti, come foto, video o altri file. Puoi usare l'URL pubblico del file per utilizzarlo nel tuo progetto.

- **Prezzo**: Per utilizzare Amazon S3 è previsto un piano di pagamento. Puoi trovare maggiori informazioni [qui](https://aws.amazon.com/s3/pricing/).
- **Limiti di spazio**: paghi in base allo spazio di archiviazione che utilizzi. È possibile aumentare lo spazio di archiviazione aggiornando il piano.
- **Tipo di file**: puoi caricare qualsiasi tipo di file. Il prezzo è di circa $0,023 per GB, quindi per 50GB pagherai circa $1,15.
- **Traffico**: La velocità è buona.
- **Modifica gli assets**: Puoi modificare il file mantenendo lo stesso URL.

### ![icon](/supabase.svg){style="width:30px;height:30px;margin-right:5px;float:left"} Supabase

Supabase è un'alternativa open source di Firebase. Puoi usare l'URL pubblico del file per utilizzarlo nel tuo progetto.

- **Prezzo**: Supabase offre due piani: gratuito e a pagamento. Puoi trovare maggiori informazioni [qui](https://supabase.io/pricing).
- **Limiti di spazio**: hai a disposizione 5 GB di storage di archiviazione gratuito e 1 GB al giorno di download. È possibile aumentare lo spazio di archiviazione aggiornando il piano.
- **Tipo di file**: puoi caricare qualsiasi tipo di file.
- **Traffico**: La velocità è buona.
- **Modifica gli assets**: Puoi modificare il file mantenendo lo stesso URL.

### Convex

Convex è un servizio cloud che consente di archiviare e fornire contenuti generati dagli utenti, come foto, video o altri file. Puoi usare l'URL pubblico del file per utilizzarlo nel tuo progetto.

- **Prezzo**: Convex offre due piani: gratuito e a consumo. Puoi trovare maggiori informazioni [qui](https://www.convex.dev/pricing).
- **Limiti di spazio**: Hai a disposizione 10GB di spazio di archiviazione gratuito e 1GB/mese di download. È possibile aumentare lo spazio di archiviazione aggiornando il piano.
- **Tipo di file**: puoi caricare qualsiasi tipo di file.
- **Traffico**: La velocità è buona.
- **Modifica gli assets**: Puoi modificare il file mantenendo lo stesso URL.
