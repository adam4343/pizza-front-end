import { Menu } from "lucide-react";
import { Sheet } from "../ui";
import { SheetContent, SheetTrigger } from "../ui/sheet";
import { buttonVariants } from "@/lib/utils";
import SearchInput from "./search-input";
import Link from "next/link";
import { Title } from "../shared/title";

export function HamburgerMenu() {
  return (
    <Sheet>
      <SheetTrigger
        className={`${buttonVariants({ variant: "outline" })} p-4 h-full block lg:hidden`}
      >
        <Menu className="text-primary" size={18} />
      </SheetTrigger>
      <SheetContent className="bg-white-color flex flex-col h-full w-full max-w-full">

        <div className="h-[45px] mt-10 px-4">
          <SearchInput />
        </div>

        <div className="mt-8 flex flex-col flex-grow">
          <ul className="space-y-4 px-4">
            <li>
              <Link
                href="/auth/register"
                className="block py-3 px-2 text-lg font-medium rounded-md transition-colors"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                href="/auth/login"
                className="block py-3 px-2 text-lg font-medium  rounded-md transition-colors"
              >
                Login
              </Link>
            </li>
            <li className="pt-2">
              <div className="border-t border-muted my-2" />
              <Title
                size="lg"
                text="Information"
                className="pt-2 px-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider"
              />
            </li>
            <li>
              <Link
                href="/terms"
                className="block py-3 px-2 text-lg font-medium  rounded-md transition-colors"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="block py-3 px-2 text-lg font-medium  rounded-md transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block py-3 px-2 text-lg font-medium rounded-md transition-colors"
              >
                About Us
              </Link>
            </li>
          </ul>

          <div className="mt-auto pt-6 pb-4 text-center text-sm text-muted-foreground">
            Created by{" "}
            <span className="font-medium text-primary">Adam Sagleridis</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
