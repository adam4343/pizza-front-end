"use client";

import { ProductCard } from "@/components/common/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { axiosInstance } from "@/lib/configs/axios.config";
import { TPizza } from "@/types/TPizza";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";

function getFilterParams(params: URLSearchParams) {
  try {
    const filters = params.get("filters")

    if(!filters) return;

    const filterParams = JSON.parse(filters) 

    return filterParams as { minPrice: number, maxPrice: number, ingredients: number[]}
  } catch(e) {
    console.error(e)
  }
}

export default function SearchedProducts() {
  const params = useSearchParams();

  const filterParams = getFilterParams(params)
 
  const pizzas = useQuery({
    queryKey: ['search', params.get('filters')],
    queryFn: async () => {
      const req = await axiosInstance.get(`/pizza/search`, {
        params: {
            search: params.get("search"),
            maxPrice: filterParams?.maxPrice ,
            minPrice: filterParams?.minPrice ,
            ingredients: filterParams?.ingredients ,
            page: params.get("page")
        }
      });

      return req.data as {data: TPizza[]};
    },
  });


  if (pizzas.isPending) {
    return (
      <>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="px-[37px] py-6 rounded-[15px] flex justify-center">
              <Skeleton className="w-[212px] h-[212px] rounded-lg" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-[22px] w-3/4" />
              <Skeleton className="h-[18px] w-full" />
            </div>

            <div className="flex items-center justify-between">
              <Skeleton className="h-[24px] w-[80px]" />
              <Skeleton className="h-[36px] w-[125px] rounded-md" />
            </div>
          </div>
        ))}
      </>
    );
  }
  if( !pizzas.data?.data || pizzas.data?.data.length === 0) {
     return <div><p>Product not found</p></div>
  }
  return <>
    {
        pizzas.data?.data.map((pizza, id) => (
            <ProductCard key={id} pizza={pizza} />
        )) 
    }
  </>;
}
