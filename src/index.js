import testAuthentication from './commands/testAuthentication';

export default function pinataClient(pinataApiKey, pinataSecretApiKey) {
    let client = {};

    //  setting up the actual calls you can make using this package
    client.testAuthentication = function () {
        return testAuthentication(pinataApiKey, pinataSecretApiKey);
    };
    return client;
}
