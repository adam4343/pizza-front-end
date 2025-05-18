"use client";
import React from "react";
import { Title } from "@/components/shared/title";
import { Button } from "@/components/ui";
import { CartSection } from "./cart-section";
import { PersonalInfoForm } from "./personal-info-form";
import { DeliveryAddressForm } from "./delivery-address-form";
import { OrderSummary } from "./order-summary";
import { Container } from "@/components/common/container";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useGetCartItems } from "@/lib/hooks/useGetCartItems";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/configs/axios.config";
import { toast } from "sonner";
import { useGetTotalPrice } from "@/lib/hooks/useGetTotalPrice";

const checkoutFormSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters"),
  surname: z.string().min(2, "Surname should be at least 2 characters"),
  email: z.string().email("Please enter valid email"),
  phone: z.string().min(10, "Phone should be at least 8 characters"),
  address: z.string().min(8, "Address is too short"),
  comment: z.string().optional(),
});

export type TCheckoutForm = z.infer<typeof checkoutFormSchema>;

export default function CheckoutPage() {
  const query = useGetCartItems();
  const totalPrice = useGetTotalPrice();

  const form = useForm<TCheckoutForm>({
    resolver: zodResolver(checkoutFormSchema),
  });

  
  const mutation = useMutation({
    mutationFn: async () => {
      const postRequests = query.data?.map((cartItem) => {
        return axiosInstance.post("/order", {
          name: form.getValues("name"),
          surname: form.getValues("surname"),
          email: form.getValues("email"),
          phone: form.getValues("phone"),
          timeOfDelivery: new Date(),
          totalPrice: totalPrice,
          pizzaId: cartItem.pizzaId,
          pizzaVariationId: cartItem.pizzaVariationId,
          ingredientsId: cartItem.ingredients.map(i => i.ingredientId),
          additionalIngredientsId: cartItem.additionalIngredients.map(a => a.additionalIngredientId),
          status: "pending",
        });
      });
  
      const results = await Promise.allSettled(postRequests ?? []);

      const allSuccessful = results.every(r => r.status === "fulfilled");
      
      if (allSuccessful) {
        toast.success("Order has been created successfully");
        window.location.href = "/orders";
      } else {
        toast.error("Some items failed to order. Please check again.");
        console.error(results);
      }
    },
  
    onSuccess: async () => {
      toast.success("Order has been created successfully");
      window.location.href = "/orders";
    },
  });
 

  const isDisabled = React.useMemo(() => {
    return !!query.data?.length;
  },[query.data])

  return (
    <Container>
      <form className="pb-5" onSubmit={(e) => {
        e.preventDefault()

        form.handleSubmit(() => {
          mutation.mutate()
        })(e)
      }}>
        <div className="py-12">
          <Title
            text="Placing an order"
            size="xl"
            className="text-3xl font-bold "
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CartSection />
            <PersonalInfoForm form={form} />
            <DeliveryAddressForm form={form} />
          </div>

          <div className="lg:col-span-1">
            <OrderSummary />
            <Button disabled={!isDisabled} type="submit" className="w-full mt-4">Proceed to payment</Button>
          </div>
        </div>
      </form>
    </Container>
  );
}
