/**
 * SystemBars - Cordova plugin JS bridge
 *
 * Exposes window.SystemBars with three methods:
 *
 *   SystemBars.setAppearance(lightBars, [success], [error])
 *     Controls BOTH status bar AND navigation bar icon colour.
 *     lightBars = true  -> dark/black icons  (for light app backgrounds)
 *     lightBars = false -> light/white icons (for dark app backgrounds)
 *
 *   SystemBars.setStatusBarAppearance(lightBars, [success], [error])
 *     Controls status bar icons only.
 *
 *   SystemBars.setNavBarAppearance(lightBars, [success], [error])
 *     Controls navigation bar icons only.
 *
 * On iOS or browser platforms the calls are silently ignored (no-op).
 */

var exec = require('cordova/exec');

var PLUGIN = 'SystemBars';

function call(action, lightBars, successCb, errorCb) {
    if (typeof lightBars !== 'boolean') {
        lightBars = !!lightBars;
    }
    exec(
        successCb || function () {},
        errorCb   || function (e) { console.warn('[SystemBars]', e); },
        PLUGIN,
        action,
        [lightBars]
    );
}

var SystemBars = {
    /**
     * Set appearance for BOTH status bar and navigation bar.
     * @param {boolean} lightBars - true = dark icons, false = light icons
     */
    setAppearance: function (lightBars, successCb, errorCb) {
        call('setAppearance', lightBars, successCb, errorCb);
    },

    /**
     * Set appearance for STATUS BAR only.
     * @param {boolean} lightBars - true = dark icons, false = light icons
     */
    setStatusBarAppearance: function (lightBars, successCb, errorCb) {
        call('setStatusBarAppearance', lightBars, successCb, errorCb);
    },

    /**
     * Set appearance for NAVIGATION BAR only.
     * @param {boolean} lightBars - true = dark icons, false = light icons
     */
    setNavBarAppearance: function (lightBars, successCb, errorCb) {
        call('setNavBarAppearance', lightBars, successCb, errorCb);
    }
};

module.exports = SystemBars;
