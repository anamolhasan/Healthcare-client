import Link from "next/link";
import { Compass, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/shared/BackButton";

const NotFound = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 size-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

        <div className="absolute left-[15%] top-[20%] size-2 rounded-full bg-primary/40" />
        <div className="absolute right-[18%] top-[30%] size-1.5 rounded-full bg-primary/30" />
        <div className="absolute bottom-[20%] left-[25%] size-1.5 rounded-full bg-primary/30" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-xl text-center">
        <div className="relative mb-8">
          <span className="select-none text-[clamp(8rem,25vw,15rem)] font-black leading-none tracking-[-0.08em] text-primary/10">
            404
          </span>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex size-20 items-center justify-center rounded-3xl border border-border/60 bg-background/80 shadow-xl shadow-primary/5 backdrop-blur-xl">
              <Compass
                className="size-9 text-primary"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="mx-auto inline-flex w-fit items-center rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            Page not found
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            This page took a wrong turn.
          </h1>

          <p className="mx-auto max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
            The page you are looking for doesn&apos;t exist, may have been
            moved, or is temporarily unavailable.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="rounded-xl px-6">
            <Link href="/">
              <Home className="mr-2 size-4" />
              Back to Home
            </Link>
          </Button>

          <BackButton />
        </div>

        <p className="mt-10 text-xs text-muted-foreground/70">
          PH Healthcare · Your health, our priority.
        </p>
      </div>
    </main>
  );
};

export default NotFound;