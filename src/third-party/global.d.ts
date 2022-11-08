export {};

declare global {
    namespace NodeJS {
      interface Global {
        _babelPolyfill: any;
      }
    }
  }
