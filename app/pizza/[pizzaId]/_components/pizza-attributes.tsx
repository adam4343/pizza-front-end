"use client";

import { Title } from "@/components/shared/title";
import { Tabs } from "@/components/ui";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TPizza, TPizzaVariation } from "@/types/TPizza";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function PizzaAttributes({
  pizza,
  currentVariation,
}: {
  pizza: TPizza;
  currentVariation: TPizzaVariation;
}) {
  const router = useRouter();

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

  function onTabClick({
    attributeType,
    value,
  }: {
    attributeType: string;
    value: string;
  }) {
    if (
      currentVariation.pizzaVariationToAttribute.find((x) =>
        value.includes(x.attribute.name)
      )
    ) {
      return;
    }

    const closestVariation = pizza.pizzaToVariations
      .map((x) => x.pizzaVariation)
      .flatMap((x) => x.pizzaVariationToAttribute)
      .filter(
        (x) =>
          x.pizzaVariationId !== currentVariation.id ||
          x.attribute.type !== attributeType
      )
      .find((x) => value.includes(x.attribute.name));

    if (closestVariation) {
      const urlParms = new URLSearchParams(window.location.search);
      urlParms.set(
        "pizzaVariation",
        closestVariation.pizzaVariationId.toString()
      );
      router.push("?" + urlParms.toString());
      return;
    }

    const variantionWithThisAttribute = pizza.pizzaToVariations
      .filter((x) => x.pizzaVariationId !== currentVariation.id)
      .find((x) =>
        x.pizzaVariation.pizzaVariationToAttribute.find(
          (y) =>
            y.attribute.type === attributeType && y.attribute.name === value
        )
      );

    if (variantionWithThisAttribute) {
      const urlParms = new URLSearchParams(window.location.search);
      urlParms.set(
        "pizzaVariation",
        variantionWithThisAttribute.pizzaVariationId.toString()
      );
      router.push("?" + urlParms.toString());
    } else {
      toast.error("No variation with this attribute");
    }
  }

  return (
    <>
      <div>
        <Title
          size="2xl"
          className="text-2xl md:text-3xl font-extrabold mb-2"
          text={`${pizza.name}`}
        />
        <p className="text-muted-foreground text-sm md:text-base">
          {currentVariation.pizzaVariationToAttribute
            .map((attr) => attr.attribute.name)
            .join(", ")}
        </p>
      </div>

      <Tabs value="static-parent" className="flex flex-col gap-5 w-full">
        {Object.entries(groupedAttributes).map(([key, values], id) => {
          const showAttributes = removeSameAttributeNames(values);

          // Get the currently selected value for this attribute type
          const currentValue = currentVariation.pizzaVariationToAttribute.find(
            (attr) => attr.attribute.type === key
          )?.attribute.name;

          return (
            <Tabs value={currentValue} key={id}>
              <TabsList
                aria-hidden={showAttributes.length === 1}
                className="flex gap-2 rounded-full aria-hidden:hidden"
              >
                {showAttributes.map((item) => (
                  <TabsTrigger
                    key={item.name}
                    value={item.name}
                    onMouseDown={() =>
                      onTabClick({ attributeType: key, value: item.name })
                    }
                    className="text-sm p-2 rounded-full w-full hover:bg-accent"
                  >
                    {item.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          );
        })}
      </Tabs>
    </>
  );
}

function removeSameAttributeNames(
  attributes: { variantId: number; name: string }[]
) {
  const uniqueAttributes = attributes.reduce((acc, cur) => {
    if (!acc.find((x) => x.name === cur.name)) {
      acc.push(cur);
    }
    return acc;
  }, [] as { variantId: number; name: string }[]);
  return uniqueAttributes;
}
