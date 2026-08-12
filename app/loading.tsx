import { Activity } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center">
        {/* Logo / Icon */}
        <div className="relative mb-6">
          <div className="absolute inset-0 animate-ping rounded-2xl bg-primary/20" />

          <div className="relative flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Activity className="size-8 animate-pulse" />
          </div>
        </div>

        {/* Brand */}
        <h2 className="text-xl font-semibold tracking-tight">
          PH Healthcare
        </h2>

        {/* Loading text */}
        <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <span>Preparing your experience</span>

          <span className="flex gap-1">
            <span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-primary" />
          </span>
        </div>

        {/* Progress line */}
        <div className="mt-5 h-1 w-40 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/2 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-primary" />
        </div>
      </div>
    </div>
  );
};

export default Loading;