// wwwroot/js/mfe-navigation.js
window.notifyShellNavigation = function (path) {
    console.log('MFE enviando path al Shell:', path);
    window.parent.postMessage(
        { type: 'mfe-navigation', path: path },
        '*'
    );
};