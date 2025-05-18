"use client";

import { Title } from "@/components/shared/title";
import { Button, Input } from "@/components/ui";
import { axiosInstance } from "@/lib/configs/axios.config";
import { sessionKey } from "@/lib/hooks/useSession";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const secondStepSchema = z
  .object({
    password: z.string().min(6, "Password should be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password should be at least 6 characters"),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match",
      path: ["confirmPassword"],
    }
  );

interface SecondStepProps {
  payload: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
}

export default function SecondStep({ payload }: SecondStepProps) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (payload: {
      name: string;
      email: string;
      password: string;
    }) => {
      try {
        const res = await axiosInstance.post("/auth/register", payload, {
          withCredentials: true
        });

        return res.data;
      } catch (e) {
        console.error(e || "Something went wrong");
      }
    },
    onSuccess: async () => {
      toast.success("Your account has been created successfully");
      await queryClient.invalidateQueries({queryKey: [sessionKey]})
      window.location.href = '/'
    },
    onError: (e) => {
      toast.error(e.message || "Something went wrong");
    },
  });

  const form = useForm<z.infer<typeof secondStepSchema>>({
    resolver: zodResolver(secondStepSchema),
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit(
          (data) => {
            mutation.mutate({ ...payload, ...data });
          },
          (error) => {
            toast.error(Object.values(error)[0].message);
          }
        )(e);
      }}
    >
      <div className="mb-5">
        <Title text="Create a passowrd" size="md" className="font-semibold" />
      </div>

      <div className="space-y-4 mb-5">
        <Input
          {...form.register("password")}
          type="password"
          placeholder="Password"
          id="password"
        />

        <Input
          {...form.register("confirmPassword")}
          placeholder="Confirm Password"
          id="confirmPassword"
          type="password"
        />
      </div>

      <div>
        <Button isPending={mutation.isPending} type="submit" className="w-full text-white-color">
          Create Account
        </Button>
      </div>
    </form>
  );
}
