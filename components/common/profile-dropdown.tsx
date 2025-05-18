"use client";
import { User } from "lucide-react";
import { Button, DropdownMenu, DropdownMenuTrigger } from "../ui";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { useLogOut } from "@/lib/hooks/useLogOut";
import Link from "next/link";

export default function ProfileDropDown() {
  const mutation = useLogOut();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="h-[50px] hidden lg:flex">
        <Button
          variant={"outline"}
          className={`flex items-center gap-2 h-full px-4 text-primary`}
        >
          <User size={20} />
          Profile
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={'/orders'}>
          Order history

          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            mutation.mutate();
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
