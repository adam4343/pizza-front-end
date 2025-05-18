'use client'
import { Title } from "@/components/shared/title";
import { TOrderItem } from "@/types/TOrder";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export function OrderItem({ orderItem }: { orderItem: TOrderItem }) {
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="w-full sm:w-20 flex-shrink-0">
        <Image
          src={orderItem.pizzaVariation.image || "/placeholder.svg"}
          alt={orderItem.pizza.name}
          width={80}
          height={80}
          className="rounded-md object-cover w-full h-auto sm:h-20"
        />
      </div>

      <div className="flex flex-col flex-grow gap-1">
        <Link className="group"  href={`/pizza/${orderItem.pizza.id}/?pizzaVariation=${orderItem.pizzaVariation.id}`}
        >
        <Title
          className="font-semibold group-hover:text-primary text-lg sm:text-xl leading-tight transition-colors duration-300"
          size="md"
          text={orderItem.pizza.name}
        />
        </Link>
   

        {orderItem.pizzaVariation.pizzaVariationToAdditional?.length > 0 && (
          <p className="text-sm text-muted-foreground leading-snug">
            +{" "}
            {orderItem.pizzaVariation.pizzaVariationToAdditional.map(
              (ingredient, index) => {
                const isLast =
                  index ===
                  orderItem.pizzaVariation.pizzaVariationToAdditional.length - 1;
                return isLast
                  ? `${ingredient.additionalIngredient.name}`
                  : `${ingredient.additionalIngredient.name}, `;
              }
            )}
          </p>
        )}
      </div>

      <div className="sm:ml-auto text-right flex-shrink-0">
        <div className="font-semibold text-base sm:text-lg">
          {orderItem.pizzaVariation.totalPrice.toFixed(2)} $
        </div>
        <div className="text-sm text-muted-foreground">
          {orderItem.quantity} pcs
        </div>
      </div>
    </div>
  );
}
