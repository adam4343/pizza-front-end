'use client'
import { ProductCard } from "@/components/common/product-card";
import { Carousel } from "@/components/ui";
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { axiosInstance } from "@/lib/configs/axios.config";
import { TPizza } from "@/types/TPizza";
import { useQuery } from "@tanstack/react-query";

export default function RecomendedPizzas({pizza}: {pizza: TPizza}) {
    const query = useQuery({
        queryKey: ['recomended-pizza'],
        queryFn: async () => {
            const res = await axiosInstance.get(`/pizza/recomended/${pizza.id}`)
            return res.data.data as TPizza[]
        }
    })
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {
            query.data?.map((currentPizza, id) => (
                <CarouselItem className="basis-1/2 sm:basis-1/3 md:basis-1/4" key={id}>
                    <ProductCard pizza={currentPizza} />
                </CarouselItem>
            ))
        }
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
