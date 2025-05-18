import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../configs/axios.config";
import { TOrder } from "@/types/TOrder";

export function useGetOrderItems() {
    return useQuery({
        queryKey: ['order-items'],
        queryFn: async () => {
            const res = await axiosInstance.get("/order", {
                withCredentials: true
            })

            return res.data.data as TOrder[]
        }
    })
}