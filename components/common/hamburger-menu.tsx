"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet } from "../ui";
import { SheetContent, SheetTrigger } from "../ui/sheet";
import { buttonVariants } from "@/lib/utils";
import SearchInput from "./search-input";
import Link from "next/link";
import { Title } from "../shared/title";
import { useSession } from "@/lib/hooks/useSession";
import { useLogOut } from "@/lib/hooks/useLogOut";

export function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const user = useSession();
  const logout = useLogOut();

  const handleLinkClick = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={`${buttonVariants({ variant: "outline" })} p-4 h-full block lg:hidden`}
      >
        <Menu className="text-primary" size={18} />
      </SheetTrigger>
      <SheetContent onOpenAutoFocus={(e) => e.preventDefault()} className="bg-white-color flex flex-col h-full w-full max-w-full">
        <div className="h-[45px] mt-10 px-4">
          <SearchInput />
        </div>

        <div className="mt-8 flex flex-col flex-grow">
          <ul className="space-y-4 px-4">
            {!user.data ? (
              <>
                <li>
                  <Link
                    href="/auth/register"
                    onClick={handleLinkClick}
                    className="block py-3 px-2 text-lg font-medium rounded-md transition-colors"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/login"
                    onClick={handleLinkClick}
                    className="block py-3 px-2 text-lg font-medium rounded-md transition-colors"
                  >
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/orders"
                    onClick={handleLinkClick}
                    className="block py-3 px-2 text-lg font-medium rounded-md transition-colors"
                  >
                    Order History
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      logout.mutate();
                      setOpen(false);
                    }}
                    className="w-full text-left block py-3 px-2 text-lg font-medium rounded-md transition-colors hover:bg-muted"
                  >
                    Log Out
                  </button>
                </li>
              </>
            )}

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
                href="/legal/terms"
                onClick={handleLinkClick}
                className="block py-3 px-2 text-lg font-medium rounded-md transition-colors"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                href="/legal/terms"
                onClick={handleLinkClick}
                className="block py-3 px-2 text-lg font-medium rounded-md transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={handleLinkClick}
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
