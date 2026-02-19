import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// `any` used to sidestep type incompatibilities with the current
// next-auth version and Next.js 16. Feel free to replace with a proper
// AuthOptions import when upgrading.
export const authOptions: any = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // TODO: replace with real authentication logic
        if (credentials?.username === "admin" && credentials?.password === "secret") {
          // NextAuth's User interface expects string ids
          return { id: "1", name: "Admin" };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
