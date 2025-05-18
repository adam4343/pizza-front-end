import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../configs/axios.config";
import { toast } from "sonner";

export function useRemoveCart() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (cartItemId: string) => {
            const res = await axiosInstance.delete(`/cart/${cartItemId}`, {
                params: {
                    cartItemId: cartItemId
                }
            })

            return res.data.data as string
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['cart-items']}).then(() => toast.success("Cart Item removed", {
                icon: '✅'
            }))
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })
}