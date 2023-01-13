import { Buffer } from 'buffer';

export default (() => {
    if (typeof global === 'undefined' || !global || !global._babelPolyfill) {
        require('babel-polyfill');
    }

    if (window) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.Buffer = Buffer;
    }
})();
