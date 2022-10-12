export default function getFilesByCount(pinataApiKey: any, pinataSecretApiKey: any, maxCount: any, filters: any): {
    [Symbol.asyncIterator]: () => {
        next(): Promise<{
            value: any;
            done: boolean;
        }>;
        return(): Promise<{
            value: number;
            done: boolean;
        }>;
    };
};
