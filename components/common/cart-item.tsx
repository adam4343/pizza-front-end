"use client";
import Image from "next/image";
import { Title } from "../shared/title";
import React from "react";
import { Button } from "../ui";
import { TCartItem } from "@/types/TCart";
import { Trash2 } from "lucide-react";
import { useRemoveCart } from "@/lib/hooks/useRemoveCart";
import { useUpdateCartQuant } from "@/lib/hooks/useUpdateCartQuant";
import { cn } from "@/lib/utils";

export default function CartItem({ cartItem, className = ""}: { cartItem: TCartItem, className?: string}) {
  const removeItem = useRemoveCart();
  const updateQuantity = useUpdateCartQuant()

  return (
    <div className={cn("p-5 bg-white-color rounded-xl shadow-sm relative", className)}>
      <Button
        onClick={() => {
          removeItem.mutate(String(cartItem.id));
        }}
        variant="ghost"
        size="icon"
        className="absolute right-3 top-3 text-muted-foreground hover:text-destructive"
      >
        <Trash2 className="w-4 h-4" />
      </Button>

      <div className="flex items-start gap-6">
        <div className="w-[72px] flex-shrink-0 aspect-square relative">
          <Image
            src={`${cartItem.pizzaVariation.image}`}
            fill
            alt="pizza"
            className="rounded-lg object-cover"
          />
        </div>

        <div className="flex flex-col gap-3 flex-1">
          <div className="pb-3 border-b border-muted mb-3">
            <Title
              text={cartItem.pizza.name}
              size="lg"
              className="font-bold text-base"
            />

            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <p>
                {cartItem.pizzaVariation.pizzaVariationToAttribute.map(
                  (attributeObj, index) => (
                    <span key={attributeObj.attributeId}>
                      {attributeObj.attribute.name}
                      {index !==
                        cartItem.pizzaVariation.pizzaVariationToAttribute
                          .length -
                          1 && ", "}
                    </span>
                  )
                )}
              </p>

              {cartItem.additionalIngredients.length >
                0 ? (
                <p>
                  <span className="mr-1">+</span>
                  {cartItem.additionalIngredients.map(
                    (additionalObj, index) => (
                      <span key={additionalObj.additionalIngredient.id}>
                        {additionalObj.additionalIngredient.name}
                        {index !==
                          cartItem.additionalIngredients
                            .length -
                            1 && ", "}
                      </span>
                    )
                  )}
                </p>
              ): <p>No additional ingredients</p> }
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                className="w-8 h-8 rounded-[10px] flex items-center"
                onClick={() => {
                  if (cartItem.quantity <= 1) {
                    removeItem.mutate(String(cartItem.id))
                  };

                  updateQuantity.mutate({cartItemId: cartItem.id, quantity: cartItem.quantity - 1})
                }}
                variant={"outline"}
              >
                -
              </Button>
              <b>{cartItem.quantity}</b>
              <Button
                onClick={() => {
                  updateQuantity.mutate({cartItemId: cartItem.id, quantity: cartItem.quantity + 1})
                }}
                className=" w-8 h-8 rounded-[10px] items-center flex"
                variant={"outline"}
              >
                +
              </Button>
            </div>

            <div>
              <b>{(cartItem.itemPrice).toFixed(2)} $</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
