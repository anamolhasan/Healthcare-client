/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { httpClient } from "@/lib/axios/httpClient";
import { IRegistrationPayload, registerApiSchema, registerZodSchema } from "@/zod/auth.validation";


export const registrationAction = async (
    payload:IRegistrationPayload
)=> {
    const parsedPayload = registerApiSchema.safeParse(payload)

    if(!parsedPayload.success){
        const firstError = parsedPayload.error.issues[0].message || 'Invalid input';
        return {
            success:false,
            message:firstError
        }
    }


    try {
        const response = await httpClient.post('/auth/register', parsedPayload.data)
         return {
                    success: true,
                    message: response.message,
                    data: response.data,
                };
    } catch (error: any) {
    console.log(error.response?.data); // debug

    return {
        success: false,
        message:
            error.response?.data?.message ||
            error.message ||
            "Registration failed",
    };
}
}