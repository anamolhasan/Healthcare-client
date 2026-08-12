"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const BackButton = () => {
  return (
    <Button
      variant="outline"
      size="lg"
      className="rounded-xl px-6"
      onClick={() => window.history.back()}
    >
      <ArrowLeft className="mr-2 size-4" />
      Go Back
    </Button>
  );
};

export default BackButton;