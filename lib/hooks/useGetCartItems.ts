'use client'
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../configs/axios.config";
import { TCartItem } from "@/types/TCart";

export function useGetCartItems() {
    return useQuery({
      queryKey: ['cart-items'],
      queryFn: async () => {
        const res = await axiosInstance.get("/cart", {
            withCredentials: true,
        });
        return res.data.data as TCartItem[];
      }
    });
  }
  