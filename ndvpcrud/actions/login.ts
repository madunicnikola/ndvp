"use server";

import * as z from "zod";
import { Schema } from "@/schemas";

export const login = async (values: z.infer<typeof Schema>) => {
    const validatedFields = Schema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Neusješan pokušaj!"};
     } 
        return {success: "Uspješna prijava!"};
};