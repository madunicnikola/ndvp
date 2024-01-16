import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Schema } from "./schemas";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";

export default {
    providers: [
        Credentials({
            async authorize(credentials){
                const validatedFields = Schema.safeParse(credentials);

            if (validatedFields.success){
                const {email, password} = validatedFields.data;

                const user = await getUserByEmail(email);
                if (user && user.password && user.password === password){
                    return user;
            }
        }
            return null;
            }
        })
    ],
} satisfies NextAuthConfig