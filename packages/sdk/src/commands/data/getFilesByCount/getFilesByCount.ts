import { PinataConfig } from '../../..';
import pinList, { PinataPin, PinataPinListFilterOptions } from '../pinList/pinList';

export default function getFilesByCount(
    config: PinataConfig,

    filters: PinataPinListFilterOptions = {},
    maxCount = -1
) {
    if (maxCount === 0) {
        throw Error("Max count can't be 0");
    }

    const asyncIterable = {
        [Symbol.asyncIterator]: () => {
            let i = 0;
            const pageLimit = 10;
            let pageOffset = 0;
            let cache: PinataPin[] = [];
            let keepLooping = false;

            return {
                next() {
                    return new Promise((resolve, reject) => {
                        if (i === 0 || (i % pageLimit === 0 && keepLooping)) {
                            resolve(
                                pinList(config, {
                                    ...filters,
                                    ...{ pageOffset, pageLimit }
                                }).then((resp) => {
                                    cache = resp.rows;
                                    pageOffset = pageOffset + cache.length;

                                    // If the user requested all pins we have to keep looping if the limit page was not fulfill
                                    keepLooping =
                                        cache.length !== 0 &&
                                        (maxCount === -1 ? cache.length === pageLimit : i < maxCount);
                                })
                            );
                        }
                        resolve(0);
                    }).then(() => {
                        const valueToReturn = cache[i % pageLimit];

                        const done = !(
                            (maxCount === -1 ? i < pageOffset : i < maxCount) &&
                            keepLooping
                        );

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
