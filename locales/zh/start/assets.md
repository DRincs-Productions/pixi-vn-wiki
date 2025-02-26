# Assets

**What are assets?** The assets are all the files that are not code, such as images, sounds, and videos.

You can use assets saved locally in the project or online (For the second option you will need to make sure that the cloud service you are using allows _CORS requests_). Of course, if your assets are online, a requirement of the game will be to be connected online. Then you will have to notify the user and block the game where there is no connection.

If you are creating a visual novel, it is recommended to only keep assets that are used frequently locally. On the contrary, it is recommended to publish resources that are used only once in the online game.

It is also very important that you read this documentation to better [organize the uploading of your assets](/start/assets-management.md).

## PixiJS AssetPack

![logo-main](https://github.com/user-attachments/assets/8e5a1437-e446-4b2d-9b9d-ff0898472086)

AssetPack is a tool for optimising assets for the web. It can be used to transform, combine, compress assets. Any asset that you want to transform or optimise into something else can be done with AssetPack.

If you want to use AssetPack, you can find the documentation [here](https://pixijs.io/assetpack)

## Assets hosting

You are completely free to store images however you want.

The main possibilities are the following:

### Github

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

### Firebase Storage

Firebase Storage is a cloud service that allows you to store and serve user-generated content, such as photos or videos or other files. You can use the public URL of the file to use it in your project.

- **Price**: Firebase have two plans: Spark (free) and Blaze (pay as you go). You can find more information [here](https://firebase.google.com/pricing).
- **Space limits**: You have, free, 5GB of free storage and 1GB/day of download. You can increase the storage by upgrading to Blaze plan. For 50GB you will pay around $1.17.
- **Type of files**: You can upload any type of file.
- **Traffic**: Speed is good.
- **Edit assets**: You can edit the file keeping the same url.

**Solving Firebase Storage CORS Issue**:

- Install [gcloud CLI](https://cloud.google.com/sdk/docs/install)
- Read this [documentation](https://medium.com/@we.viavek/setting-cors-in-firebase-19a2cce2fe28) to solve the CORS issue.

### Amazon S3

Amazon S3 is a cloud service that allows you to store and serve user-generated content, such as photos or videos or other files. You can use the public URL of the file to use it in your project.

- **Price**: Amazon S3 have a pay as you go plan. You can find more information [here](https://aws.amazon.com/s3/pricing/).
- **Space limits**: You pay for the storage you use. You can increase the storage by upgrading the plan.
- **Type of files**: You can upload any type of file. The price is around $0.023 per GB, so for 50GB you will pay around $1.15.
- **Traffic**: Speed is good.
- **Edit assets**: You can edit the file keeping the same url.

### Supabase

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
