package com.outsystems.plugins.systembars;

import android.app.Activity;
import android.view.Window;

import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsControllerCompat;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;

/**
 * SystemBarsPlugin - Android 15 / SDK 35 compatible
 *
 * Controls the APPEARANCE (icon colour) of status bar and navigation bar
 * without touching bar background colours - Edge-to-Edge transparency is
 * fully preserved.
 *
 * Uses WindowInsetsControllerCompat (AndroidX), the API recommended by
 * Google for SDK 35+ instead of deprecated View flags or Window flags.
 *
 * Actions:
 *   setAppearance(lightBars: boolean)
 *     true  -> "Light bars" mode -> icons are DARK/BLACK  (use on light backgrounds)
 *     false -> "Dark bars" mode  -> icons are LIGHT/WHITE (use on dark backgrounds)
 *
 *   setStatusBarAppearance(lightBars: boolean)   -- status bar only
 *   setNavBarAppearance(lightBars: boolean)       -- navigation bar only
 */
public class SystemBarsPlugin extends CordovaPlugin {

    private static final String ACTION_SET_BOTH   = "setAppearance";
    private static final String ACTION_SET_STATUS = "setStatusBarAppearance";
    private static final String ACTION_SET_NAV    = "setNavBarAppearance";

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext)
            throws JSONException {

        boolean lightBars = args.length() > 0 && args.getBoolean(0);

        switch (action) {
            case ACTION_SET_BOTH:
                applyAppearance(lightBars, true, true, callbackContext);
                return true;
            case ACTION_SET_STATUS:
                applyAppearance(lightBars, true, false, callbackContext);
                return true;
            case ACTION_SET_NAV:
                applyAppearance(lightBars, false, true, callbackContext);
                return true;
            default:
                return false;
        }
    }

    private void applyAppearance(
            boolean lightBars,
            boolean applyStatus,
            boolean applyNav,
            CallbackContext callbackContext) {

        Activity activity = cordova.getActivity();

        activity.runOnUiThread(() -> {
            try {
                Window window = activity.getWindow();
                WindowInsetsControllerCompat controller =
                    WindowCompat.getInsetsController(window, window.getDecorView());

                if (controller == null) {
                    callbackContext.error("WindowInsetsControllerCompat not available");
                    return;
                }

                // lightBars = true  -> APPEARANCE_LIGHT_*_BARS set    -> dark icons
                // lightBars = false -> APPEARANCE_LIGHT_*_BARS cleared -> light icons
                if (applyStatus) {
                    controller.setAppearanceLightStatusBars(lightBars);
                }
                if (applyNav) {
                    controller.setAppearanceLightNavigationBars(lightBars);
                }

                callbackContext.success();

            } catch (Exception e) {
                callbackContext.error("SystemBars error: " + e.getMessage());
            }
        });
    }
}
