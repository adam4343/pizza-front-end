"use client";

import { Button, Input, Label } from "@/components/ui";
import { axiosInstance } from "@/lib/configs/axios.config";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export default function ForgotPasswordForm() {
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof forgotPasswordSchema>) => {
      const res = await axiosInstance.post(
        "http://localhost:3001/auth/forgot-password",
        {
          email: data.email,
        }
      );

      return res.data;
    },

    onSuccess: () => {
      toast.success("An email has been sent to restore your password");
    },

    onError: (e) => {
      toast.error(e.message  || "Something went wrong");
    },
  });
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        form.handleSubmit((data) => mutation.mutate(data))(e);
      }}
      className="max-w-[320px] mb-4 w-full space-y-4"
    >
      <div className="space-y-1">
        <Label htmlFor="email">Email address</Label>
        <Input {...form.register("email")} id="email" type="email" />
      </div>

      <div>
        <Button type="submit" isPending={mutation.isPending} className="w-full text-white-color">Send Link</Button>
      </div>
    </form>
  );
}
