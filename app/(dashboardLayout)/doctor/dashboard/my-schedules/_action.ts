'use server'
import { createMyDoctorSchedule, deleteMyDoctorSchedule, updateMyDoctorSchedule } from '@/services/doctorSchedule.service';
import { createDoctorScheduleServerZodSchema, updateDoctorScheduleServerZodSchema } from './../../../../../zod/doctorSchedule.validation';
import { ApiErrorResponse, ApiResponse } from "@/types/api.types"
import { ICreateDoctorSchedulePayload, IDoctorSchedule, IUpdateDoctorSchedulePayload } from "@/types/doctorSchedule.types"

const getActionErrorMessage = (error:unknown, fallbackMessage:string) => {
    if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    error.response &&
    typeof error.response === "object" &&
    "data" in error.response &&
    error.response.data &&
    typeof error.response.data === "object" &&
    "message" in error.response.data &&
    typeof error.response.data.message === "string"
  ) {
    return error.response.data.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return fallbackMessage
}

export const  createMyDoctorScheduleAction = async (
    payload:ICreateDoctorSchedulePayload,
):Promise<ApiResponse <IDoctorSchedule[]> | ApiErrorResponse> => {
    const parsedPayload = createDoctorScheduleServerZodSchema.safeParse(payload)

    if(!parsedPayload.success){
        return {
            success:false,
              message: parsedPayload.error.issues[0]?.message || "Invalid input",
        }
    }

    try {
        return await createMyDoctorSchedule(parsedPayload.data)
    } catch (error:unknown) {
         return {
      success: false,
      message: getActionErrorMessage(error, "Failed to book schedules"),
    }
    }
}


export const updateMyDoctorScheduleAction = async (
    payload:IUpdateDoctorSchedulePayload
):Promise<ApiResponse <{count:number}> | ApiErrorResponse> => {
    const parsedPayload = updateDoctorScheduleServerZodSchema.safeParse(payload)


    if(!parsedPayload.success){
        return {
            success:false,
            message: parsedPayload.error.issues[0]?.message || "Invalid input",
        }
    }

    try {
        return await updateMyDoctorSchedule(parsedPayload.data)
    } catch (error) {
        return {
            success:false,
            message:getActionErrorMessage(error, 'Failed to error message')
        }
    }
}

export const deleteMyDoctorScheduleAction = async (
    scheduleId:string
):Promise<ApiResponse<null> | ApiErrorResponse> => {
    if(!scheduleId){
        return{
            success:false,
            message:'Invalid schedule id'
        }
    }

    try {
        return await deleteMyDoctorSchedule(scheduleId)
    } catch (error:unknown) {
        return {
            success:false,
            message:getActionErrorMessage(error, 'Failed to remove schedule')
        }
    }
}