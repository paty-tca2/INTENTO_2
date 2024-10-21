import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth');

    if (isAuthPage) {
        if (token) {
            // If the user is authenticated and trying to access an auth page, redirect to my-account
            return NextResponse.redirect(new URL('/my-account', req.url));
        }
        // Allow access to auth pages for unauthenticated users
        return NextResponse.next();
    }

    // Check for protected routes
    if (!token && req.nextUrl.pathname.startsWith('/my-account')) {
        // Redirect to the sign-in page if accessing a protected route without authentication
        return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    // Allow all other requests to pass through
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};