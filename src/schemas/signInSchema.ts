import * as z from "zod";

export const signInSchema = z.object({
  identifier: z
    .string()
    .min(1, { message: "Emaill or Password is required" })
    .email({ message: "Please enter valid email" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be 8 characters" }),
});
