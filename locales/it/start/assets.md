# Assets

**Cosa sono gli assets?** Gli assets sono tutti i file che non sono codice, come immagini, suoni e video.

È possibile utilizzare risorse salvate localmente nel progetto oppure online (per la seconda opzione, è necessario assicurarsi che il servizio cloud utilizzato consenta le _richieste CORS_). Naturalmente, se i tuoi assets sono online, uno dei requisiti del gioco sarà la connessione online. Successivamente dovrai avvisare l'utente e bloccare il gioco in assenza di connessione.

Se stai creando una visual novel, è consigliabile conservare localmente solo gli assets che utilizzi frequentemente. On the contrary, it is recommended to publish resources that are used only once in the online game.

È inoltre molto importante leggere questa documentazione per [organizzare al meglio il caricamento delle risorse](/start/assets-management.md).

## ![icon](/pixijs-assetpack.svg){style="width:30px;height:30px;margin-right:5px;float:left;border-radius:5px"} PixiJS AssetPack

AssetPack è uno strumento per ottimizzare gli assets per il web. It can be used to transform, combine, compress assets. Any asset that you want to transform or optimise into something else can be done with AssetPack.

If you want to use AssetPack, you can find the documentation [here](https://pixijs.io/assetpack)

## Assets hosting

You are completely free to store images however you want.

The main possibilities are the following:

### ![icon](/github.svg){style="width:30px;height:30px;margin-right:5px;float:left;border-radius:50%;background-color:white"} Github

You can use Github to host your assets. You can use the raw link of the file to use it in your project. The link will be in the following format: `https://github.com/[repository]/raw/refs/heads/main/[file path]`

- **Price**: Completely free.
- **Space limits**: You have no space limits. But each single file must not exceed 100 MiB.
- **Type of files**: You can upload any type of file.
- **Traffic**: Speed is not the best.
- **Edit assets**: You can edit the file keeping the same url.

### Image hosting

Image hosting is a service that allows you to upload images for free. There are more sites to upload images for free, for example [imgbb](https://imgbb.com/), [imgix](https://www.imgix.com/), [imgur](https://imgur.com/). You can use the public URL of the image.

- **Price**: Completely free. But you can pay for more features.
- **Space limits**: You have no space limits. But each single file can have a maximum size.
- **Type of files**: You can upload only images.
- **Traffic**: Speed is good.
- **Edit assets**: You can't edit the file keeping the same url.

### ![icon](/firebase.svg){style="width:30px;height:30px;margin-right:5px;float:left"} Firebase Storage

Firebase Storage is a cloud service that allows you to store and serve user-generated content, such as photos or videos or other files. You can use the public URL of the file to use it in your project.

- **Price**: Firebase have two plans: Spark (free) and Blaze (pay as you go). You can find more information [here](https://firebase.google.com/pricing).
- **Space limits**: You have, free, 5GB of free storage and 1GB/day of download. You can increase the storage by upgrading to Blaze plan. For 50GB you will pay around $1.17.
- **Type of files**: You can upload any type of file.
- **Traffic**: Speed is good.
- **Edit assets**: You can edit the file keeping the same url.

**Solving Firebase Storage CORS Issue**:

- Install [gcloud CLI](https://cloud.google.com/sdk/docs/install)
- Read this [documentation](https://medium.com/@we.viavek/setting-cors-in-firebase-19a2cce2fe28) to solve the CORS issue.

### ![icon](/aws.svg){style="width:30px;height:30px;margin-right:5px;float:left"} Amazon S3

Amazon S3 is a cloud service that allows you to store and serve user-generated content, such as photos or videos or other files. You can use the public URL of the file to use it in your project.

- **Price**: Amazon S3 have a pay as you go plan. You can find more information [here](https://aws.amazon.com/s3/pricing/).
- **Space limits**: You pay for the storage you use. You can increase the storage by upgrading the plan.
- **Type of files**: You can upload any type of file. The price is around $0.023 per GB, so for 50GB you will pay around $1.15.
- **Traffic**: Speed is good.
- **Edit assets**: You can edit the file keeping the same url.

### ![icon](/supabase.svg){style="width:30px;height:30px;margin-right:5px;float:left"} Supabase

Supabase is an open-source Firebase alternative. You can use the public URL of the file to use it in your project.

- **Price**: Supabase have two plans: Free and Pay as you go. You can find more information [here](https://supabase.io/pricing).
- **Space limits**: You have, free, 5GB of free storage and 1GB/day of download. You can increase the storage by upgrading the plan.
- **Type of files**: You can upload any type of file.
- **Traffic**: Speed is good.
- **Edit assets**: You can edit the file keeping the same url.

### Convex

Convex is a cloud service that allows you to store and serve user-generated content, such as photos or videos or other files. You can use the public URL of the file to use it in your project.

- **Price**: Convex have two plans: Free and Pay as you go. You can find more information [here](https://www.convex.dev/pricing).
- **Space limits**: You have, free, 10GB of free storage and 1GB/month of download. You can increase the storage by upgrading the plan.
- **Type of files**: You can upload any type of file.
- **Traffic**: Speed is good.
- **Edit assets**: You can edit the file keeping the same url.
