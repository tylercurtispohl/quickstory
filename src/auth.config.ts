import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import AWS from "aws-sdk";
import process from "process";
import { User } from "next-auth";
import Cognito from "@auth/core/providers/cognito";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log(auth);
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers: [
    Cognito({
      clientId: process.env.COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      issuer: process.env.COGNITO_ISSUER,
    }),
    //   CredentialsProvider({
    //     name: "Credentials",
    //     credentials: {
    //       username: { label: "Username", type: "text", placeholder: "Username" },
    //       password: { label: "Password", type: "password" },
    //     },

    //     authorize: async (credentials) => {
    //       const cognito = new AWS.CognitoIdentityServiceProvider();

    //       if (!credentials) return null;

    //       const params = {
    //         AuthFlow: "USER_PASSWORD_AUTH",
    //         ClientId: process.env.COGNITO_CLIENT_ID as string,
    //         AuthParameters: {
    //           USERNAME: credentials.username as string,
    //           PASSWORD: credentials.password as string,
    //         },
    //       };

    //       try {
    //         const response = await cognito.initiateAuth(params).promise();
    //         const user = {
    //           id: response.ChallengeParameters?.USER_ID_FOR_SRP as string, // User ID for Secure Remote Password
    //           name: credentials.username,
    //         };
    //         return user as User;
    //       } catch (error) {
    //         console.error(error);
    //         return null;
    //       }
    //     },
    //   }),
  ],
};
