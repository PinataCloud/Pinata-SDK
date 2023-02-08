import queryBuilder from '../../../../src/commands/data/pinList/queryBuilder';

const baseUrl = 'testing.com/test';
const noFiltersUrl = `${baseUrl}?`;
const validISODate = '2019-03-12T20:42:26.743Z';
const validInteger = 5;

describe('queryBuilder no params provided', () => {
    test('if no baseUrl is provided', () => {
        // expect(() => {
        //     queryBuilder();
        // }).toThrow('no baseUrl provided');
    });
    test('if no filters are provided, return a non filtered url', () => {
        expect(queryBuilder(baseUrl)).toEqual(noFiltersUrl);
    });
});

describe('queryBuilder filter: hashContains', () => {
    test('non string is provided', () => {
        const filters = {
            hashContains: {
                test: 'test'
            }
        };
        expect(() => {
            queryBuilder(baseUrl, filters);
        }).toThrow('hashContains value is not a string');
    });
    test('string value is provided', () => {
        const filters = {
            hashContains: 'test'
        };
        expect(queryBuilder(baseUrl, filters)).toEqual(`${baseUrl}?hashContains=test&`);
    });
});

describe('queryBuilder filter: pinStart', () => {
    test('non date is provided', () => {
        const filters = {
            pinStart: 'test'
        };
        expect(() => {
            queryBuilder(baseUrl, filters);
        }).toThrow('dates must be in valid ISO_8601 format');
    });
    test('date value is provided', () => {
        const filters = {
            pinStart: validISODate
        };
        expect(queryBuilder(baseUrl, filters)).toEqual(`${baseUrl}?pinStart=${validISODate}&`);
    });
});

describe('queryBuilder filter: pinEnd', () => {
    test('non date is provided', () => {
        const filters = {
            pinEnd: 'test'
        };
        expect(() => {
            queryBuilder(baseUrl, filters);
        }).toThrow('dates must be in valid ISO_8601 format');
    });
    test('date value is provided', () => {
        const filters = {
            pinEnd: validISODate
        };
        expect(queryBuilder(baseUrl, filters)).toEqual(`${baseUrl}?pinEnd=${validISODate}&`);
    });
});

describe('queryBuilder filter: unpinStart', () => {
    test('non date is provided', () => {
        const filters = {
            unpinStart: 'test'
        };
        expect(() => {
            queryBuilder(baseUrl, filters);
        }).toThrow('dates must be in valid ISO_8601 format');
    });
    test('date value is provided', () => {
        const filters = {
            unpinStart: validISODate
        };
        expect(queryBuilder(baseUrl, filters)).toEqual(`${baseUrl}?unpinStart=${validISODate}&`);
    });
});

describe('queryBuilder filter: unpinEnd', () => {
    test('non date is provided', () => {
        const filters = {
            unpinEnd: 'test'
        };
        expect(() => {
            queryBuilder(baseUrl, filters);
        }).toThrow('dates must be in valid ISO_8601 format');
    });
    test('date value is provided', () => {
        const filters = {
            unpinEnd: validISODate
        };
        expect(queryBuilder(baseUrl, filters)).toEqual(`${baseUrl}?unpinEnd=${validISODate}&`);
    });
});

describe('queryBuilder filter: pinSizeMin', () => {
    test('non number is provided', () => {
        const filters = {
            pinSizeMin: 'test'
        };
        expect(() => {
            queryBuilder(baseUrl, filters);
        }).toThrow('Please make sure the pinSizeMin is a valid positive integer');
    });
    test('date value is provided', () => {
        const filters = {
            pinSizeMin: validInteger
        };
        expect(queryBuilder(baseUrl, filters)).toEqual(`${baseUrl}?pinSizeMin=${validInteger}&`);
    });
});

describe('queryBuilder filter: pinSizeMax', () => {
    test('non number is provided', () => {
        const filters = {
            pinSizeMax: 'test'
        };
        expect(() => {
            queryBuilder(baseUrl, filters);
        }).toThrow('Please make sure the pinSizeMax is a valid positive integer');
    });
    test('date value is provided', () => {
        const filters = {
            pinSizeMax: validInteger
        };
        expect(queryBuilder(baseUrl, filters)).toEqual(`${baseUrl}?pinSizeMax=${validInteger}&`);
    });
});

