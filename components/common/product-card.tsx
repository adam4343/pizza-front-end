"use client";
import Image from "next/image";
import { Title } from "../shared/title";
import Link from "next/link";
import { TPizza } from "@/types/TPizza";
import React from "react";
import { buttonVariants } from "@/lib/utils";

export function ProductCard({ pizza }: { pizza: TPizza }) {
  const lowestPriceVariation = React.useMemo(() => {
    let currentVariation = pizza.pizzaToVariations[0];

    for (let i = 1; i < pizza.pizzaToVariations.length; i++) {
      if (
        currentVariation.pizzaVariation.totalPrice >
        pizza.pizzaToVariations[i].pizzaVariation.totalPrice
      ) {
        currentVariation = pizza.pizzaToVariations[i];
      }
    }

    return currentVariation;
  }, [pizza]);

  return (
    <div>
      <Link
        href={`/pizza/${pizza.id}/?pizzaVariation=${lowestPriceVariation.pizzaVariationId}`}
        className="flex group items-center bg-secondary px-[37px] py-6 justify-center mb-4 rounded-[15px] cursor-pointer"
      >
        <Image
          src={`${lowestPriceVariation.pizzaVariation.image}`}
          width={212}
          height={212}
          alt={`pizza name pizza`}
          className="group-hover:scale-110 transition-all duration-300"
        />
      </Link>

      <div className="mb-3 flex-grow">
        <Title
          size="lg"
          text={`${pizza.name}`}
          className="font-bold text-[22px] mb-2"
        />

        <p className="text-muted-foreground">
          {pizza.pizzaToIngredients.map((ingredient, i) =>
            i === pizza.pizzaToIngredients.length - 1
              ? ` ${ingredient.ingredient.name}`
              : ` ${ingredient.ingredient.name} ,`
          )}
        </p>
      </div>

      <div className="flex md:items-center justify-between flex-col md:flex-row">
        <p className="text-xl mb-2 md:mb-0">
          from <b>{lowestPriceVariation.pizzaVariation.totalPrice.toFixed(2)} $</b>
        </p>

        <Link
          href={`/pizza/${pizza.id}/?pizzaVariation=${lowestPriceVariation.pizzaVariationId}`}
          className={`md:max-w-[125px] w-full ${buttonVariants({
            variant: "secondary",
          })}`}
        >
          Customize
        </Link>
      </div>
    </div>
  );
}
