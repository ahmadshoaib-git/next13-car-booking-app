import { z } from 'zod';

export const userValidator = z.object({
    email: z.string().email({
        message: 'Invalid Email.',
    }),
    password: z.string().trim().min(6, {
        message: 'Password must have at least 6 characters.',
    }),
    firstName: z.string().trim().min(2, {
        message: 'firstName must have at least 2 characters.',
    }),
    lastName: z.string().trim().min(2, {
        message: 'lastName must have at least 2 characters.',
    }),
});

