import NextAuth, { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

// Input validation schema
const credentialsSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validate input
        const parsedCredentials = credentialsSchema.safeParse(credentials);
        
        if (!parsedCredentials.success) {
          return null;
        }
        
        const { username, password } = parsedCredentials.data;
        
        // TODO: Replace with real authentication logic
        // In production, verify against your user database or OAuth provider
        // Demo users only enabled in development mode
        const validUsers = process.env.NODE_ENV === 'development' ? [
          { id: "1", name: "Admin", username: "admin", password: "secret" },
        ] : [];
        
        const user = validUsers.find(
          (u) => u.username === username && u.password === password
        );
        
        if (!user) {
          return null;
        }
        
        return { id: user.id, name: user.name };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
