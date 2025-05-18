"use client";
import { Title } from "@/components/shared/title";
import { Button } from "@/components/ui";
import { TPizza } from "@/types/TPizza";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";
import IngredientCarousel from "./ingredient-carousel";
import PizzaAttributes from "./pizza-attributes";
import { useAddToCart } from "@/lib/hooks/useAddToCart";
import { useSession } from "@/lib/hooks/useSession";
import { toast } from "sonner";
import { Container } from "@/components/common/container";

export default function SinglePizza({
  pizza,
  pizzaVariation,
}: {
  pizza: TPizza;
  pizzaVariation: string;
}) {
  const session = useSession();
  const searchParams = useSearchParams();
  const addIngParams = searchParams.get("additionalIngredients");
  const currentVariation = React.useMemo(() => {
    const foundVariation = pizza.pizzaToVariations.find(
      (variation) => pizzaVariation === String(variation.pizzaVariationId)
    );
    return foundVariation;
  }, [pizzaVariation, pizza]);

  const totalprice = React.useMemo(() => {
    if (!currentVariation) return 0;
    const currentVariationPrice = currentVariation.pizzaVariation.totalPrice;

    try {
      const additionalIngredients = JSON.parse(
        addIngParams ?? "[]"
      ) as number[];
      if (additionalIngredients.length === 0) return currentVariationPrice;

      const additionalPrice =
        currentVariation.pizzaVariation.pizzaVariationToAdditional
          .filter((x) =>
            additionalIngredients.includes(x.additionalIngredientId)
          )
          .reduce((acc, cur) => acc + cur.additionalIngredient.price, 0);

      return (currentVariationPrice + additionalPrice);
    } catch (e) {
      console.error("Error", e);
      return currentVariationPrice;
    }
  }, [addIngParams, currentVariation]);


  const mutation = useAddToCart()

  if (!currentVariation) {
    return (
      <section className="flex items-center justify-center min-h-[60vh]">
      <Container>
        <div className="text-center">
          <Title size="2xl" className="mb-4" text="Oops, pizza variation not found!" />
          <p className="text-muted-foreground text-lg">
            Sorry, we couldn&apos;t find the pizza variation you&apos;re looking for.
            Please try selecting a different variation or go back to the pizza list.
          </p>
        </div>
      </Container>
    </section>
    );
  }

 
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-[46px] pb-10">
      <div className="w-full max-w-[570px] aspect-square p-5 md:p-8 bg-secondary rounded-[20px] mx-auto lg:mx-0">
        <div className="relative w-full aspect-square">
          <Image
            src={`${currentVariation?.pizzaVariation.image}`}
            alt={`Image of ${pizza.name} pizza`}
            fill
            className="object-contain rounded-xl"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full max-w-xl mx-auto lg:mx-0">
        <div>
          <Title
            size="2xl"
            className="text-2xl md:text-3xl font-extrabold mb-2"
            text={`${pizza.name}`}
          />
          <p className="text-muted-foreground text-sm md:text-base">
            25 см, традиционное тесто 25, 380 г
          </p>
        </div>

        <PizzaAttributes
          currentVariation={currentVariation.pizzaVariation}
          pizza={pizza}
        />

        <div className="flex-1">
          <Title
            text="Add ingredients:"
            size="lg"
            className="text-xl font-semibold mb-4"
          />
          <IngredientCarousel
            currentVariation={currentVariation.pizzaVariation}
          />
        </div>

        <div className="w-full sm:max-w-[297px]">
          <Button onClick={() => {
            if(!session.data) {
              toast.error("You need to be logged in to order")
              return;
            }
            try {
                const additionalIngredients = JSON.parse(
                    addIngParams ?? "[]"
                  ) as number[];

                mutation.mutate({
                    pizzaId: pizza.id,
                    pizzaVariationId: currentVariation.pizzaVariationId,
                    ingredientsId: currentVariation.pizzaVariation.pizzaVariationToIngredients.map(ingredient => ingredient.ingredient.id),
                    additionalIngredientsId: additionalIngredients
                })
            } catch(e) {
                console.error(e)
            }
          
          }} isPending={mutation.isPending} className="font-bold w-full h-[55px] text-base">
            Add to cart for {totalprice.toFixed(2)} $
          </Button>
        </div>
      </div>
    </div>
  );
}
