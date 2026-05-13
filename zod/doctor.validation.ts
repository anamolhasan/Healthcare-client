import z from 'zod'

const emptyStringToUndefined = (value: unknown) => {
    if(typeof value === 'string' && value.trim() === ''){
        return undefined
    }

    return value
}

export const createDoctorFormZodSchema = z.object({
    password: z
               .string()
               .min(6, 'Password must be at least 6 character')
               .max(20, 'Password must be at most 20 characters'),
    name: z
           .string()
           .trim()
           .min(5, 'Name must b at least 5 characters')
           .max(30, 'Name must be at most 30 characters'),
    email: z.email('Invalid email address'),
    contactNumber: z
                   .string()
                   .trim()
                   .min(11, 'Contact number must be at least 11 characters')
                   .max(14, 'Contact number must be at most 14 characters'),
    address: z
             .string()
             .trim()
             .max(100, 'Address must be at most 100 characters')
             .refine(
                (value) => value.length === 0 || value.length >= 10,
                'Address must be at least 10 characters',
             ),
    registrationNumber: z
             .string()
             .trim()
             .min(1, 'Registration number is required'),
    experience: z
             .string()
             .trim()
             .refine(
                (value) => value.length === 0 || /^\d+$/.test(value),
                "Experience must be an integer",
            ),
    gender: z.enum([Gender, Gender.FEMALE], {
        message: 'Gender must be either MALE or FEMALE',
    })
})