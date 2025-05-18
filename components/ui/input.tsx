"use client";
import { EyeIcon, EyeOff } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Label } from "./label";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: React.ReactNode;
  divClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type, divClassName, ...props }, ref) => {
    const [inputType, setInputType] = React.useState(type);
    return (
      <div className={cn("flex w-full flex-col ", divClassName)}>
        {props.label && (
          <Label className="mb-2" htmlFor={props.id}>
            {props.label}
          </Label>
        )}
        <div className="relative h-full">
          <input
            type={inputType}
            className={cn(
              `flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm text-gray-700 shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50`,
              error && "border-red-500",
              type === "password" && "pr-12",
              className,
            )}
            ref={ref}
            {...props}
          />

          {type === "password" && (
            <div className="absolute inset-y-0 right-3 flex cursor-pointer items-center">
              {inputType === "password" ? (
                <EyeIcon
                  size={16}
                  onClick={() => setInputType("text")}
                  className="text-muted-foreground transition-colors hover:text-primary"
                />
              ) : (
                <EyeOff
                  onClick={() => setInputType("password")}
                  size={16}
                  className="text-muted-foreground transition-colors hover:text-primary"
                />
              )}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };