# Mobile distribution

There are various ways to distribute mobile applications. In our case you will use [Ionic](https://ionicframework.com/) to build the mobile application and [Capacitor](https://capacitorjs.com/) to deploy it to the mobile devices.

For add in the project the mobile implementation, you need install [Ionic Extension Pack](https://marketplace.visualstudio.com/items?itemName=ionic.ionic) in Visual Studio Code.

After install the extension, you need `Add Capactior Integration` in the project.

![image](https://github.com/user-attachments/assets/f8e1dd12-a4f4-4833-b4fa-cd0af19431d8)

![image](https://github.com/user-attachments/assets/59eaab6b-3e4e-4696-8241-e0a08a69f146)

Open `capacitor.config.ts` and make sure `webDir` matches the folder intended for the build. If you have use the [template](/start/getting-started.md#project-initialization), the folder is `dist`.

```ts
// capacitor.config.ts
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'my.app',
  appName: 'my-app',
  webDir: 'dist'
};

export default config;
```

## Android

For Android, you need to install [Android Studio](https://developer.android.com/studio).

After install Android Studio, you must go to Ionic Extension `Add Android Project`.

![image](https://github.com/user-attachments/assets/aa576001-41ed-4e2a-9c1a-fb9326c383aa)

![image](https://github.com/user-attachments/assets/b004117b-34ba-4383-8e83-428a5f075550)

After add the Android project, you need `Build` and `Sync` the project, this way the android project will be updated with the latest changes in the main project.

![image](https://github.com/user-attachments/assets/593e2b73-d566-4c22-843d-1d581d515ad2)

You need to set the screenOrientatio, in the `android\app\src\main\AndroidManifest.xml`.

```xml
<!-- AndroidManifest.xml -->
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application>
        <activity
            <!-- For horizontal orientation -->
            android:screenOrientation="sensorLandscape"
            <!-- For vertical orientation -->
            android:screenOrientation="sensorPortrait"
            <!-- ... -->
            >
        </activity>
    </application>
</manifest>
```

Ok, now if everything went well, after Android studio has finished compiling the project,

![image](https://github.com/user-attachments/assets/f0d3561d-f147-400a-91d5-e611aa098996)

You can run the project on an emulator.

![image](https://github.com/user-attachments/assets/71be6155-18ec-4dd1-867d-bc698ac66caf)

### Run project on your android device

If you have an android device, you can run (and debug) the project on it.

First, you need to install the OpenJDK, you can download it from [Microsoft OpenJDK](https://www.microsoft.com/openjdk) and set the JAVA_HOME environment variable.

```bash
// Windows
$env:JAVA_HOME="C:\Program Files\Microsoft\jdk-21.0.4.7-hotspot"
// Linux
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
// MacOS
export JAVA_HOME=$(/usr/lib/jvm/java-11-openjdk-amd64)
```

Second, you need to **install the ADB** (Android Debug Bridge) and add ADB to your Path environment variables. You can read the instructions [here](https://www.xda-developers.com/install-adb-windows-macos-linux/).

After that, you need restart your computer.

Now, you need to enable `Developer Options` on your device and enable `USB Debugging`. After that, connect your device to your computer and run the project.

Ok, now you can go on Ionic Extension and run the project on your device (remenber to run `Build` and `Sync` before).

![image](https://github.com/user-attachments/assets/e559d9c3-ed07-47a4-8028-2b733e9a6ddf)

## iOS

For IOS the documentation is currently [under review](https://github.com/DRincs-Productions/pixi-vn/issues/245).

![image](https://github.com/user-attachments/assets/b39d87d5-07f0-4fb0-994b-def749876823)
