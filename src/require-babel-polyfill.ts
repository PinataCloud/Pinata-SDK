export default (() => {
    if (typeof global === 'undefined' || !global || !global._babelPolyfill) {
        require('babel-polyfill');
    }
})();
