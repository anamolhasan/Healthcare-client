"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IUser } from "@/types/user.type";

export const getMeAction = async ():Promise<IUser | null> => {
  try {
    const response = await httpClient.get<IUser>("/auth/me");

    return response.data;
  } catch {
    return null;
  }
};