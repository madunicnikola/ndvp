import * as z from "zod";

export const Schema = z.object({
    email: z.string().email({message: "Nemaš još puno pokušaja 😠"}),
    password: z.string().min(10, {message: "Ne zajebaji se 🍆"})
});