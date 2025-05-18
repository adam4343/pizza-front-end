'use client'
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui";
import { FilterIcon } from "lucide-react";
import { SearchFilters } from "./search-filters";
import React from "react";

export function MobileFilterDialog() {
    const [open, setOpen] = React.useState<boolean>(false)

  return (
    <div className="md:hidden">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center gap-1">
            <FilterIcon size={16} />
            <span>Filters</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md p-0 h-[100dvh] sm:h-auto w-screen sm:w-[90%] sm:p-6 sm:rounded-lg bg-white-color">
          <div className="flex flex-col h-full">
            <DialogHeader className="px-4 py-3 sm:p-0 border-b sm:border-b-0">
              <DialogTitle>Filters</DialogTitle>
            </DialogHeader>

            <div className="overflow-y-auto flex-grow p-4 sm:p-0 sm:py-4">
              <SearchFilters setOpen={setOpen} />
            </div>

            <div className="p-4 border-t">
           
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
