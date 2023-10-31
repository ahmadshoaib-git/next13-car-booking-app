import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from './lib/token';
import { getErrorResponse } from './lib/helpers';

interface AuthenticatedRequest extends NextRequest {
    user: {
        id: string;
    };
}

let redirectToLogin = false;
export async function middleware(req: NextRequest) {
    let token: string | undefined;
    const { pathname } = req.nextUrl;

    const dashboardRoutes = pathname === '/';
    const isSignin = pathname === '/signin';
    const isSignup = pathname === '/signup';

    if (req.cookies.has('token')) {
        token = req.cookies.get('token')?.value;
    } else if (req.headers.get('Authorization')?.startsWith('Bearer ')) {
        token = req.headers.get('Authorization')?.substring(7);
    }
    if (req.nextUrl.pathname.startsWith('/signin') && (!token || redirectToLogin)) return;

    if (!token && (req.nextUrl.pathname.startsWith('/api/users') || req.nextUrl.pathname.startsWith('/api/auth/logout'))) {
        return getErrorResponse(401, 'You are not logged in. Please provide a token to gain access.');
    }

    const response = NextResponse.next();

    try {
        if (token) {
            const { sub } = await verifyJWT<{ sub: string }>(token);
            response.headers.set('X-USER-ID', sub);
            (req as AuthenticatedRequest).user = { id: sub };
            console.log(`token >>> ${token}`);
        }
    } catch (error) {
        redirectToLogin = true;
        if (req.nextUrl.pathname.startsWith('/api')) {
            return getErrorResponse(401, "Token is invalid or user doesn't exists");
        }

        return NextResponse.redirect(new URL(`/signin?${new URLSearchParams({ error: 'badauth' })}`, req.url));
    }

    console.log(`req > ${req}`);

    const authUser = (req as AuthenticatedRequest).user;

    if (!authUser) {
        if (dashboardRoutes) {
            return NextResponse.redirect(new URL('/signin', req.url));
        }

        // return NextResponse.redirect(
        //     new URL(
        //         `/login?${new URLSearchParams({
        //             error: 'badauth',
        //             forceLogin: 'true',
        //         })}`,
        //         req.url,
        //     ),
        // );
    }

    if (isSignin && authUser) {
        return NextResponse.redirect(new URL('/', req.url));
    }
    if (isSignup && authUser) {
        return NextResponse.redirect(new URL('/', req.url));
    }
    return response;
}

// Config
// ========================================================
// const corsOptions: {
//     allowedMethods: string[];
//     allowedOrigins: string[];
//     allowedHeaders: string[];
//     exposedHeaders: string[];
//     maxAge?: number;
//     credentials: boolean;
// } = {
//     allowedMethods: (process.env?.ALLOWED_METHODS || '').split(','),
//     allowedOrigins: (process.env?.ALLOWED_ORIGIN || '').split(','),
//     allowedHeaders: (process.env?.ALLOWED_HEADERS || '').split(','),
//     exposedHeaders: (process.env?.EXPOSED_HEADERS || '').split(','),
//     maxAge: (process.env?.MAX_AGE && parseInt(process.env?.MAX_AGE)) || undefined, // 60 * 60 * 24 * 30, // 30 days
//     credentials: process.env?.CREDENTIALS == 'true',
// };

// // Middleware
// // ========================================================
// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//     // Response
//     const response = NextResponse.next();
//     const { pathname } = request.nextUrl;

//     let token: string | undefined;
//     console.log(`pathname >> ${pathname}`);

//     // Allowed origins check
//     const origin = request.headers.get('origin') ?? '';
//     if (corsOptions.allowedOrigins.includes('*') || corsOptions.allowedOrigins.includes(origin)) {
//         response.headers.set('Access-Control-Allow-Origin', origin);
//     }

//     // Set default CORS headers
//     response.headers.set('Access-Control-Allow-Credentials', corsOptions.credentials.toString());
//     response.headers.set('Access-Control-Allow-Methods', corsOptions.allowedMethods.join(','));
//     response.headers.set('Access-Control-Allow-Headers', corsOptions.allowedHeaders.join(','));
//     response.headers.set('Access-Control-Expose-Headers', corsOptions.exposedHeaders.join(','));
//     response.headers.set('Access-Control-Max-Age', corsOptions.maxAge?.toString() ?? '');

//     // Return

//     const dashboardRoutes = pathname === '/';
//     const isSignin = pathname === '/signin';
//     const isSignup = pathname === '/signup';

//     if (request.cookies.has('token')) {
//         token = request.cookies.get('token')?.value;
//     } else if (request.headers.get('Authorization')?.startsWith('Bearer ')) {
//         token = request.headers.get('Authorization')?.substring(7);
//     }

//     if (request.nextUrl.pathname.startsWith('/signin') && (!token || redirectToLogin)) return;

//     if (!token && (request.nextUrl.pathname.startsWith('/api/users') || request.nextUrl.pathname.startsWith('/api/auth/logout'))) {
//         return getErrorResponse(401, 'You are not logged in. Please provide a token to gain access.');
//     }

//     // const response = NextResponse.next();

//     try {
//         if (token) {
//             console.log(`token >>> ${token}`);
//             const { sub } = await verifyJWT<{ sub: string }>(token);
//             response.headers.set('X-USER-ID', sub);
//             (request as AuthenticatedRequest).user = { id: sub };
//         }
//     } catch (error) {
//         redirectToLogin = true;
//         if (request.nextUrl.pathname.startsWith('/api')) {
//             return getErrorResponse(401, "Token is invalid or user doesn't exists");
//         }

//         return NextResponse.redirect(new URL(`/login?${new URLSearchParams({ error: 'badauth' })}`, request.url));
//     }

//     const authUser = (request as AuthenticatedRequest).user;

//     if (!authUser) {
//         if (dashboardRoutes) {
//             return NextResponse.redirect(new URL('/signin', request.url));
//         }

//         // return NextResponse.redirect(
//         //     new URL(
//         //         `/login?${new URLSearchParams({
//         //             error: 'badauth',
//         //             forceLogin: 'true',
//         //         })}`,
//         //         request.url,
//         //     ),
//         // );
//     }

//     if (isSignin && authUser) {
//         return NextResponse.redirect(new URL('/', request.url));
//     }
//     if (isSignup && authUser) {
//         return NextResponse.redirect(new URL('/', request.url));
//     }
//     return response;
// }

// // See "Matching Paths" below to learn more
export const config = {
    matcher: ['/profile', '/signin', '/signup', '/api/:path*', '/'],
};

