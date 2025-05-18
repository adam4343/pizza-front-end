import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../configs/axios.config";

export function useGetPizzaType() {
    return useQuery({
        queryKey: ['pizza-types'],
        queryFn: async () => {
            const res = await axiosInstance.get("/pizza/type")

            return res.data.data as string[]
        }
    })
}