import { NextResponse } from "next/server";

export function middleware(request: Request) {
    const token = request.headers.get("authorization");

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"], // Define quais rotas serão protegidas
};