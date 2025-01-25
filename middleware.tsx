import { NextResponse } from "next/server";

export async function middleware(request: Request) {
    const token = request.headers
        .get("cookie")
        ?.split("; ")
        .find((cookie) => cookie.startsWith("token="))
        ?.split("=")[1];

    // Redireciona para /login se o token não existir
    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Permite que a requisição continue
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"], // Define quais rotas serão protegidas
};