# cordova-plugin-systembars

Controls Android 15 (SDK 35) system bar **icon colour** — status bar and navigation bar — without breaking Edge-to-Edge transparency.

Built for **OutSystems MABS 12** + **Android 15** using `WindowInsetsControllerCompat` (the API recommended by Google for SDK 35+).

## Why this plugin?

On Android 15, bars are forced transparent. Old plugins (StatusBar, etc.) break Edge-to-Edge by applying solid colours. This plugin **only touches icon appearance** — backgrounds stay fully transparent.

## Installation (OutSystems)

In **Extensibility Configurations** of your OutSystems Mobile App:

```json
{
    "preferences": {
        "android": [
            { "name": "AndroidEdgeToEdge", "value": "true" }
        ]
    },
    "plugins": [
        {
            "url": "https://github.com/YOUR_USER/cordova-plugin-systembars/archive/refs/heads/main.zip"
        }
    ]
}
```

> Replace `YOUR_USER` with your GitHub username after forking/uploading.

## JavaScript API

```js
// Both bars — dark icons (use on light/white backgrounds)
window.SystemBars.setDarkIcons();

// Both bars — light icons (use on dark backgrounds)
window.SystemBars.setLightIcons();

// Status bar only
window.SystemBars.setStatusDarkIcons();
window.SystemBars.setStatusLightIcons();

// Navigation bar only
window.SystemBars.setNavDarkIcons();
window.SystemBars.setNavLightIcons();

// With callbacks
window.SystemBars.setDarkIcons(
    function() { console.log('OK'); },
    function(e) { console.error('Error:', e); }
);
```

## Logic summary

| Method | Icon colour | Use when background is... |
|---|---|---|
| `setDarkIcons()` | ⚫ Dark/Black | Light (white, grey, etc.) |
| `setLightIcons()` | ⚪ Light/White | Dark |

## OutSystems usage pattern

Create a **Client Action** for each case and call it in `OnReady` of each Screen:

```js
// "SetDarkSystemIcons" — for screens with light backgrounds
if (window.SystemBars) {
    window.SystemBars.setDarkIcons();
}

// "SetLightSystemIcons" — for screens with dark backgrounds
if (window.SystemBars) {
    window.SystemBars.setLightIcons();
}
```

## Platform support

| Platform | Support |
|---|---|
| Android 15 (SDK 35) | ✅ Full |
| Android 10–14 | ✅ Compatible (via AndroidX compat layer) |
| iOS | ✅ No-op (ignored gracefully) |
| Browser/Preview | ✅ No-op (ignored gracefully) |

## Compatibility

- MABS 12+
- Cordova Android 10+
- AndroidX Core 1.12+

## License

MIT
