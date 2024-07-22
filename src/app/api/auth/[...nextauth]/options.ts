import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import UserModel from '@/model/User';
import { dbConnect } from '@/lib/dbconnect';

const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!githubClientId || !githubClientSecret || !googleClientId || !googleClientSecret) {
  throw new Error("Missing environment variables for GitHub or Google OAuth");
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        const { email, password } = credentials;
        const user = await UserModel.findOne({ email });
        if (!user) {
          throw new Error('No user found with this email');
        }
        if (!user.isVerified) {
          throw new Error('Please verify your account before logging in');
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
          return user;
        } else {
          throw new Error('Incorrect password');
        }
      },
    }),
    GitHubProvider({
      clientId: githubClientId,
      clientSecret: githubClientSecret,
    }),
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await dbConnect();
      if (account?.provider === 'github' || account?.provider === 'google') {
        const existingUser = await UserModel.findOne({ email: user.email });
        if (!existingUser) {
          const newUser = new UserModel({
            username: user.name || profile?.name,
            email: user.email,
            password: user.id,
            isVerified: true,
            verifyCode: '', // No verify code for OAuth users
            verifyCodeExpiry: new Date(),
          });
          await newUser.save();
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString(); 
        token.isVerified = user.isVerified;
        token.email = user.email;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.email = token.email;
        session.user.username = token.username;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },
};


