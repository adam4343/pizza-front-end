"use client";

import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Textarea,
} from "@/components/ui";
import { UseFormReturn } from "react-hook-form";
import { TCheckoutForm } from "./checkout-page";

export function DeliveryAddressForm({
  form,
}: {
  form: UseFormReturn<TCheckoutForm>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">3. Delivery Address</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Enter your address</Label>
            <Input
              {...form.register("address")}
              id="address"
              placeholder="Sofia, Bulgaria 12"
            />
            {form.formState.errors.address && (
              <p className="text-sm text-destructive">
                {form.formState.errors.address.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="comments">Additional note</Label>
            <Textarea
              {...form.register("comment")}
              id="comments"
              placeholder="Please provide additional information for the courier here."
              className="min-h-[100px]"
            />
            {form.formState.errors.comment && (
              <p className="text-sm text-destructive">
                {form.formState.errors.comment.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Delivery time</Label>
            <RadioGroup defaultValue="asap">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="asap" id="asap" />
                <Label htmlFor="asap">Delivery time at 11:00</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
