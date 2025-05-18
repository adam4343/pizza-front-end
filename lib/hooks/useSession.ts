import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../configs/axios.config";
import { TUser } from "../getUser";

export const sessionKey = "session";

export function useSession() {
    return useQuery({
      queryKey: [sessionKey],
      queryFn: async () => {
          try {
              const response = await axiosInstance.get("/auth/me", {
                withCredentials: true
              });
              return response.data.data as TUser;
            } catch (error) {
              console.log(error);
              return null;
            }
      },
    });
  }

