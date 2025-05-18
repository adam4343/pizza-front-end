"use client";
import { Title } from "@/components/shared/title";
import { TAdditionalIngredient } from "@/types/TPizza";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function IngredientCard({
  ingredient,
}: {
  ingredient: TAdditionalIngredient;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const additionalSearchParams = new URLSearchParams(searchParams);
  const addIngParams = searchParams.get("additionalIngredients");

  const isSelected = useMemo(() => {
    try {
      const ids = JSON.parse(addIngParams ?? "[]") as number[];
      return ids.includes(ingredient.id);
    } catch {
      return false;
    }
  }, [addIngParams, ingredient.id]);

  const toggleIngredient = () => {
    try {
      const current = JSON.parse(addIngParams ?? "[]") as number[];
      const newList = current.includes(ingredient.id)
        ? current.filter((id) => id !== ingredient.id)
        : [...current, ingredient.id];

      additionalSearchParams.set(
        "additionalIngredients",
        JSON.stringify(newList)
      );
      router.push(`?${additionalSearchParams.toString()}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      role="button"
      onClick={toggleIngredient}
      className={`flex flex-col items-center p-3 h-full rounded-2xl bg-muted/60 border transition-all ${
        isSelected ? "border-primary" : "border-transparent"
      }`}
    >
      <Image
        height={90}
        width={90}
        src={ingredient.image}
        alt={ingredient.name}
        className="mb-2"
      />
      <div className="flex-grow">
        <Title
          text={ingredient.name}
          size="sm"
          className="text-xs text-center"
        />
      </div>

      <p className="text-sm mt-1">{ingredient.price} $</p>
    </div>
  );
}
