import {z} from 'zod';

export const validUserName = z
    .string()
    .min(2, "Username must contain more than 2 characters")
    .max(20, "Username must contain less than 20 characters")
    .regex(/^[a-zA-z0-9_]+$/ , "Username must not conatin any special character")


export const signUpSchema = z.object({
    username: validUserName,
    email: z.string().email({message: 'Invalid email address'}),
    password: z.string().min(6, {message: 'Password length must be greater than 6'})
})