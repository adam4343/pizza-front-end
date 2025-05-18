"use client";

import { Tabs } from "@/components/ui";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TPizza, TPizzaVariation } from "@/types/TPizza";
import { useRouter } from "next/navigation";
import React from "react";
import { toast} from "sonner"

export default function PizzaAttributes({
  pizza,
  currentVariation,
}: {
  pizza: TPizza;
  currentVariation: TPizzaVariation;
}) {

  const router = useRouter()

  const groupedAttributes = React.useMemo(() => {

    const attributes = new Map<string, { variantId: number; name: string }[]>();

    pizza.pizzaToVariations.forEach((variation) => {
      variation.pizzaVariation.pizzaVariationToAttribute.forEach(
        (attribute) => {
          const existing = attributes.get(attribute.attribute.type);
          const attrData = {
            variantId: variation.pizzaVariation.id,
            name: attribute.attribute.name,
          };
          if (existing) {
            attributes.set(attribute.attribute.type, [...existing, attrData]);
          } else {
            attributes.set(attribute.attribute.type, [attrData]);
          }
        }
      );
    });

    return Object.fromEntries(attributes);
    // @eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVariation.id]);

  function onTabClick({ attributeType, value }: { attributeType: string; value: string }) {

    if(currentVariation.pizzaVariationToAttribute.find((x) => value.includes(x.attribute.name))) {
      return
    }

    const closestVariation = pizza.pizzaToVariations.map(x => x.pizzaVariation).flatMap(x => x.pizzaVariationToAttribute).filter(x => x.pizzaVariationId !== currentVariation.id || x.attribute.type !== attributeType).find(x => value.includes(x.attribute.name))

    if(closestVariation) {
      const urlParms = new URLSearchParams(window.location.search)
      urlParms.set('pizzaVariation', closestVariation.pizzaVariationId.toString())
      router.push('?' + urlParms.toString())
      return
    }

    const variantionWithThisAttribute = pizza.pizzaToVariations.filter(x => x.pizzaVariationId !== currentVariation.id).find(x => x.pizzaVariation.pizzaVariationToAttribute.find(y => y.attribute.type === attributeType && y.attribute.name === value))

    if(variantionWithThisAttribute) {
      const urlParms = new URLSearchParams(window.location.search)
      urlParms.set('pizzaVariation', variantionWithThisAttribute.pizzaVariationId.toString())
      router.push('?' + urlParms.toString())
    }else {
      toast.error("No variation with this attribute")
    }
    
  }

  return (
    <Tabs 
    value={currentVariation.id.toString()}
    className="flex flex-col gap-5 w-full">
      {Object.entries(groupedAttributes).map(([key, value], id) => {
        const showAttributes = removeSameAttributeNames(value)
        return ((
          <TabsList 
          aria-hidden={showAttributes.length === 1}
          key={id}
          className="flex gap-2 rounded-full aria-hidden:hidden">
            {showAttributes.map((item) => (
              <TabsTrigger
                key={item.variantId}
                value={item.variantId.toString()}

                onMouseDown={() => onTabClick({ attributeType: key, value: item.name })}
                className="text-sm p-2 rounded-full w-full hover:bg-accent"
              >
                {item.name} {item.variantId}
              </TabsTrigger>
            ))}
          </TabsList>
        ))
      })}
    </Tabs>
  );
}

  function removeSameAttributeNames(attributes: { variantId: number; name: string }[]) {
    const uniqueAttributes = attributes.reduce((acc, cur) => {
      if (!acc.find((x) => x.name === cur.name)) {
        acc.push(cur);
      }
      return acc;
    }, [] as { variantId: number; name: string }[]);
    return uniqueAttributes
  }