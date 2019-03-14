const testAuthentication = require('../../src/commands/testAuthentication');

test('check to throw if either pinataApiKey or pinataSecretApiKey are not provided', () => {
    expect(() => {
        testAuthentication('', 'test');
    }).toThrow();
    expect(() => {
        testAuthentication('test', '');
    }).toThrow();
});
