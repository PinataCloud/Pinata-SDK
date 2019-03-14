const axios = require('axios');
const apiUrl = require('./../constants').apiUrl;

module.exports = async (pinataApiKey, pinataSecretApiKey) => {
    if(!pinataApiKey || pinataApiKey === '') {
        throw new Error('Error: No pinataApiKey provided! Please provide your pinata api key as an argument when you start this script')
    }
    if(!pinataSecretApiKey || pinataSecretApiKey === '') {
        throw new Error('Error: No pinataSecretApiKey provided! Please provide your pinata secret api key as an argument when you start this script')
    }

    //test authentication to make sure that the user's provided keys are legit
    const testAuthenticationUrl = `${apiUrl}/data/testAuthentication`;
    return await axios.get(
        testAuthenticationUrl,
        {
            headers: {
                'pinata_api_key': pinataApiKey,
                'pinata_secret_api_key': pinataSecretApiKey
            }
        }).then(function () {
            return 'authenticated';
        }).catch(function (error) {
            //handle error here
            if(error && error.response && error.response && error.response.data && error.response.data.error ) {
                return `Error: ${error.response.data.error}`;
            } else {
                return`Error: ${error}`;
            }
        });
};