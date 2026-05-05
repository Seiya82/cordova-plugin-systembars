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
// ✅ Both bars — dark icons (use on light/white backgrounds)
window.SystemBars.setAppearance(true);

// ✅ Both bars — light icons (use on dark backgrounds)
window.SystemBars.setAppearance(false);

// ✅ Status bar only
window.SystemBars.setStatusBarAppearance(true);

// ✅ Navigation bar only
window.SystemBars.setNavBarAppearance(true);

// With callbacks
window.SystemBars.setAppearance(true,
    function() { console.log('OK'); },
    function(e) { console.error('Error:', e); }
);
```

## Logic summary

| `lightBars` value | Icon colour | Use when background is... |
|---|---|---|
| `true` | ⚫ Dark/Black | Light (white, grey, etc.) |
| `false` | ⚪ Light/White | Dark |

## OutSystems usage pattern

Create a **Client Action** `SetSystemBarsAppearance` with Input `IsLightBackground (Boolean)`:

```js
if (window.SystemBars) {
    window.SystemBars.setAppearance($parameters.IsLightBackground);
}
```

Call it in `OnReady` of each Screen passing `True` or `False` depending on the screen theme.

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
