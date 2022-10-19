export default function getFilesByCount(config: any, filters?: {}, maxCount?: number): {
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
