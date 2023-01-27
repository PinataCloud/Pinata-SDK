import { createHTTPService } from './RequestHandler';

const SUBMARINEAPI_URL = 'https://app.submarine.me';

const submarineClientAPI = createHTTPService(SUBMARINEAPI_URL);

export async function verifyLocation(
    latitude: number,
    longitude: number,
    shortId: string
) {
    const resp = await submarineClientAPI.post('api/location/verify', {
        userLat: latitude,
        userLong: longitude,
        shortId: shortId
    });

    return resp;
}

export async function verifyContract(contract: string, shortId: string) {
    const resp = await submarineClientAPI.get('api/verify', {
        params: {
            contract,
            shortId
        }
    });

    return resp;
}

export async function verifyWallet(data) {
    const resp = await submarineClientAPI.post('api/verify', {
        data
    });

    return resp;
}
