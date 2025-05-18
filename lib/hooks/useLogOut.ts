import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../configs/axios.config";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { sessionKey } from "./useSession";

export function useLogOut() {
    const router = useRouter()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async () => {
            const res = await axiosInstance.post("/auth/logout", undefined, {
                withCredentials: true
            })

            return res.data.data
        },

        onSuccess: async() => {
            await queryClient.invalidateQueries({queryKey: [sessionKey]}).then(() => router.push("/"))
            
        },

        onError: (e) => {
            toast.error(e.message)
        }
    })
}