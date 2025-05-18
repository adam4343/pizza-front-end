"use client";
import { Search } from "lucide-react";
import { Input, Label } from "../ui";
import React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function SearchInput({ className = "" }: { className?: string }) {
  const [search, setSearch] = React.useState<string>("");

  const router = useRouter();
  return (
    <form
      onSubmit={() => {
        router.push(`/search/?search=${search}`);
      }}
      className={cn("relative w-full h-full", className)}
    >
      <Label className="absolute top-1/2 left-3 -translate-y-1/2">
        <Search size={18} className="text-muted-foreground" />
      </Label>

      <Input
      divClassName="h-full"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        type="search"
        value={search}
        placeholder="Search pizza..."
        id="search"
        className="pl-9 h-full"
      />
    </form>
  );
}
