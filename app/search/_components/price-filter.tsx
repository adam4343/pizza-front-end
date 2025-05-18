'use client'
import { Input, Label } from "@/components/ui";
import React from "react";
import { TFilterPayload } from "./search-filters";

export function PriceFilter({payload, setPayload}: TFilterPayload) {

  return (
    <div className="border-b border-muted pb-7 flex items-start flex-col gap-3">
      <Label htmlFor="startingPrice" id="startingPrice" className="mb-2 font-bold">
        Price from and to:
      </Label>

      <div className="flex items-center gap-4 h-10">
        <div className="relative h-full">
          <Input type="number" min={0} max={payload.maxPrice} onChange={(e) => {
            setPayload({
                ...payload,
                minPrice: Number(e.target.value)
            })
          }} id="startingPrice" className="pl-3 pr-7" value={payload.minPrice} />

          <span className="absolute top-1/2 -translate-y-1/2 right-4 text-muted-foreground text-sm">
            $
          </span>
        </div>

        <div className="relative h-full">
          <Input min={payload.minPrice + 1} max={60} type="number" onChange={(e) => {
              setPayload({
                ...payload,
                maxPrice: Number(e.target.value)
            })
          }} id="startingPrice" className="pl-3 pr-7" value={payload.maxPrice} />

          <span className="absolute top-1/2 -translate-y-1/2 right-4 text-muted-foreground text-sm">
            $
          </span>
        </div>
      </div>
    </div>
  );
}
