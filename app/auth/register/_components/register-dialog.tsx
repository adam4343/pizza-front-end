"use client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import React from "react";
import firstStep from "./first-step";
import secondStep from "./second-step";

const steps = {
  firstStep: firstStep,
  secondStep: secondStep,
};

export default function RegisterDialog() {
  const [currentStep, setCurrentStep] =
    React.useState<keyof typeof steps>("firstStep");
  const [payload, setPayload] = React.useState<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  }); 

  const Step = steps[currentStep];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center text-white-color gap-2 w-full">
          Create account
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white-color">
        <DialogTitle className="sr-only">Register Dialog</DialogTitle>
        <Step
          setCurrentStep={setCurrentStep}
          setPayload={setPayload}
          payload={payload}
        />
      </DialogContent>
    </Dialog>
  );
}
