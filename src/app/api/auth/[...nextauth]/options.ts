import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";

export const authOptions: NextAuthOptions = {
    providers:[
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any>{
                await dbConnect();

                try {
                    const user = await UserModel.findOne({
                        $or: [
                            {email: credentials.identifier},
                            {username: credentials.identifier},
                        ]
                    })

                    if(!user){
                        throw new Error("No user is registered with this email")
                    }

                    if(!user.isVerified){
                        throw new Error("Please verify your email before login")
                    }

                    const isCorrectPassword = await bcrypt.compare(credentials.password, user.password)
                    if(isCorrectPassword){
                        return user;
                    } else{
                        throw new Error("Incorrect password")
                    }

                } catch (err: any) {
                    throw new Error(err);
                }
            }
        })
    ],

    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMsg = token.isAcceptingMsg;
                session.user.username = token.username;
            }

            return session
        },
        async jwt({ token, user}) {
            if(user){
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.isAcceptingMsg = user.isAcceptingMsg;
                token.username = user.username;
            }

            return token
        }
    },

    pages: {
        signIn: '/sign-in'
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}