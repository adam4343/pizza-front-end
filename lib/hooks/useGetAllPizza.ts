import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../configs/axios.config";
import { TPizza } from "@/types/TPizza";

export default function useGetAllPizza() {
    return useQuery({
        queryKey: ['pizzas'],
        queryFn: async () => {
            const res = await axiosInstance.get("/pizza")

            return res.data.data as TPizza[]
        }
    })
}