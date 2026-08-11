'use server'

import { httpClient } from "@/lib/axios/httpClient"
import { ISpecialty, ISpecialtyPayload } from "@/types/specialty.types"

export const getSpecialties = async (queryString:string) => {
   try {
    return await httpClient.get<ISpecialty[]>(
        queryString
        ?`/specialties?${queryString}`
        :`/specialties`
    )
   } catch (error) {
    console.log('Error fetching specialties:', error);
    throw error;
   }
}

export const createSpecialty = async (
    payload:ISpecialtyPayload
) => {
    try {
        return await httpClient.post<ISpecialty>(
            '/specialties',
            payload
        )
    } catch (error) {
        console.log('Error creating specialty:', error);
        throw error
    }
}

export const updateSpecialty = async (
    id:string,
    payload:ISpecialtyPayload
) => {
    try {
        return await httpClient.patch<ISpecialty>(
            `/specialties/${id}`,
            payload
        )
    } catch (error) {
        console.log('Error updating specialty:', error)
        throw error
    }
}
export const deleteSpecialty = async (
    id:string
) => {
    try {
        return await httpClient.delete<{message:string}>(
            `/specialties/${id}`
        )
    } catch (error) {
        console.log('Error deleting specialty:', error)
        throw error
    }
}

export const getSpecialtyById = async (id:string) => {
    try {
        return await httpClient.get<ISpecialty>(
            `/specialties${id}`
        )
    } catch (error) {
        console.log('Error fetching specialty:', error)
        throw error
    }
}