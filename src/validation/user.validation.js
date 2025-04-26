
import { z } from "zod";

export const userRegisterSchema = z.object({
    username: z.string()
        .min(2, { message: "username must be at least three " })
        .max(10, { message: "username must be at most 10 characters" })
        .regex(/^[a-zA-Z0-9_]*$/, { message: "username must be alphanumeric" }),

    email: z.string().email(),
    password: z.string().min(4, { message: "password must be at least 4 characters" })
        .max(10, { message: "password muust be at most 10 characters" })
})
// //user pagination schema

// export const userPaginationSchema = z.object({
//     page: z.number().int().min(1),
//         limit: z.number().int().min(1).max(100)
// })

// //user query schema
// export const userQuerySchema = z.object({
//     search: z.string().optional(),
//     username: z.string().optional(),
//     email: z.string().optional(),
//     role: z.string().optional(),
// })




