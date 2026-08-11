'use server'

import { createSpecialty, deleteSpecialty, getSpecialties, getSpecialtyById, updateSpecialty } from "@/services/specialty.service"
import { ApiErrorResponse, ApiResponse } from "@/types/api.types"
import { ISpecialty, ISpecialtyPayload } from "@/types/specialty.types"
import { createSpecialtyServerZodSchema, updateSpecialtyServerZodSchema } from "@/zod/specialty.validation"


const getActionErrorMessage = (error: unknown, fallbackMessage: string) => {
    if(
        error && 
        typeof error === 'object' && 
        'response' in error && 
        error.response && 
        typeof error.response === 'object' &&
        'data' in error.response && 
        typeof error.response.data === 'object' &&
        error.response.data &&
        'message' in error.response.data && 
        error.response.data.message === 'string'
    ){
        return error.response.data.message
    }

    if(error instanceof Error){
        return error.message
    }

    return fallbackMessage
}

export const createSpecialtyAction = async (
  payload: ISpecialtyPayload
): Promise<ApiResponse<ISpecialty> | ApiErrorResponse> => {
  const parsed = createSpecialtyServerZodSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false,
      message:
        parsed.error.issues[0]?.message ?? "Invalid input",
    };
  }

  try {
    return await createSpecialty(parsed.data);
  } catch (error) {
    return {
      success: false,
      message: getActionErrorMessage(
        error,
        "Failed to create specialty"
      ),
    };
  }
};
export const updateSpecialtiesAction = async (
    id:string,
    payload:ISpecialtyPayload
):Promise<ApiResponse<ISpecialty> | ApiErrorResponse> => {
    if(!id){
        return {
            success:false,
            message:'Invalid specialty id'
        }
    }

    const parsed = updateSpecialtyServerZodSchema.safeParse(payload);

    if(!parsed.success){
        return {
            success:false,
            message:parsed.error.issues[0]?.message || 'Invalid input'
        }
    }

    try {
        return await updateSpecialty(id, parsed.data);
    } catch (error) {
        return {
            success: false,
            message: getActionErrorMessage(
                error,
                "Failed to update specialty"
            ),
            };
    }
}
export const deleteSpecialtiesAction = async (
    id:string
):Promise<ApiResponse<{message:string}> | ApiErrorResponse> => {
    if(!id){
        return {
            success:false,
            message:'Invalid specialty id',
        }
    }

    try {
        return await deleteSpecialty(id)
    } catch (error) {
        return {
      success: false,
      message: getActionErrorMessage(
        error,
        "Failed to delete specialty"
      ),
    };
    }
}
export const getSpecialtiesAction = async (
    queryString:string
):Promise<ApiResponse<ISpecialty[]> | ApiErrorResponse> => {
    try {
        return await getSpecialties(queryString);
    } catch (error:unknown) {
         return {
      success: false,
      message: getActionErrorMessage(
        error,
        "Failed to fetch specialties"
      ),
    };
    }
}


export const getSpecialtyByIdAction = async (
  id: string
): Promise<ApiResponse<ISpecialty> | ApiErrorResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Invalid specialty id",
    };
  }

  try {
    return await getSpecialtyById(id);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(
        error,
        "Failed to fetch specialty"
      ),
    };
  }
};