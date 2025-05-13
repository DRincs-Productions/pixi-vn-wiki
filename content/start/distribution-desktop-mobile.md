# Desktop & mobile devices

There are many ways to distribute your game on desktop and mobile devices. You can use [Tauri](https://v2.tauri.app/), [Ionic](https://ionicframework.com/), [Electron](https://www.electronjs.org/), [NW.js](https://nwjs.io/), or [React Native for Windows + Mac](https://microsoft.github.io/react-native-windows/).

However, if you do not want to create a project with large customizations, I recommend using the [multi-device templates](/start/getting-started.md#project-initialization), in which Tauri has been added in order to allow both the development of a Web app and the development of desktop and mobile applications.

## ![icon](/tauri.svg){style="width:30px;height:30px;margin-right:5px;float:left"} Tauri

**What is Tauri?** Tauri is a framework that allows you to create desktop applications with web technologies. Tauri uses **Rust** to create a secure and fast application, and it uses a WebView to render the HTML, CSS, and JavaScript of your application.

You can learn more about Tauri on the [Tauri website](https://v2.tauri.app/).

## How to distribute your game with Tauri

Generating releases manually for all devices is not an easy process, because it requires installing many programs and for iOS applications you need a mac. Precisely for this reason it is not recommended. (You can get more information on how to manually generate releases [here](https://v2.tauri.app/distribute/))

[Tauri gives the possibility to use GitHub Actions](https://v2.tauri.app/distribute/pipelines/github/) to generate releases autonomously. **What is GitHub Actions?** To explain it so that everyone can understand it, GitHub to automate repetitive processes that you would have to do manually, by having "machines" with the OS you prefer for a certain period of time. with `.yml` files you can set a list of commands that will have to perform after a certain event.

The [multi-device templates](/start/getting-started.md#project-initialization) have inside the file `/.github/workflows/tauri.yml` which has the purpose of creating a release not inside the installation packages for all OS.

:::tabs

== .github/workflows/tauri.yml

```yml
# https://tauri.app/distribute/pipelines/github/
name: Tauri CI

on:
  push:
    tags:
      - 'v*'

jobs:
  publish-tauri:
    permissions:
      contents: write
    strategy:
      fail-fast: false
      matrix:
        include:
          - platform: 'macos-latest' # for Arm based macs (M1 and above).
            name: 'macOS Arm'
            tauriScript: 'npm run tauri' # or yarn
            args: '--target aarch64-apple-darwin'
          - platform: 'macos-latest' # for Intel based macs.
            name: 'macOS Intel'
            tauriScript: 'npm run tauri' # or yarn
            args: '--target x86_64-apple-darwin'
          - platform: 'ubuntu-22.04'
            name: 'Linux'
            tauriScript: 'npm run tauri' # or yarn
            args: ''
          - platform: 'windows-latest'
            name: 'Windows'
            tauriScript: 'npm run tauri' # or yarn
            args: ''

    runs-on: ${{ matrix.platform }}
    steps:
      - uses: actions/checkout@v4

      - name: install dependencies (ubuntu only)
        if: matrix.platform == 'ubuntu-22.04' # This must match the platform value defined above.
        run: |
          sudo apt-get update
          sudo apt-get install -y libwebkit2gtk-4.1-dev libappindicator3-dev librsvg2-dev patchelf

      - name: setup node
        uses: actions/setup-node@v4
        with:
          node-version: lts/*
          cache: 'npm' # or 'yarn'

      - name: install Rust stable
        uses: dtolnay/rust-toolchain@stable # Set this to dtolnay/rust-toolchain@nightly
        with:
          # Those targets are only used on macos runners so it's in an `if` to slightly speed up windows and linux builds.
          targets: ${{ matrix.platform == 'macos-latest' && 'aarch64-apple-darwin,x86_64-apple-darwin' || '' }}

      - name: Rust cache
        uses: swatinem/rust-cache@v2
        with:
          workspaces: './src-tauri -> target'

      - name: install frontend dependencies
        # If you don't have `beforeBuildCommand` configured you may want to build your frontend here too.
        run: npm install # this for npm, for yarn use `yarn install`

      - uses: tauri-apps/tauri-action@v0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NDK_HOME: ${{ steps.setup-ndk.outputs.ndk-path }}
        with:
          tagName: app-v__VERSION__ # the action automatically replaces \_\_VERSION\_\_ with the app version.
          releaseName: 'App v__VERSION__'
          releaseBody: 'See the assets to download this version and install.'
          releaseDraft: true
          prerelease: false
          tauriScript: ${{ matrix.tauriScript }}
          args: ${{ matrix.args }}
```

:::

To activate this procedure you need to have your own project on GitHub and create a tag on git that starts with the letter "v". For example:

```bash
git tag v1.0.0
git push origin v1.0.0
```

In the Actions section of your Repository you can view the status of this procedure.

![Actions section](https://github.com/user-attachments/assets/b39055a9-02a7-472b-930f-daf0a9c6c78b)

At its end a Release will be created. Read more about the GitHub Releases [here](https://docs.github.com/en/repositories/releasing-projects-on-github/viewing-your-repositorys-releases-and-tags).

Currently the mobile release with GitHub Actions is in development you can get more information [here](https://github.com/tauri-apps/tauri-action/pull/924).
