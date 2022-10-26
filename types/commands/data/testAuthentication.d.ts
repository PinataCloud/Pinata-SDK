import { PinataConfig } from '../..';
export interface PinataTestAuthenticationResponse {
    authenticated: boolean;
}
export default function testAuthentication(config: PinataConfig): Promise<PinataTestAuthenticationResponse>;
