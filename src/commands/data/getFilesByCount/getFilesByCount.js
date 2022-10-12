import { validateApiKeys } from '../../../util/validators';
import pinList from '../pinList/pinList';

export default function getFilesByCount(
    pinataApiKey,
    pinataSecretApiKey,
    maxCount,
    filters
) {
    validateApiKeys(pinataApiKey, pinataSecretApiKey);
    if (!maxCount) {
        throw Error('Max count needs to be defined ');
    }

    const asyncIterable = {
        [Symbol.asyncIterator]: () => {
            let i = 0;
            const pageLimit = 10;
            let pageOffset = 0;
            let cache = [];
            let keepLooping = false;

            return {
                next() {
                    return new Promise((resolve, reject) => {
                        if (i === 0 || (i % pageLimit === 0 && keepLooping)) {
                            resolve(
                                pinList(pinataApiKey, pinataSecretApiKey, {
                                    filters,
                                    ...{ pageOffset, pageLimit }
                                }).then((resp) => {
                                    cache = resp.rows;
                                    pageOffset = pageOffset + cache.length;
                                    keepLooping = cache.length !== 0 && i < maxCount ;
                                })
                            );
                        }
                        resolve();
                    }).then(() => {
                        const valueToReturn = cache[i % pageLimit];
                        const done = !(i < maxCount && keepLooping);

                        i++;
                        return Promise.resolve({
                            value: valueToReturn,
                            done
                        });
                    });
                },
                return() {
                    // This will be reached if the consumer called 'break' or 'return' early in the loop.
                    return Promise.resolve({ value: i, done: true });
                }
            };
        }
    };

    return asyncIterable;
}
