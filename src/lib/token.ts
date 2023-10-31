import { SignJWT, jwtVerify } from 'jose';

export const signJWT = async (payload: { sub: string; firstName: string; lastName: string; email: string }, options: { exp: string }) => {
    try {
        const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_GEN);
        const alg = 'HS256';
        return new SignJWT(payload).setProtectedHeader({ alg }).setExpirationTime(options.exp).setIssuedAt().setSubject(payload.sub).sign(secret);
    } catch (error) {
        throw error;
    }
};

export const verifyJWT = async <T>(token: string): Promise<T> => {
    try {
        console.log('verifyJWT');
        const verifiedToken = (await jwtVerify(token, new TextEncoder().encode(process.env.ACCESS_TOKEN_GEN))).payload as T;
        console.log('Token Verified >', verifiedToken);
        return verifiedToken;
    } catch (error) {
        console.log('verifyJWT >', error);
        throw new Error('Your token has expired.');
    }
};

