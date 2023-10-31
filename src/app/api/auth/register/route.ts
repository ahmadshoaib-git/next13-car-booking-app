import { userValidator } from '@/components/modules/Form/signIn.validation';
import { NextResponse } from 'next/server';
import { GeneralService } from '@/services/generalServices';
import { getEnvVariable } from '@/lib/helpers';
import { signJWT } from '@/lib/token';

export async function POST(request: Request) {
    try {
        const { email, password, firstName, lastName } = await request.json();
        const isValid = userValidator.safeParse({ email, password });
        console.log(isValid);
        if (!isValid.success) return NextResponse.json({ error: isValid.error.issues[0].message }, { status: 400 });
        if (await GeneralService.CheckUserExists(email)) return NextResponse.json({ error: `User with email '${email}' already exists` }, { status: 400 });
        const newUser = await GeneralService.createUser({ email, password, firstName, lastName });
        const JWT_EXPIRES_IN = getEnvVariable('JWT_EXPIRES_IN');

        const token = await signJWT(
            { sub: newUser.id.toString(), firstName: newUser.firstName, lastName: newUser.lastName, email: newUser.email },
            { exp: `${JWT_EXPIRES_IN}m` },
        );

        const tokenMaxAge = parseInt(JWT_EXPIRES_IN) * 60;
        const cookieOptions = {
            name: 'token',
            value: token,
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV !== 'development',
            maxAge: tokenMaxAge,
        };

        const response = new NextResponse(
            JSON.stringify({
                status: 'success',
                token,
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            },
        );

        await Promise.all([
            response.cookies.set(cookieOptions),
            response.cookies.set({
                name: 'logged-in',
                value: 'true',
                maxAge: tokenMaxAge,
            }),
        ]);

        return response;
    } catch (err) {
        console.log({ err });
        return NextResponse.json({ message: { err } }, { status: 500 });
    }
}

