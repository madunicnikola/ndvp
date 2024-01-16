import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { LoginRedirect, apiAuth, authRoutes, publicRoutes } from "./routes";
const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiRoute = nextUrl.pathname.startsWith(apiAuth);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiRoute){
        return null;
    }

    if (isAuthRoute) {
        if(isLoggedIn){
            return Response.redirect(new URL(LoginRedirect, nextUrl));
        }
        return null;
    }
    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/auth/login", nextUrl));
    }

    return null;
})
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}