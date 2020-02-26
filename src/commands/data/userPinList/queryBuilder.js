function validateAndReturnDate(dateToValidate) {
    let dateParsed = new Date(Date.parse(dateToValidate));

    try {
        if (dateParsed.toISOString() === dateToValidate) {
            return dateToValidate;
        }
        throw new Error('dates must be in valid ISO_8601 format');

    } catch (e) {
        throw new Error('dates must be in valid ISO_8601 format');
    }
}

export default function queryBuilder(baseUrl, filters) {
    if (!baseUrl) {
        throw new Error('no baseUrl provided');
    }

    //  preset filter values
    let hashContains = '*';

    let pinStart = '*';

    let pinEnd = '*';

    let unpinStart = '*';

    let unpinEnd = '*';

    let pinSizeMin = '*';

    let pinSizeMax = '*';

    let pinFilter = '*';

    let pageLimit = 10;

    let pageOffset = 0;

    let metadataQuery = '';

    if (filters) {
        //  now we need to construct the actual URL based on the given filters provided
        if (filters.hashContains) {
            if (typeof filters.hashContains !== 'string') {
                throw new Error('hashContains value is not a string');
            }
            hashContains = filters.hashContains;
        }
        if (filters.pinStart) {
            pinStart = validateAndReturnDate(filters.pinStart);
        }
        if (filters.pinEnd) {
            pinEnd = validateAndReturnDate(filters.pinEnd);
        }
        if (filters.unpinStart) {
            unpinStart = validateAndReturnDate(filters.unpinStart);
        }
        if (filters.unpinEnd) {
            unpinEnd = validateAndReturnDate(filters.unpinEnd);
        }
        if (filters.pinSizeMin) {
            if (isNaN(filters.pinSizeMin) || filters.pinSizeMin < 0) {
                throw new Error('Please make sure the pinSizeMin is a valid positive integer');
            }
            pinSizeMin = filters.pinSizeMin;
        }
        if (filters.pinSizeMax) {
            if (isNaN(filters.pinSizeMax) || filters.pinSizeMax < 0) {
                throw new Error('Please make sure the pinSizeMax is a valid positive integer');
            }
            pinSizeMax = filters.pinSizeMax;
        }
        if (filters.pinFilter) {
            if (filters.pinFilter !== 'all' && filters.pinFilter !== 'pinned' && filters.pinFilter !== 'unpinned') {
                throw new Error('pinFilter value must be either: all, pinned, or unpinned');
            }
            pinFilter = filters.pinFilter;
        }
        if (filters.pageLimit) {
            if (isNaN(filters.pageLimit) || filters.pageLimit <= 0 || filters.pageLimit > 1000) {
                throw new Error('Please make sure the pageLimit is a valid integer between 1-1000');
            }
            pageLimit = parseInt(filters.pageLimit); // we want to make sure that decimals get rounded to integers
        }

        if (filters.pageOffset) {
            if (isNaN(filters.pageOffset) || filters.pageOffset <= 0) {
                throw new Error('Please make sure the pageOffset is a positive integer');
            }
            pageOffset = parseInt(filters.pageOffset); // we want to make sure that decimals get rounded to integers
        }

        if (filters.metadata) {

            if (typeof filters.metadata !== 'object') {
                throw new Error('metadata value must be an object');
            }

            if (filters.metadata.name) {
                metadataQuery = `?metadata[name]=${filters.metadata.name}`;
            }

            if (filters.metadata.keyvalues) {

                if (typeof filters.metadata.keyvalues !== 'object') {
                    throw new Error('metadata keyvalues must be an object');
                }

                const prunedKeyValues = {}; // we want to make sure we're only grabbing the values we want for the query, and nothing extra

                Object.entries(filters.metadata.keyvalues).forEach((keyValue) => {
                    const key = keyValue[0];
                    const value = keyValue[1];

                    if (typeof value !== 'object') {
                        throw new Error(`keyValue: ${key} is not an object`);
                    }
                    if (!value || !value.value || !value.op) {
                        throw new Error(`keyValue: ${key} must have both value and op attributes`);
                    }
                    if ((typeof value.value !== 'string') && (typeof value.value !== 'boolean') && (typeof value.value !== 'number')) {
                        throw new Error('Metadata keyvalue values must be strings, booleans, or numbers');
                    }

                    // Run checks to make sure all of the keyvalues are valid
                    switch (value.op) {
                        case 'gt':
                            prunedKeyValues[key] = {
                                value: value.value,
                                op: value.op
                            };
                            break;
                        //greater than or equal
                        case 'gte':
                            prunedKeyValues[key] = {
                                value: value.value,
                                op: value.op
                            };
                            break;
                        // less than
                        case 'lt':
                            prunedKeyValues[key] = {
                                value: value.value,
                                op: value.op
                            };
                            break;
                        // less than or equal
                        case 'lte':
                            prunedKeyValues[key] = {
                                value: value.value,
                                op: value.op
                            };
                            break;
                        // not equal to
                        case 'ne':
                            prunedKeyValues[key] = {
                                value: value.value,
                                op: value.op
                            };
                            break;
                        // equal to
                        case 'eq':
                            prunedKeyValues[key] = {
                                value: value.value,
                                op: value.op
                            };
                            break;
                        // between
                        case 'between':
                            if (!value.secondValue) {
                                throw new Error(`Because between op code was passed in, keyValue: ${keyValue[0]} must have both also include a secondValue`);
                            }
                            if ((typeof value.secondValue !== 'string') && (typeof value.secondValue !== 'boolean') && (typeof value.secondValue !== 'number')) {
                                throw new Error('Metadata keyvalue secondValue must be a string, boolean, or number');
                            }
                            prunedKeyValues[key] = {
                                value: value.value,
                                op: value.op,
                                secondValue: value.secondValue
                            };
                            break;
                        // not between
                        case 'notBetween':
                            if (!value.secondValue) {
                                throw new Error(`Because notBetween op code was passed in, keyValue: ${keyValue[0]} must have both also include a secondValue`);
                            }
                            if ((typeof value.secondValue !== 'string') && (typeof value.secondValue !== 'boolean') && (typeof value.secondValue !== 'number')) {
                                throw new Error('Metadata keyvalue secondValue must be a string, boolean, or number');
                            }
                            prunedKeyValues[key] = {
                                value: value.value,
                                op: value.op,
                                secondValue: value.secondValue
                            };
                            break;
                        // like
                        case 'like':
                            prunedKeyValues[key] = {
                                value: value.value,
                                op: value.op
                            };
                            break;
                        // not like
                        case 'notLike':
                            prunedKeyValues[key] = {
                                value: value.value,
                                op: value.op
                            };
                            break;
                        // case insensitive like
                        case 'iLike':
                            prunedKeyValues[key] = {
                                value: value.value,
                                op: value.op
                            };
                            break;
                        // case insensitive not like
                        case 'notILike':
                            prunedKeyValues[key] = {
                                value: value.value,
                                op: value.op
                            };
                            break;
                        // regex
                        case 'regexp':
                            prunedKeyValues[key] = {
                                value: value.value,
                                op: value.op
                            };
                            break;
                        // case insensitive regex
                        case 'iRegexp':
                            prunedKeyValues[key] = {
                                value: value.value,
                                op: value.op
                            };
                            break;
                        default:
                            throw new Error(`keyValue op: ${value.op} is not a valid op code`);
                    }

                    metadataQuery = `${metadataQuery}${filters.metadata.name ? '&' : '?'}metadata[keyvalues]=${JSON.stringify(prunedKeyValues)}`;
                });
            }
        }
    }
    return `${baseUrl}/hashContains/${hashContains}/pinStart/${pinStart}/pinEnd/${pinEnd}/unpinStart/${unpinStart}/unpinEnd/${unpinEnd}/pinSizeMin/${pinSizeMin}/pinSizeMax/${pinSizeMax}/pinFilter/${pinFilter}/pageLimit/${pageLimit}/pageOffset/${pageOffset}${metadataQuery}`;
}

