"use client";
import { Button, Input, Label } from "@/components/ui";
import { axiosInstance } from "@/lib/configs/axios.config";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export default function ResetPasswordForm() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");

  const mutation = useMutation({
    mutationFn: async (data: {
      password: string;
      confirmPassword: string;
      token: string;
    }) => {
      const res = await axiosInstance.post(
        "http://localhost:3001/auth/reset-password",
        {
          password: data.password,
          confirmPassword: data.confirmPassword,
          token: data.token,
        }
      );

      return res.data;
    },
    onSuccess: () => {
      toast.success("You have changed your password successfully!");
      router.push("/auth/login");
    },
    onError: (e) => {
      toast.error(e.message || "Something went wrong");
    },
  });
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        if (!token) return;

        form.handleSubmit((data) =>
          mutation.mutate({
            password: data.password,
            confirmPassword: data.confirmPassword,
            token: token,
          })
        )(e);
      }}
      className="space-y-4 w-full max-w-[320px]"
    >
      <div className="space-y-1">
        <Label htmlFor="password" className="text-sm">
          New Password
        </Label>

        <Input
          {...form.register("password")}
          id="password"
          type="password"
          className="bg-muted/60 w-full"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="confirmPassword" className="text-sm">
          Confirm Password
        </Label>

        <Input
          {...form.register("confirmPassword")}
          id="confirmPassword"
          type="password"
          className="bg-muted/60"
        />
      </div>

      <div>
        <Button
          isPending={mutation.isPending}
          className="w-full text-white-color font-medium"
          type="submit"
        >
          Reset Password
        </Button>
      </div>
    </form>
  );
}
