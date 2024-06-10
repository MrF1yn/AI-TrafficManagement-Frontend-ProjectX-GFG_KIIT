import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import {JWT} from "next-auth/jwt";

// These two values should be a bit less than actual token lifetimes
const BACKEND_ACCESS_TOKEN_LIFETIME = 45 * 60;            // 45 minutes
const BACKEND_REFRESH_TOKEN_LIFETIME = 6 * 24 * 60 * 60;  // 6 days

const getCurrentEpochTime = () => {
    return Math.floor(new Date().getTime() / 1000);
};

const SIGN_IN_HANDLERS: any = {
    "credentials": async (user: any, account: any, profile: any, email:any, credentials:any) => {
        return true;
    },
};
const SIGN_IN_PROVIDERS = Object.keys(SIGN_IN_HANDLERS);

const handler = NextAuth({
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: BACKEND_REFRESH_TOKEN_LIFETIME,
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                // new: {label: "new", type: "boolean"},
                new: {},
                username: {},
                email: {},
                password: {}
            },
            // The data returned from this function is passed forward as the
            // `user` variable to the signIn() and jwt() callback
            async authorize(credentials, req) {
                try {
                    let route;
                    let authObject = {};
                    if(credentials?.new){
                        authObject = {
                            username: credentials.username,
                            email: credentials.email,
                            password1: credentials.password,
                            password2: credentials.password
                        };
                        route = "register";
                    }
                    else {
                        authObject = {
                            username: credentials?.username,
                            password: credentials?.password
                        };
                        route = "login";
                    }

                    const response = await axios({
                        url: process.env.NEXTAUTH_BACKEND_URL + `auth/${route}/`,
                        method: "post",
                        data: authObject,
                    });
                    const data = response.data;
                    if (data) return data;
                } catch (error) {
                    console.error((error as any).response.data);
                }
                return null;
            },
        }),
    ],

    pages: {
        signIn: '/login',
    },

    callbacks: {
        async signIn({user, account, profile, email, credentials}) {
            if(!account)return false;
            if (!SIGN_IN_PROVIDERS.includes(account.provider)) return false;
            return SIGN_IN_HANDLERS[account.provider](
                user, account, profile, email, credentials
            );
        },
        async jwt({user, token, account}) {
            // If `user` and `account` are set that means it is a login event
            if (user && account) {
                let backendResponse: any = account.provider === "credentials" ? user : account.meta;
                token["user"] = backendResponse.user;
                token["access_token"] = backendResponse.access;
                token["refresh_token"] = backendResponse.refresh;
                token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
                return token;
            }
            // Refresh the backend token if necessary
            if (getCurrentEpochTime() > (token["ref"] as any)) {
                const response = await axios({
                    method: "post",
                    url: process.env.NEXTAUTH_BACKEND_URL + "auth/token/refresh/",
                    data: {
                        refresh: token["refresh_token"],
                    },
                });
                token["access_token"] = response.data.access;
                token["refresh_token"] = response.data.refresh;
                token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
            }
            return token;
        },
        // Since we're using Django as the backend we have to pass the JWT
        // token to the client instead of the `session`.
        async session({token}:{token: any}) {
            return token;
        },
    }
});

export { handler as GET, handler as POST };