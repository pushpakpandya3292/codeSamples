import { NextAuthOptions } from "next-auth";
import {
  getUser,
  googleAuth,
  login,
  loginWithToken,
  refreshToken,
} from "@/services/auth";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { setAuthenticationHeader } from "@/services";
interface Token {
  accessToken: string;
  accessTokenExpires: number;
  refreshToken: string;
  error?: any;
}

let userDetails: any = null;
async function refreshAccessToken(token: Token): Promise<Token> {
  try {
    const refreshedTokens = await refreshToken(token.refreshToken);
    return {
      ...token,
      accessToken: refreshedTokens.token,
      accessTokenExpires: Date.now() + 10 * 1000,
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
export const authOptions: NextAuthOptions = {
  secret: "INp6HjGDyOpYnGAEdLoQSDDPKAlwLEdnDcCkFvA8QSPR",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      async profile(profile, token: any) {
        const response = await googleAuth({
          idToken: token?.id_token,
        });
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          ...response,
        };
      },
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "johndoe@test.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        try {
          const userToken = credentials.token;
          if (userToken) {
            const response = await loginWithToken({ token: userToken });
            return Promise.resolve(response ? { ...response } : {}) as any;
          } else {
            const response = await login({
              email: credentials.email,
              password: credentials.password,
            });
            return Promise.resolve(response ? { ...response } : {}) as any;
          }
        } catch (e: any) {
          return Promise.reject(e);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    async signIn({ user }: any) {
      if (user?.token) {
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    },
    async session({ session, token }: any) {
      if (!token.accessToken) {
        return Promise.resolve(session);
      }
      if (token.accessToken && token.user) {
        session.accessToken = token.accessToken;
        session.user = token.user as any;
      }
      if (userDetails) {
        session.accessToken = userDetails.token;
        session.user = userDetails;
      }
      const getuserdetails = await getUser(token.accessToken as string);
      session.user = { ...session.user, ...getuserdetails };
      if (getuserdetails) return Promise.resolve(session);
      else return Promise.reject("User not found");
    },
    async jwt({ token, user }: any) {
      if (user?.token) {
        // eslint-disable-next-line
        token = {
          accessToken: user.token,
          accessTokenExpires: Date.now() + 10 * 1000,
          refreshToken: user.refreshToken,
          user: user,
        };
      }
      if (Date.now() >= token?.user.tokenExpires)
        return Promise.reject("User not found");
      if (token.token && !token.user) {
        const userdetails = await getUser(token.accessToken as string);
        if (userdetails) token.user = userdetails;
        else return Promise.reject("User not found");
      }
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token);
    },
  },
};
