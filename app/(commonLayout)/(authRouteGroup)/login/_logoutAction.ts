'use server'
import { deleteCookie } from "@/lib/cookieUtils"
import { redirect } from "next/navigation"

export const logOutAction = async ()  => {
    await deleteCookie('accessToken')
    await deleteCookie('refreshToken')
    await deleteCookie('better-auth.session_token')

    redirect('/login')
}