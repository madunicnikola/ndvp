"use server";

import * as z from "zod";
import { Schema } from "@/schemas";
import { signIn } from "@/auth";
import { LoginRedirect } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof Schema>) => {
    const validatedFields = Schema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Neusješan pokušaj!"};
     } 
    
    const { email, password } = validatedFields.data;
     try{
        await signIn("credentials", {email, password, redirectTo: LoginRedirect,})
     } catch (error){
        if (error instanceof AuthError) {
            switch (error.type){
                case "CredentialsSignin":
                    return {error: "Pogrešno uneseni podaci!"}
                default: 
                    return {error: "Nešto nije u redu..."}
            }
        }
        throw error;
     }
};