"use client";
import { TPizzaVariation } from "@/types/TPizza";
import IngredientCard from "./ingredient-card";
import { Carousel } from "@/components/ui";
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function IngredientCarousel({
  currentVariation,
}: {
  currentVariation: TPizzaVariation;
}) {
  return (
    <Carousel className="w-full max-w-full px-6 lg:px-0">
      <CarouselContent>
        {currentVariation.pizzaVariationToAdditional?.map((ingredient, id) => (
          <CarouselItem
            className="basis-1/2 sm:basis-1/3 md:basis-1/4"
            key={id}
          >
            <IngredientCard ingredient={ingredient.additionalIngredient} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
