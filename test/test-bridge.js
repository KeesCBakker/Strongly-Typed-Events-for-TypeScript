if (typeof module === 'undefined') {

    //build a bridge for exports and module objects
    exports = window.exports || {};

    //build a bridge for require
    require = window.require || function (x) {

        //might be implemented as a global property
        if (typeof window[x] !== 'undefined') {
            console.log('Using window for: ' + x);
            return window[x];
        }

        //check if there is a script that used exports
        var tags = document.getElementsByTagName('script');
        var scripts = Array.prototype.slice.call(tags);

        var name = x;
        name = name.replace(/(\.|\/)/gi, '');

        var useExports = scripts.some(function (node) {
            return node.getAttribute('data-export') == name;
        });

        if (useExports) {
            console.log('Using exports for: ' + x);
            return exports;
        }

        return null;
    }
}