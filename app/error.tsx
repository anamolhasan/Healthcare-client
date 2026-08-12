"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md border-border/60 shadow-xl shadow-black/5">
        <CardHeader className="items-center text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-destructive/10">
            <AlertTriangle className="size-8 text-destructive" />
          </div>

          <CardTitle className="text-2xl font-semibold">
            Something went wrong
          </CardTitle>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            We couldn&apos;t load this page right now. Please try again or
            return to the homepage.
          </p>
        </CardHeader>

        <CardContent>
          <div className="rounded-xl border border-border/50 bg-muted/40 p-4 text-center">
            <p className="text-xs text-muted-foreground">
              Don&apos;t worry, your account and data are safe.
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={() => reset()} className="w-full sm:w-auto">
            <RefreshCw className="mr-2 size-4" />
            Try again
          </Button>

          <Button
            variant="outline"
            asChild
            className="w-full sm:w-auto"
          >
            <Link href="/">
              <Home className="mr-2 size-4" />
              Go home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default Error;