describe('queryBuilder filter: status', () => {
    test('non accepted value is passed in', () => {
        const filters = {
            status: 'test'
        };
        expect(() => {
            queryBuilder(baseUrl, filters);
        }).toThrow('status value must be either: all, pinned, or unpinned');
    });
    test('valid status is provided', () => {
        const validInput = 'pinned';
        const filters = {
            status: validInput
        };
        expect(queryBuilder(baseUrl, filters)).toEqual(`${baseUrl}?status=${validInput}&`);
    });
});

describe('queryBuilder filter: pageLimit', () => {
    test('non integer pageLimit is passed in', () => {
        const filters = {
            pageLimit: 'test'
        };
        expect(() => {
            queryBuilder(baseUrl, filters);
        }).toThrow('Please make sure the pageLimit is a valid integer between 1-1000');
    });
    test('non valid pageLimit is passed in', () => {
        const filters = {
            pageLimit: 1001
        };
        expect(() => {
            queryBuilder(baseUrl, filters);
        }).toThrow('Please make sure the pageLimit is a valid integer between 1-1000');
    });
    test('Decimal is passed in - expect to round down', () => {
        const filters = {
            pageLimit: 500.7
        };
        expect(queryBuilder(baseUrl, filters)).toEqual(`${baseUrl}?pageLimit=500&`);

    });
    test('valid pageLimit is provided', () => {
        const validInput = 500;
        const filters = {
            pageLimit: validInput
        };
        expect(queryBuilder(baseUrl, filters)).toEqual(`${baseUrl}?pageLimit=${validInput}&`);
    });
});

describe('queryBuilder filter: pageOffset', () => {
    test('non integer pageOffset is passed in', () => {
        const filters = {
            pageOffset: 'test'
        };
        expect(() => {
            queryBuilder(baseUrl, filters);
        }).toThrow('Please make sure the pageOffset is a positive integer');
    });
    test('non valid pageOffset is passed in', () => {
        const filters = {
            pageOffset: '-1'
        };
        expect(() => {
            queryBuilder(baseUrl, filters);
        }).toThrow('Please make sure the pageOffset is a positive integer');
    });
    test('Decimal is passed in - expect to round down', () => {
        const filters = {
            pageOffset: 500.7
        };
        expect(queryBuilder(baseUrl, filters)).toEqual(`${baseUrl}?pageOffset=500&`);
    });
    test('valid pageOffset is provided', () => {
        const validInput = 500;
        const filters = {
            pageOffset: validInput
        };
        expect(queryBuilder(baseUrl, filters)).toEqual(`${baseUrl}?pageOffset=${validInput}&`);
    });
});

