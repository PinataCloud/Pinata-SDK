declare module 'is-ipfs' {
    export function cid (cid: string): boolean
    export function isPeerMultiaddr(addr: string): boolean;
    export function peerMultiaddr(addr: string): boolean;
}
