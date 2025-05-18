import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../configs/axios.config";

export function useUpdateCartQuant() {
    const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      cartItemId,
      quantity,
    }: {
      cartItemId: number;
      quantity: number;
    }) => {
       await axiosInstance.put(
        `/cart/${cartItemId}`,
        {
          quantity: quantity,
        },

        {
          params: {
            cartItemId: cartItemId,
          },
        }
      );
    },
    onSuccess: async () => {
        await queryClient.invalidateQueries({queryKey: ['cart-items']})
    }, 
    onError: (e) => {
        console.error(e)
    }
  });
}
