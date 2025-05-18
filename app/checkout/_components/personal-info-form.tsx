"use client";

import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { TCheckoutForm } from "./checkout-page";

export function PersonalInfoForm({
  form,
}: {
  form: UseFormReturn<TCheckoutForm>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">2. Personal information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Name</Label>
              <Input
                {...form.register("name")}
                id="firstName"
                placeholder="Enter your name"
              />
              {form.formState.errors.name && <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Surname</Label>
              <Input
                {...form.register("surname")}
                id="lastName"
                placeholder="Enter your surname"
              />
              {form.formState.errors.surname && <p className="text-sm text-destructive">{form.formState.errors.surname.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-Mail</Label>
              <Input
                {...form.register("email")}
                id="email"
                type="email"
                placeholder="vasya@pupkin.ru"
              />
              {form.formState.errors.email && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input {...form.register("phone")} id="phone" placeholder="+7 (999) 100-20-20" />
              {form.formState.errors.phone && <p className="text-sm text-destructive">{form.formState.errors.phone.message}</p>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
