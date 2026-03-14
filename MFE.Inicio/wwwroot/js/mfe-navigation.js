// wwwroot/js/mfe-navigation.js
window.notifyShellNavigation = function (path) {
    console.log('MFE enviando path al Shell:', path);
    window.parent.postMessage(
        { type: 'mfe-navigation', path: path },
        '*'
    );
};

// Detectar navegación automáticamente sin esperar a Blazor
(function () {
    let lastPath = window.location.pathname;

    // Observar cambios de URL cada 200ms
    setInterval(function () {
        if (window.location.pathname !== lastPath) {
            lastPath = window.location.pathname;
            console.log('MFE detectó navegación:', lastPath);
            window.notifyShellNavigation(lastPath);
        }
    }, 200);

    // También interceptar clicks en links
    document.addEventListener('click', function (e) {
        setTimeout(function () {
            if (window.location.pathname !== lastPath) {
                lastPath = window.location.pathname;
                window.notifyShellNavigation(lastPath);
            }
        }, 100);
    });
})();