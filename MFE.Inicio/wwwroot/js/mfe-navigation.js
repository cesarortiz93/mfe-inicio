// wwwroot/js/mfe-navigation.js
window.notifyShellNavigation = function (path) {
    // Limpiar el prefijo /mfe-inicio/, /mfe-portafolio/, /mfe-siniestros/
    var cleanPath = path.replace(/^\/mfe-[^/]+/, '');
    console.log('[MFE] enviando path limpio:', cleanPath);

    sessionStorage.setItem('mfe_last_path', cleanPath);

    window.parent.postMessage(
        { type: 'mfe-navigation', path: cleanPath },
        '*'
    );
};

// Detectar navegación automáticamente sin esperar a Blazor
(function () {
    let lastPath = window.location.pathname;

    // Notificar la ruta inicial
    setTimeout(function () {
        window.notifyShellNavigation(lastPath);
    }, 500);

    setInterval(function () {
        if (window.location.pathname !== lastPath) {
            lastPath = window.location.pathname;
            window.notifyShellNavigation(lastPath);
        }
    }, 200);
})();