"use client";
import { Button, Input, Label } from "@/components/ui";
import { axiosInstance } from "@/lib/configs/axios.config";
import { sessionKey } from "@/lib/hooks/useSession";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter valid email"),
  password: z.string().min(6, "Password should be at least 6 characters"),
});

export default function LoginForm() {
 const queryClient = useQueryClient()
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof loginSchema>) => {
      const res = await axiosInstance.post("http://localhost:3001/auth/login", {
        email: data.email,
        password: data.password,
      });

      return res.data;
    },
    onSuccess: async () => {
      toast.success("You have logged in successfully");
      await queryClient.invalidateQueries({queryKey: [sessionKey]})
      router.push("/");
    },
    onError: (e) => {
      toast.error(e.message || "Something went wrong");
    },
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        form.handleSubmit((data) => mutation.mutate(data))(e);
      }}
      action="#"
      className="space-y-4"
    >
      <div className="space-y-1">
        <Label htmlFor="email" className="text-sm">
          Email address
        </Label>

        <Input {...form.register("email")} id="email" className="bg-muted/60" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password" className="text-sm">
          Password
        </Label>

        <Input
          {...form.register("password")}
          id="password"
          type="password"
          className="bg-muted/60"
        />
      </div>

      <div className="flex justify-end">
        <Link
          className="text-sm text-primary hover:underline transition-all duration-300"
          href={"/auth/forgot-password"}
        >
          Forgot password?
        </Link>
      </div>

      <div>
        <Button
          isPending={mutation.isPending}
          className="w-full text-white-color font-medium"
          type="submit"
        >
          Sign in
        </Button>
      </div>
    </form>
  );
}
