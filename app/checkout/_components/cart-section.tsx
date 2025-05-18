"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetCartItems } from "@/lib/hooks/useGetCartItems";
import CartItem from "@/components/common/cart-item";
import { Skeleton } from "@/components/ui/skeleton";

export function CartSection() {
  const cartItems = useGetCartItems();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-se">1. Your cart</CardTitle>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          Remove cart
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-4">
          <div className="flex items-center h-[350px] overflow-y-scroll flex-col justify-between py-2 border-b">
            {cartItems.isLoading ? (
              <div className="space-y-4 w-full px-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div className="flex items-center gap-8 w-full" key={i}>
                    <Skeleton className="h-16 w-16 rounded-md" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                    <Skeleton className="h-6 w-10 ml-auto" />
                  </div>
                ))}
              </div>
            ) : (
              cartItems.data?.map((cartItem) => (
                <CartItem
                  className="w-full"
                  key={cartItem.id}
                  cartItem={cartItem}
                />
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
