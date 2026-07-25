import {z} from 'zod'

export const loginZodSchema = z.object({
    email:z.email("invalid email address"),
    password:z.string()
       .min(1, 'Password is required')
       .min(8, 'Password must be at least 8 characters long')
        // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        // .regex(/[0-9]/, "Password must contain at least one number")
        // .regex(/[@$!%*?&]/, "Password must contain at least one special character (@, $, !, %, *, ?, &)")
})

export type ILoginPayload = z.infer<typeof loginZodSchema>;


export const registerZodSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email().trim().toLowerCase(),
    password: z.string().min(8),
    confirmPassword: z.string(),
    acceptTerms: z.literal(true, {
      error: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const registerApiSchema = z.object({
  name: z.string().min(2),
  email: z.email().trim().toLowerCase(),
  password: z.string().min(8),
});

export type IRegisterForm = z.infer<typeof registerZodSchema>;
export type IRegistrationPayload = z.infer<typeof registerApiSchema>;