"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowRight, PizzaIcon } from "lucide-react";
import Image from "next/image";
import { Title } from "../shared/title";
import CartItem from "./cart-item";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useGetCartItems } from "@/lib/hooks/useGetCartItems";
import React from "react";
import { useGetTotalPrice } from "@/lib/hooks/useGetTotalPrice";
import Link from "next/link";

export const cartOpenKey = "cart";

export default function ShoppingCart() {
  const query = useGetCartItems();
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalCartPrice = useGetTotalPrice()

  return (
    <Sheet
      open={searchParams.get(cartOpenKey) === "true"}
      onOpenChange={(open) => {
        const editSearchParams = new URLSearchParams(searchParams);
        if (open) {
          editSearchParams.set(cartOpenKey, "true");
          router.push(
            window.location.pathname + "?" + editSearchParams.toString()
          );
        } else {
          editSearchParams.delete(cartOpenKey);
          router.push(
            window.location.pathname + "?" + editSearchParams.toString()
          );
        }
      }}
    >
      <SheetTrigger asChild>
        <Button className="flex group items-center gap-3 px-4 h-full text-white-color">
          <b className="hidden lg:block">{totalCartPrice.toFixed(2)} $</b>

          <span className="w-[1px] h-full bg-muted hidden lg:block" />

          <div className="relative">
            <ArrowRight
              size={18}
              className="-translate-x-full hidden lg:block group-hover:translate-x-1/2 -translate-y-1/2 opacity-0 absolute top-1/2  group-hover:opacity-100 transition-all duration-300"
            />

            <div className="flex items-center gap-2">
              <PizzaIcon
                strokeWidth={2}
                size={18}
                className="group-hover:opacity-0"
              />

              <b className="group-hover:opacity-0 transition-all duration-300">
                {query.data?.length}
              </b>
            </div>
          </div>
        </Button>
      </SheetTrigger>

      <SheetContent className="bg-muted flex flex-col  h-full w-full max-w-full">

        <SheetHeader className="flex items-start">
          <SheetTitle className="font-normal">
            In the cart:<b> {query.data?.length} items</b>
          </SheetTitle>
        </SheetHeader>

        {(query.data?.length ?? 0)< 1 ? (
          <div className="h-full flex items-center justify-center">
            <div className="flex items-center flex-col">
              <div className="relative w-[120px] aspect-square mb-5">
                <Image
                  src={"/image-empty-box.png"}
                  alt="Empty shopping cart, no items added"
                  fill
                />
              </div>

              <div className="text-center">
                <Title
                  text="Empty cart"
                  size="lg"
                  className="text-[22px] font-bold"
                />

                <p>Add at least one pizza, to create an order</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col gap-[10px] pb-[10px] h-[713px] flex-grow overflow-y-auto">
              {query.data?.map((cartItem, id) => (
                <CartItem cartItem={cartItem} key={id} />
              ))}
            </div>

            <SheetFooter className="bg-white-color p-8">
              <div className="flex flex-col gap-5 w-full">
                <div className="flex items-center gap-3">
                  <p>Total:</p>

                  <div className="h-[8px] w-full border-b-2 border-dotted border-muted-foreground"></div>

                  <b className="text-lg flex-shrink-0">{totalCartPrice.toFixed(2)} $</b>
                </div>

                <div className="flex items-center gap-3">
                  <p>Tax:</p>

                  <div className="h-[8px] w-full border-b-2 border-dotted border-muted-foreground"></div>

                  <b className="text-lg flex-shrink-0">1.12 $</b>
                </div>

                <Link href={"/checkout"} className={`w-full group relative h-[55px] rounded-[18px] ${buttonVariants({variant: "default"})} text-[17px] `}>
                  <b>Finish order</b>
                  <ArrowRight
                    size={22}
                    className="-translate-x-full group-hover:-translate-x-[10px] -translate-y-1/2 absolute top-1/2 right-5 transition-all duration-300"
                  />
                </Link>
              </div>
            </SheetFooter>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
