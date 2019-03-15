import testAuthentication from './commands/data/testAuthentication';
import addHashToPinQueue from './commands/pinning/addHashToPinQueue';

export default function pinataClient(pinataApiKey, pinataSecretApiKey) {
    let client = {};

    //  setting up the actual calls you can make using this package
    client.testAuthentication = function () {
        return testAuthentication(pinataApiKey, pinataSecretApiKey);
    };
    client.addHashToPinQueue = function (hashToPin, options) {
        return addHashToPinQueue(pinataApiKey, pinataSecretApiKey, hashToPin, options);
    };
    return client;
}
