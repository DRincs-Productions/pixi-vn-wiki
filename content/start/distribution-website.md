
# Website

The game can be distributed as a website. The game can be played on the browser and can be accessed by anyone with an internet connection. To do this you need to [host the game on a server](#hosting-and-deploying).

## Hosting and Deploying

You can use various hosts like [Firebase](https://firebase.google.com/), [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/) (these are completely free). All will have similar setup processes that need to be completed.

### Firebase Hosting

For this guide, Firebase will be used as the hosting example. Why Firebase? Because it have more features than the others, like the ability to host a database, authentication, and more. Also, Firebase is a Google product, so it is very reliable.

First, if not already available, [create the project in Firebase](https://console.firebase.google.com/).

Next, in a Terminal, install the Firebase CLI:

```bash
npm install -g firebase-tools
```

If it's the first time you use firebase-tools, login to your Google account with:

```bash
firebase login
```

With the Firebase CLI installed, run (within your project):

```bash
firebase init
```

The CLI prompts:

"Which Firebase CLI features do you want to set up for this folder?" Choose `Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys`.

Create a new Firebase project or select an existing one.

"Select a default Firebase project for this directory:" Choose the project you created on the Firebase website.

"What do you want to use as your public directory?" Enter `dist`.

Configure as a single-page app (rewrite all urls to /index.html)?" Enter `yes`. (Answering this question will ensure that routing, hard reload, and deep linking work in the app)

"File dist/index.html already exists. Overwrite?" Enter `no`.

---

GitHub Action deploys are optional. If you want to set up automatic builds and deploys with Github, answer the following questions:

Set up automatic builds and deploys with Github? Enter `yes`.

For which GitHub repository would you like to set up a Github Workflow? Enter your project name.

Set up the workflow to run a build script before every deploy? Enter `yes`.

What script should be run before every deploy? Enter `npm ci && npm run build`.

Set up automatic deployment to your sites live channel when a PR is merged? Enter `yes`.

What is the name of the get hooked branch associated with your sites live channel? Enter your project's main branch name.

---

A firebase.json config file is generated, configuring the app for deployment.

The last thing needed is to make sure caching headers are being set correctly. To do this, add a headers snippet to the firebase.json file. The complete firebase.json looks like:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

For more information about the firebase.json properties, see the [Firebase documentation](https://firebase.google.com/docs/hosting/full-config#section-firebase-json).

To deploy the app, run:

```bash
npm run build
firebase deploy
```

## Enable the ADD TO HOME SCREEN (PWA Plugin)

![image](https://github.com/user-attachments/assets/7afa46f0-347f-4d61-846c-b71ba39f0105)

It could be very beneficial to enable the ability to install the website as a "browser application" and be able to use it as a standalone application on the device.

If you are using [Vite js](https://vitejs.dev/) as a build tool, you can use the [PWA Vite Plugin](https://vite-pwa-org.netlify.app/). You can copy this [exemple](https://vite-pwa-org.netlify.app/guide/pwa-minimal-requirements.html#web-app-manifest).

Else, you can create the `manifest.json`, it depernds on the framework you are using.

## itch.io

You can distribute your game on [itch.io](https://itch.io/). It is a platform that allows you to upload your game and distribute it to the public. It is a great platform to distribute your game and get feedback from the community.

itch.io can run only the html and javascript files: if you need to build your game and d zip the build folder. Then you can upload the zip file to itch.io.

You will see a result of something like this:

![image](https://github.com/user-attachments/assets/0482a6fa-8c21-4fa6-b4e1-04f05bc4315d)

The solution is to [host the game on a server](#hosting-and-deploying) and then create an iframe on itch.io to show the game.

For example, after hosting the game on a server, you can create a index.html file with the following content:

```html
<!doctype html>
<html lang="en" style="height: 100%; width: 100%;">
  <head></head>
  <body
    style="height: 100%; width: 100%; display: flex; overflow: hidden; margin: 0; background-color: #242424;"
  >
    <div id="root"
      style="height: 100%; width: 100%;"
    >
      <iframe
        src="https://pixi-vn-react-template.web.app/"
        style="height: 100%; width: 100%; border: none;"
        allowfullscreen
      >
      </iframe>
    </div>
  </body>
</html>
```

Then you can upload the index.html file to itch.io.
