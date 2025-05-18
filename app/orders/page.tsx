"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useGetOrderItems } from "@/lib/hooks/useGetOrderItems";
import { Container } from "@/components/common/container";
import { OrderItem } from "./_components/order-item";
import { Skeleton } from "@/components/ui/skeleton";
import { Title } from "@/components/shared/title";

export default function OrderHistory() {
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({
    "0": true,
  });

  const query = useGetOrderItems();

  if (query.isLoading) {
    return (
      <section className="py-8 px-4">
        <Container>
          <div className="max-w-[752px] w-full">
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <div className="w-full sm:w-20 flex-shrink-0">
                    <Skeleton className="w-full h-20 rounded-md" />
                  </div>

                  <div className="flex flex-col flex-grow gap-2">
                    <Skeleton className="h-5 w-3/4 sm:w-1/2 rounded-md" />
                    <Skeleton className="h-4 w-full sm:w-3/4 rounded-md" />
                  </div>

                  <div className="sm:ml-auto text-right flex-shrink-0 space-y-2">
                    <Skeleton className="h-5 w-16 rounded-md ml-auto" />
                    <Skeleton className="h-4 w-10 rounded-md ml-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Paid":
        return "success";
      case "Canceled":
        return "destructive";
      case "Processing":
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <section className="py-8 px-4">
      <Container>
        <div className="max-w-[752px] w-full">
          <Title className="text-3xl font-bold mb-8" text="My Orders" size="xl" />

          {query.data && query.data.length > 0 ? (
            <div className="space-y-4">
              {query.data.map((order, id) => (
                <Card key={id} className="overflow-hidden">
                  <CardHeader className="bg-muted/30 py-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl flex items-center gap-2">
                        Order #{id + 1}
                      </CardTitle>
                      <div className="flex items-center gap-4">
                        <Badge
                          variant={getStatusBadgeVariant(order.status)}
                          className="px-3 py-1"
                        >
                          {order.status}
                        </Badge>
                        <button
                          onClick={() => toggleOrderExpansion(String(id))}
                          className="p-1 rounded-full hover:bg-muted"
                        >
                          {expandedOrders[id] ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </CardHeader>

                  {expandedOrders[id] && (
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        {order.orderItem.map((item) => (
                          <OrderItem orderItem={item} key={item.id} />
                        ))}
                        <Separator className="my-4" />
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Total:</span>
                          <span className="font-bold text-lg">
                            {order.totalPrice.toFixed(2)} $
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col mt-10 pb-10 lg:pb-44">
              <Title className="text-2xl font-semibold mb-2" text="No orders yet" size="lg" />
              <p className="text-muted-foreground max-w-md">
                You have not placed any orders yet. Once you do, they will show up here so you can easily track them.
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
