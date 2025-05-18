'use client'
import { Title } from "@/components/shared/title";
import { Button, Input } from "@/components/ui";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/configs/axios.config";

const firstStepSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 character").trim(),
  email: z.string().email({ message: "Invalid email format" }).trim(),
});

interface FirstStepProps {
  setCurrentStep  : (step: "firstStep" | "secondStep") => void,
  setPayload: (payload: {
    name: string,
    email: string,
    password: string
    confirmPassword: string
  }) => void,
  payload: {
    name: string,
    email: string,
    password: string
    confirmPassword: string
  }
}

export default function FirstStep({ setCurrentStep, payload, setPayload }: FirstStepProps) {
  const mutation = useMutation({
    mutationFn: async (data: { name: string; email: string }) => {
        const res = await axiosInstance.post(
          "/auth/check-email",
          { email: data.email }, 
        );

        return res.data
    },
    onSuccess: (_, variables) => {
      setPayload({
        ...payload,
        name: variables.name,
        email: variables.email
      });

      setCurrentStep("secondStep");
    },
    onError: (e: {response: { data: {error: string}}}) => {
      toast.error(e.response.data.error || "Something went wrong!");
    }
  });
  
  const form = useForm<z.infer<typeof firstStepSchema>>({
    resolver: zodResolver(firstStepSchema)
  })
  return (
    <form onSubmit={(e) => {
      e.preventDefault();

      form.handleSubmit(data => {
        mutation.mutate(data)
      }, (error) => {
         const errorMessage = Object.values(error)[0].message
         toast.error(errorMessage)
      })(e)


      
    }
    }>
      <div className="mb-5">
        <Title text="Enter your information" size="md" className="font-semibold" />
      </div>

      <div className="space-y-4 mb-5">
        <Input {...form.register("name")} placeholder="Name" id="name"  />

        <Input {...form.register("email")} placeholder="Email" id="email" type="email"  />
      </div>

      <div>
        <Button isPending={mutation.isPending} type="submit" className="w-full text-white-color">Next</Button>
      </div>
    </form>
  );
}