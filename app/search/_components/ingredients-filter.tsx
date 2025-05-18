"use client";
import { Label, Checkbox, Button, Input } from "@/components/ui";
import React from "react";
import { TFilterPayload } from "./search-filters";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/configs/axios.config";
import { TIngredient } from "@/types/TPizza";
import { Skeleton } from "@/components/ui/skeleton";

export function IngredientsFilter({ payload, setPayload }: TFilterPayload) {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>("");

  const query = useQuery({
    queryKey: ["ingredients"],
    queryFn: async () => {
      const res = await axiosInstance.get("/pizza/ingredients");

      return res.data.data as TIngredient[];
    },
  });

  const foundIngredients = React.useMemo(() => {
    const filteredSearch = search.trim();

    if (!query.data) {
      return [];
    }

    return query.data?.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(filteredSearch)
    );
  }, [query.data, search]);

  if (query.isLoading) {
    return (
      <div className="flex items-start flex-col gap-3">
        <Skeleton className="h-4 w-32 rounded-md" />
        <div className="gap-4 flex flex-col h-[220px] overflow-hidden pr-5 w-full">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Skeleton className="w-4 h-4 rounded" />
              <Skeleton className="h-4 w-24 rounded-md" />
            </div>
          ))}
        </div>

        <Skeleton className="h-4 w-20 rounded-md" />
      </div>
    );
  }

  if (query.error) {
    return <div>refetch</div>;
  }
  return (
    <div className="flex items-start flex-col gap-3">
      <Label
        htmlFor="startingPrice"
        id="startingPrice"
        className="mb-2 font-bold"
      >
        Ingredients:
      </Label>

      <div className={`mb-2 ${expanded ? "block" : "hidden"} `}>
        <Input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          id="search"
          placeholder="Search ingredient"
          className="h-8"
        />
      </div>

      <div
        className={`gap-4 flex flex-col h-[220px] pr-5 ${
          expanded ? "overflow-y-auto" : "overflow-hidden"
        }`}
      >
        {foundIngredients.length > 0
          ? foundIngredients.map((ingredient, id) => (
              <div key={id} className="flex items-center space-x-2">
                <Checkbox
                  checked={payload.ingredients.includes(ingredient.id)}
                  onCheckedChange={() => {
                    if (payload.ingredients.includes(ingredient.id)) {
                      const updatedPayload = payload.ingredients.filter(
                        (ing) => ing !== ingredient.id
                      );
                      setPayload({
                        ...payload,
                        ingredients: updatedPayload,
                      });
                    } else {
                      setPayload({
                        ...payload,
                        ingredients: [...payload.ingredients, ingredient.id],
                      });
                    }
                  }}
                  id={`${ingredient.id}`}
                />
                <Label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {ingredient.name}
                </Label>
              </div>
            ))
          : "No ingredients found"}
      </div>

      <Button
        onClick={() => setExpanded(true)}
        className={`bg-transparent text-primary transition-all duration-300 py-0 h-auto hover:underline hover:bg-transparent ${
          expanded ? "hidden" : ""
        }`}
      >
        Show More
      </Button>

      <Button
        onClick={() => {
          setExpanded(false);
        }}
        className={`bg-transaprent hidden text-primary transition-all duration-300 py-0 h-auto hover:underline hover:bg-transparent  ${
          expanded ? "block" : ""
        }`}
      >
        Show Less
      </Button>
    </div>
  );
}
