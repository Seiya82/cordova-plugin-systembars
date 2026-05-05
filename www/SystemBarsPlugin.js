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
    exec(
        successCb || function () {},
        errorCb   || function (e) { console.warn('[SystemBars]', e); },
        PLUGIN,
        action,
        [lightBars]
    );
}

var SystemBars = {

    // Both
    setDarkIcons: function (successCb, errorCb) {
        call('setAppearance', true, successCb, errorCb);
    },
    setLightIcons: function (successCb, errorCb) {
        call('setAppearance', false, successCb, errorCb);
    },

    // Only status bar
    setStatusDarkIcons: function (successCb, errorCb) {
        call('setStatusBarAppearance', true, successCb, errorCb);
    },
    setStatusLightIcons: function (successCb, errorCb) {
        call('setStatusBarAppearance', false, successCb, errorCb);
    },

    // Only navigation bar
    setNavDarkIcons: function (successCb, errorCb) {
        call('setNavBarAppearance', true, successCb, errorCb);
    },
    setNavLightIcons: function (successCb, errorCb) {
        call('setNavBarAppearance', false, successCb, errorCb);
    }

};

module.exports = SystemBars;
