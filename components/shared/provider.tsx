"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Toaster } from "sonner";
import { AppProgressBar } from "next-nprogress-bar";
import Header from "../common/header";
import { Footer } from "./footer";
import { GoogleOAuthProvider } from "@react-oauth/google";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT || ''}>
      <QueryClientProvider client={queryClient}>
        <>
          <AppProgressBar
            color="#FF0000"
            height="3px"
            options={{ showSpinner: false }}
          />
          <Header />
          {children}
          <Footer />
          <Toaster position="top-right" richColors />
        </>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};
