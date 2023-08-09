import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "credentials",
      authorize: (credentials) => {
        if (credentials.password === process.env.NEXT_PUBLIC_DEFAULT_PASSWORD) {
          return {
            id: 'krakatau',
            name: "Krakatau",
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }

      return session;
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
    encryption: true,
  }
});