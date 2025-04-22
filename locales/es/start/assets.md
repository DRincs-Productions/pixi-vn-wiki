# Assets

**What are assets?** The assets are all the files that are not code, such as images, sounds, and videos.

You can use assets saved locally in the project or online (For the second option you will need to make sure that the cloud service you are using allows _CORS requests_). Of course, if your assets are online, a requirement of the game will be to be connected online. Then you will have to notify the user and block the game where there is no connection.

If you are creating a visual novel, it is recommended to only keep assets that are used frequently locally. While, for assets used only once in the game, it is recommended to publish them online.

To load and manipulate assets (images, gifs, videos...) you will need to use `Assets`. `Assets` is a class with many features and comes from the PixiJS library, if you want more information read [here](https://pixijs.com/8.x/guides/components/assets). It is also very important that you read this documentation to better [organize the uploading of your assets](/start/assets-management.md).

You mainly have two choices for where to save your assets, local or online.

## Local assets

To save and use assets locally, you can use any folder, there are no restrictions. But it is recommended to use the `assets` folder. Inside this folder you can create subfolders to better organize your assets.

Here is an example of how to import and load an asset into your project:

```ts [/utils/assets.ts]
import { Assets } from "@drincs/pixi-vn";
import bg01hallway from "../assets/images/bg01-hallway.webp";

Assets.add({
    alias: "bg01-hallway",
    src: bg01hallway,
});
```

### ![icon](/pixijs-assetpack.svg){style="width:30px;height:30px;margin-right:5px;float:left;border-radius:5px"} PixiJS AssetPack

AssetPack is a tool for optimising local assets for the web. It can be used to transform, combine, compress assets.

If you want to use AssetPack, you can find the documentation [here](https://pixijs.io/assetpack)

## Assets hosting

You can save your assets online. This is a good option if you want to save space on your computer. You can use any cloud service that allows you to upload files and generate a public URL (CORS enabled).

Here is an example of how to import and load an asset into your project:

```ts [/utils/assets.ts]
import { Assets } from "@drincs/pixi-vn";

Assets.add({
    alias: "bg01-hallway",
    src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fbg01-hallway.webp?alt=media",
});
```

You can save your assets as you like, with complete freedom. If you plan to save your assets online, here are some of the options:

### ![icon](/github.svg){style="width:30px;height:30px;margin-right:5px;float:left;border-radius:50%;background-color:white"} Github

You can use Github to host your assets. You can use the raw link of the file to use it in your project. The link will be in the following format: `https://github.com/[repository]/raw/refs/heads/main/[file path]`

- **Price**: Completely free.
- **Space limits**: You have no space limits. But each single file must not exceed 100 MB.
- **Type of files**: You can upload any type of file.
- **Traffic**: Speed is not the best.
- **Edit assets**: You can edit the file keeping the same URL.

### Image hosting

Image hosting is a service that allows you to upload images. There are more sites to upload images for free, for example [imgbb](https://imgbb.com/), [imgix](https://www.imgix.com/), [imgur](https://imgur.com/). You can use the link of the image to use it in your project.

- **Price**: Completely free. But you can pay for more features.
- **Space limits**: You have no space limits. But each single file can have a maximum size.
- **Type of files**: You can upload only images.
- **Traffic**: Speed is good.
- **Edit assets**: You can't edit the file keeping the same URL.

### Cloud storage

Cloud storage is a service that allows you to upload files. There are more sites to upload files for free, but with some limits.

- **Price**: Usually paid or with free version with limits.
- **Space limits**: Monthly cost based on space occupied by use. (Usually if you do not exceed a certain threshold it is free)
- **Type of files**: You can upload any type of file.
- **Traffic**: Speed is good.
- **Edit assets**: You can edit the file keeping the same URL.

Here is a list of some of the most popular cloud storage services:

- ![icon](/firebase.svg){style="width:20px;height:20px;margin-right:5px;float:left"} **Firebase Storage** is a cloud service very easy to use. Firebase have two plans: Spark (free) and Blaze (pay as you go). You can find more information [here](https://firebase.google.com/pricing).\
  **Solving Firebase Storage CORS Issue**:
  - Install [gcloud CLI](https://cloud.google.com/sdk/docs/install)
  - Read this [documentation](https://medium.com/@we.viavek/setting-cors-in-firebase-19a2cce2fe28) to solve the CORS issue.
- ![icon](/aws.svg){style="width:20px;height:20px;margin-right:5px;float:left"} **Amazon S3** is a cloud service. Compared to its competitors, it has many settings, but it may be more difficult to use. There is a payment plan to use Amazon S3. You can find more information [here](https://aws.amazon.com/s3/pricing/).
- ![icon](/supabase.svg){style="width:20px;height:20px;margin-right:5px;float:left"} **Supabase** is an open-source Firebase alternative. Supabase have two plans: Free and Pay as you go. You can find more information [here](https://supabase.io/pricing).
- **Convex** is a cloud service that allows you to store and serve user-generated content, such as photos or videos or other files. Convex have two plans: Free and Pay as you go. You can find more information [here](https://www.convex.dev/pricing).
