export default function getFilesByCount(pinataApiKey: any, pinataSecretApiKey: any, filters?: {}, maxCount?: number): {
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
