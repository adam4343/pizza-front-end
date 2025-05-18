import { axiosInstance } from "./configs/axios.config";
import { cookies } from "next/headers";
  
export async function getUser(): Promise<TUser | null> {
    try {
      const cookiesStore = await cookies();
     const token = cookiesStore.get("auth-token")
     if(!token) return null; 
  
      const response = await axiosInstance.get("/auth/me",{
          headers: {
             Cookie: `auth-token=${token.value}`
          }
      });
      return response.data.data as TUser;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  export type TUser = unknown;