describe('metadata provided', () => {
    test('metadata is not an object', () => {
        const filters = {
            metadata: 'test'
        };
        expect(() => {
            queryBuilder(baseUrl, filters);
        }).toThrow('metadata value must be an object');
    });
    test('metadata name value provided', () => {
        const name = 'testName';
        const filters = {
            metadata: {
                name: name
            }
        };
        expect(queryBuilder(baseUrl, filters)).toEqual(`${baseUrl}?metadata[name]=${name}&`);
    });
    test('metadata keyvalues is not an object', () => {
        const filters = {
            metadata: {
                keyvalues: 'test'
            }
        };
        expect(() => {
            queryBuilder(baseUrl, filters);
        }).toThrow('metadata keyvalues must be an object');
    });
    test('individual keyvalue is not an object', () => {
        const filters = {
            metadata: {
                keyvalues: {
                    testKeyValue: 'nonObject'
                }
            }
        };
        expect(() => {
            queryBuilder(baseUrl, filters);
        }).toThrow('keyValue: testKeyValue is not an object');
    });
    test('individual keyvalue does not have value or op attributes', () => {
        const filters = {
            metadata: {
                keyvalues: {
                    testKeyValue: {
                        test: 'test'
                    }
                }
            }
        };
        expect(() => {
            queryBuilder(baseUrl, filters);
        }).toThrow('keyValue: testKeyValue must have both value and op attributes');
    });
    test('individual keyvalue value is an object type', () => {
        const filters = {
            metadata: {
                keyvalues: {
                    testKeyValue: {
                        value: {
                            objectType: 'test'
                        },
                        op: 'test'
                    }
                }
            }
        };
        expect(() => {
            queryBuilder(baseUrl, filters);
        }).toThrow('Metadata keyvalue values must be strings, booleans, or numbers');
    });
    test('individual keyvalue op code is not valid', () => {
        const filters = {
            metadata: {
                keyvalues: {
                    testKeyValue: {
                        value: 'test',
                        op: 'invalid'
                    }
                }
            }
        };
        expect(() => {
            queryBuilder(baseUrl, filters);
        }).toThrow('keyValue op: invalid is not a valid op code');
    });
    test('between op code passed in, but only one value provided', () => {
        const filters = {
            metadata: {
                keyvalues: {
                    testKeyValue: {
                        value: 'test',
                        op: 'between'
                    }
                }
            }
        };
        expect(() => {
            queryBuilder(baseUrl, filters);
        }).toThrow('Because between op code was passed in, keyValue: testKeyValue must have both also include a secondValue');
    });
    test('between op code passed in, but object passed in as secondValue', () => {
        const filters = {
            metadata: {
                keyvalues: {
                    testKeyValue: {
                        value: 'test',
                        secondValue: {
                            test: 'test'
                        },
                        op: 'between'
                    }
                }
            }
        };
        expect(() => {
            queryBuilder(baseUrl, filters);
        }).toThrow('Metadata keyvalue secondValue must be a string, boolean, or number');
    });
    test('notBetween op code passed in, but only one value provided', () => {
        const filters = {
            metadata: {
                keyvalues: {
                    testKeyValue: {
                        value: 'test',
                        op: 'notBetween'
                    }
                }
            }
        };
        expect(() => {
            queryBuilder(baseUrl, filters);
        }).toThrow('Because notBetween op code was passed in, keyValue: testKeyValue must have both also include a secondValue');
    });
    test('notBetween op code passed in, but object passed in as secondValue', () => {
        const filters = {
            metadata: {
                keyvalues: {
                    testKeyValue: {
                        value: 'test',
                        secondValue: {
                            test: 'test'
                        },
                        op: 'notBetween'
                    }
                }
            }
        };
        expect(() => {
            queryBuilder(baseUrl, filters);
        }).toThrow('Metadata keyvalue secondValue must be a string, boolean, or number');
    });
    test('Pass in a valid keyvalue object', () => {
        const filters = {
            metadata: {
                keyvalues: {
                    testKeyValue: {
                        value: 'test',
                        op: 'eq'
                    }
                }
            }
        };
        const query = JSON.stringify(filters.metadata.keyvalues);
        expect(queryBuilder(baseUrl, filters)).toEqual(`${baseUrl}?metadata[keyvalues]=${query}`);
    });
    test('Pass in a valid keyvalue object with two parameters', () => {
        const filters = {
            metadata: {
                keyvalues: {
                    testKeyValue: {
                        value: 'test',
                        op: 'eq'
                    },
                    testKeyValue2: {
                        value: 'test2',
                        op: 'eq'
                    }
                }
            }
        };
        const query = JSON.stringify(filters.metadata.keyvalues);
        expect(queryBuilder(baseUrl, filters)).toEqual(`${baseUrl}?metadata[keyvalues]=${query}`);
    });
    test('Pass in a valid keyvalue object with a secondValue', () => {
        const filters = {
            metadata: {
                keyvalues: {
                    testKeyValue: {
                        value: 'test',
                        op: 'between',
                        secondValue: 'test2'
                    }
                }
            }
        };
        const query = JSON.stringify(filters.metadata.keyvalues);
        expect(queryBuilder(baseUrl, filters)).toEqual(`${baseUrl}?metadata[keyvalues]=${query}`);
    });
    test('Pass in a valid name and keyvalue object with a secondValue', () => {
        const testName = 'testName';
        const filters = {
            metadata: {
                name: testName,
                keyvalues: {
                    testKeyValue: {
                        value: 'test',
                        op: 'between',
                        secondValue: 'test2'
                    }
                }
            }
        };
        const query = JSON.stringify(filters.metadata.keyvalues);
        expect(queryBuilder(baseUrl, filters)).toEqual(`${baseUrl}?metadata[name]=${testName}&metadata[keyvalues]=${query}`);
    });
});
