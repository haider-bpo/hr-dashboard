"use client";
import Loader from "@/components/@core/Loader";
import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import { ThemeProvider } from "@/contexts/theme-context";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ErrorBoundary>
        <BrowserRouter>
          <Suspense fallback={<Loader />}>
            <ThemeProvider>{children}</ThemeProvider>
          </Suspense>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
}