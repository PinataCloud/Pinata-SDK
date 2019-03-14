const testAuthentication = require('./commands/testAuthentication');
// const addHashToPinQueue = require('./commands/addHashToPinQueue');

function pinataClient (pinata_api_key, pinata_secret_api_key, options) {
    let client = {};
    const config = {
        pinata_api_key: pinata_api_key,
        pinata_secret_api_key: pinata_secret_api_key,
        options: options
    };
    //setting up the actual calls you can make using this package
    client.testAuthentication = testAuthentication(pinata_api_key, pinata_secret_api_key);
    // client.addHashToPinQueue = addHashToPinQueue(pinata_api_key, pinata_secret_api_key, options);

    return client
}

module.exports = pinataClient;