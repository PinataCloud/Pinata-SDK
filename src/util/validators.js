import isIPFS from 'is-ipfs';

/**
 * Validate API Keys
 * @param {string} pinataApiKey
 * @param {string} pinataSecretApiKey
 */
export function validateApiKeys(pinataApiKey, pinataSecretApiKey) {
    if (!pinataApiKey || pinataApiKey === '') {
        throw new Error('No pinataApiKey provided! Please provide your pinata api key as an argument when you start this script');
    }
    if (!pinataSecretApiKey || pinataSecretApiKey === '') {
        throw new Error('No pinataSecretApiKey provided! Please provide your pinata secret api key as an argument when you start this script');
    }
}

/**
 * Validate host Nodes
 * @param {*} hostNodes
 */
export function validateHostNodes(hostNodes) {
    if (!Array.isArray(hostNodes)) {
        throw new Error('host_nodes value must be an array');
    }
    hostNodes.forEach((node) => {
        if (!isIPFS.peerMultiaddr(node)) {
            throw new Error(`host_node array entry: ${node} is not a valid peer multiaddr`);
        }
    });
}

/**
 * Validate MetaData
 * @param {*} metadata
 */
export function validateMetadata(metadata) {
    if (metadata.name) {
        if (!(typeof metadata.name === 'string' || metadata.name instanceof String)) {
            throw new Error('metadata name must be of type string');
        }
    }

    if (metadata.keyvalues) {
        if (!(typeof metadata.keyvalues === 'object')) {
            throw new Error('metatadata keyvalues must be an object');
        }

        let i = 0;

        Object.entries(metadata.keyvalues).forEach(function (keyValue) {
            if (i > 9) {
                throw new Error('No more than 10 keyvalues can be provided for metadata entries');
            }
            //  we want to make sure that the input is a string, a boolean, or a number, so we don't get an object passed in by accident
            if (!(typeof keyValue[1] === 'string' || typeof keyValue[1] === 'boolean' || !isNaN(keyValue[1]))) {
                throw new Error('Metadata keyvalue values must be strings, booleans, or numbers');
            }
            i++;
        });
    }
}

/**
 * Validate Pin Policy Structure
 * @param {*} pinPolicy
 */
export function validatePinPolicyStructure(pinPolicy) {
    //this function takes in a pin policy and checks the JSON structure to make sure it's valid
    if (!pinPolicy) {
        throw new Error('No pin policy provided');
    }

    if (!pinPolicy.regions) {
        throw new Error('No regions provided in pin policy');
    }
    if (pinPolicy.regions.length) {
        pinPolicy.regions.forEach((region) => {
            if (!region.id || !(Object.prototype.toString.call(region.id) === '[object String]')) {
                throw new Error('region id must be a string');
            }

            if (!(region.desiredReplicationCount || region.desiredReplicationCount === 0) || !Number.isInteger(region.desiredReplicationCount)) {
                throw new Error('desiredReplicationCount must be an integer');
            }
        });
    }
}

/**
 * Validate Pinata Options
 * @param {*} options
 */
export function validatePinataOptions(options) {
    if (typeof options !== 'object') {
        throw new Error('options must be an object');
    }

    if (options.cidVersion) {
        // eslint-disable-next-line eqeqeq
        if (options.cidVersion != 0 && options.cidVersion != 1) {
            throw new Error('unsupported or invalid cidVersion');
        }
    }
    if (options.wrapWithDirectory) {
        // eslint-disable-next-line eqeqeq
        if (options.wrapWithDirectory !== true && options.wrapWithDirectory !== false) {
            throw new Error('wrapWithDirectory must be a boolean value of true or false');
        }
    }

    if (options.hostNodes) {
        validateHostNodes(options.hostNodes);
    }

    if (options.customPinPolicy) {
        validatePinPolicyStructure(options.customPinPolicy);
    }
}
