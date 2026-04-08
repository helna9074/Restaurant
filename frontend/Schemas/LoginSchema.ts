import z from "zod";

export const LoginSchema=z.object({
    email:z.string().min(10,"email is required").email("invalid email"),
    password:z.string().min(6,"password is required")
})
export type LoginForm=z.infer<typeof LoginSchema>