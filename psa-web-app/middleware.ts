import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
});

// only protect specific paths, not the entire app
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
