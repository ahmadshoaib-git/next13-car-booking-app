import { userValidator } from '@/components/modules/Form/signIn.validation';
import { getEnvVariable, getErrorResponse } from '@/lib/helpers';
import { signJWT } from '@/lib/token';
import { compare } from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { prisma } from '../../../../../lib/prisma';

interface LoginUserInput {
    email: string;
    password: string;
}
// Config CORS
// ========================================================
/**
 *
 * @param origin
 * @returns
 */
const getCorsHeaders = (origin: string) => {
    // Default options
    const headers = {
        'Access-Control-Allow-Methods': `${process.env.ALLOWED_METHODS}`,
        'Access-Control-Allow-Headers': `${process.env.ALLOWED_HEADERS}`,
        'Access-Control-Allow-Origin': `${process.env.DOMAIN_URL}`,
    };

    // If no allowed origin is set to default server origin
    if (!process.env.ALLOWED_ORIGIN || !origin) return headers;

    // If allowed origin is set, check if origin is in allowed origins
    const allowedOrigins = process.env.ALLOWED_ORIGIN.split(',');

    // Validate server origin
    if (allowedOrigins.includes('*')) {
        headers['Access-Control-Allow-Origin'] = '*';
    } else if (allowedOrigins.includes(origin)) {
        headers['Access-Control-Allow-Origin'] = origin;
    }

    // Return result
    return headers;
};

// Endpoints
// ========================================================
/**
 * Basic OPTIONS Request to simuluate OPTIONS preflight request for mutative requests
 */
export const OPTIONS = async (request: NextRequest) => {
    // Return Response
    return NextResponse.json(
        {},
        {
            status: 200,
            headers: getCorsHeaders(request.headers.get('origin') || ''),
        },
    );
};

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as LoginUserInput;
        console.log('============== >>> ', body);
        // const allowedOrigin = req.headers.get('origin');
        const { email, password } = body;
        const isValid = userValidator.safeParse({ email, password });

        if (!isValid.success) return NextResponse.json({ error: isValid.error.issues[0].message }, { status: 400 });

        const user = await prisma.user.findUnique({
            where: { email: body.email },
        });

        console.log('user >', user);

        if (!user || !(await compare(body.password, user.password))) {
            return getErrorResponse(401, 'Invalid email or password');
        }

        const JWT_EXPIRES_IN = getEnvVariable('JWT_EXPIRES_IN');

        const token = await signJWT(
            { sub: user.id.toString(), email: user.email, firstName: user.firstName, lastName: user.lastName },
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

        const headers: any = getCorsHeaders(req.headers.get('origin') || '');
        headers['Content-Type'] = 'application/json';
        const response = new NextResponse(
            JSON.stringify({
                status: 'success',
                token,
            }),
            {
                status: 200,
                headers: headers,
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
    } catch (error: any) {
        if (error instanceof ZodError) {
            return getErrorResponse(400, 'failed validations', error);
        }
        return getErrorResponse(500, error.message);
    }
}

// export async function OPTIONS(request: Request) {
//     const allowedOrigin = request.headers.get('origin');
//     const response = new NextResponse(null, {
//         status: 200,
//         headers: {
//             'Access-Control-Allow-Origin': allowedOrigin || '*',
//             'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//             'Access-Control-Allow-Headers':
//                 'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
//             'Access-Control-Max-Age': '86400',
//         },
//     });

//     return response;
// }

