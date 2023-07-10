import User from "@models/user";
import { connectToDB } from "@utils/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })
            session.user.id = sessionUser._id.toString()
            return session
        },
        async signIn({ profile }) {
            try {
                await connectToDB()
                // check if user already exist
                const userExist = await User.findOne({
                    email: profile.email
                })
                // else create new user
                if (!userExist) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(' ', '').toLowerCase(),
                        image: profile.picture
                    })
                }
                return true
            } catch (error) {
                console.error(`Error at signIn Route: ${error}`)
                return false
            }
        }
    },

})

export { handler as GET, handler as POST }