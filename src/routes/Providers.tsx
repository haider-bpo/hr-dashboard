"use client";
import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import Loader from "@/components/@core/Loader";
import ErrorBoundary from "./ErrorBoundary";
import { ThemeProvider } from "@/contexts/theme-context";
import { PUBLISHABLE_KEY } from "@/config/environment";
import { ScrollArea } from "@/components/ui/scroll-area";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ErrorBoundary>
        <ClerkProvider
          publishableKey={PUBLISHABLE_KEY}
          afterSignOutUrl="/signin"
          // signInFallbackRedirectUrl={"/"}
          // signInUrl="/"
          // signInForceRedirectUrl={'/'}
        >
          <BrowserRouter>
            <Suspense fallback={<Loader />}>
              <ThemeProvider>
                {children}
              </ThemeProvider>
            </Suspense>
          </BrowserRouter>
        </ClerkProvider>
      </ErrorBoundary>
    </>
  );
}
