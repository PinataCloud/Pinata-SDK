declare module 'recursive-fs' {
    export function readdirr(sourcePath: string, callback: (err: any, dirs: any, files: any) => void): void

}

