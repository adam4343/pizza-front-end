"use client";
import Link from "next/link";
import { Container } from "./container";
import Logo from "./logo";
import SearchInput from "./search-input";
import { User } from "lucide-react";
import ShoppingCart from "./shoppig-cart";
import { buttonVariants } from "@/lib/utils";
import { usePathname } from "next/navigation";
import ProfileDropDown from "./profile-dropdown";
import { useSession } from "@/lib/hooks/useSession";
import { HamburgerMenu } from "./hamburger-menu";
import { Suspense } from "react";

export default function Header() {
  const user = useSession();
  const pathname = usePathname();
  const isAuth = !pathname.includes("auth");

  return (
    <>
      {isAuth && (
        <header className="py-6 lg:py-11 border-b border-muted">
          <Container className="items-center flex gap-10 h-[50px] justify-between lg:justify-normal">
            <Logo />

            <SearchInput className="hidden lg:block" />

            <nav className="flex items-center gap-5 h-full">
              {!user.data ? (
                <Link
                  href={"/auth/register"}
                  className={`items-center hidden lg:flex gap-2 h-full px-4 ${buttonVariants(
                    {
                      variant: "outline",
                    }
                  )}`}
                >
                  <User size={20} />
                  Register
                </Link>
              ) : (
                <ProfileDropDown />
              )}

              <Suspense fallback={<p>Loading cart...</p>}>
                <ShoppingCart />
              </Suspense>

              <HamburgerMenu />
            </nav>
          </Container>
        </header>
      )}
    </>
  );
}
