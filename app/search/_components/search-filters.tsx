"use client";
import { Button } from "@/components/ui";
import { IngredientsFilter } from "./ingredients-filter";
import { PriceFilter } from "./price-filter";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export interface TFilterPayload {
  payload: {
    ingredients: number[];
    minPrice: number;
    maxPrice: number;
  };
  setPayload: (payload: {
    ingredients: number[];
    minPrice: number;
    maxPrice: number;
  }) => void;
}

export function SearchFilters({setOpen}: {setOpen?: (open: boolean) => void}) {
  const [payload, setPayload] = React.useState<TFilterPayload["payload"]>({
    ingredients: [],
    minPrice: 0,
    maxPrice: 60,
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  React.useEffect(() => {
    try {
      const filters = searchParams.get("filters");
      if (filters) {
        const parsedFilters = JSON.parse(filters);
        setPayload({
          ingredients: parsedFilters.ingredients ?? [],
          minPrice: parsedFilters.minPrice ?? 0,
          maxPrice: parsedFilters.maxPrice ?? 60,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, [searchParams]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const urlSearchParams = new URLSearchParams(searchParams);
        urlSearchParams.set("filters", JSON.stringify(payload));
        router.push(
          `${window.location.pathname}?${urlSearchParams.toString()}`
        );
      }}
      className="flex flex-col h-full"
    >
      <div className="space-y-6 flex-grow lg:flex-grow-0 overflow-y-auto pb-6">
        <PriceFilter payload={payload} setPayload={setPayload} />
        <IngredientsFilter payload={payload} setPayload={setPayload} />
      </div>
      
      <div className="pt-4 mt-auto lg:mt-0 sticky bottom-0 bg-white-color">
        <Button
          onClick={() => {
            if(setOpen) {
              setOpen(false)
            }
          }}
          type="submit"
          className="py-4 w-full text-white-color text-center flex items-center justify-center"
        >
          Apply
        </Button>
      </div>
    </form>
  );
}