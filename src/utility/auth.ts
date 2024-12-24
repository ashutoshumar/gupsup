import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/database";
import { User } from "@/models/User";

export const authOption: NextAuthOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          try {
            await connectToDatabase();
  
            const user = await User.findOne({ email: credentials?.email });
            if (!user) return null;
  
            const passwordMatch = await bcrypt.compare(
              credentials?.password!,
              user.password
            );
            if (!passwordMatch) return null;
  
            return user;
          } catch (error) {
            console.log(error);
            return null;
          }
        },
      }),
    ],
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/",
    },
    callbacks: {
      async signIn({ user, account }) {
        if (account?.provider === "google") {
          const { name, email } = user;
          try {
            const password = Math.random().toString(36).slice(-8);
            await connectToDatabase();
            const existingUser = await User.findOne({
              email: email,
              provider: account?.provider,
            });
            if (!existingUser) {
              await User.create({
                name: name,
                email: email,
                provider: account?.provider,
                password: password,
              });
            }
          } catch (error) {
            console.log(error);
            return false;
          }
          return true;
        }
        return true;
      },
      async jwt({ token, user }) {
        if (user) {
          token.role = user.role; // Add the user's role to the token
        }
        return token;
      },
      async session({ session }) {
        await connectToDatabase();
        const res = await User.findOne({ email: session?.user?.email });
        const user = {
          name: res.name,
          email: res.email,
          about: res.about,
          id: res._id,
          image: res.picture.url,
          role: res.role,
        };
        session.user = user;
        return session;
      },
    },
  };
  
  