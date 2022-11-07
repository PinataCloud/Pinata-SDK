export default (() => {
    if (!global || !global._babelPolyfill) {
        require('babel-polyfill');
    }
})();
