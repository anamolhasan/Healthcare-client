"use client";
import { createSpecialtyAction } from "@/app/(dashboardLayout)/admin/dashboard/specialties-management/_action";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ISpecialty, ISpecialtyPayload } from "@/types/specialty.types";
import { createSpecialtyServerZodSchema } from "@/zod/specialty.validation";
import { useForm } from "@tanstack/react-form";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface SpecialtyFormProps {
  mode: "create" | "edit";
  initialData?: ISpecialty | null;
  onSuccess?: () => void;
}

const SpecialtyForm = ({
  mode,
  initialData = null,
  onSuccess,
}: SpecialtyFormProps) => {
  // const [open, setOpen] = useState(false)
  const router = useRouter();
  const queryClient = useQueryClient();

  const defaultValues: ISpecialtyPayload = {
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    icon: initialData?.icon ?? "",
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createSpecialtyAction,
  });


  const form = useForm({
    defaultValues,

    onSubmit: async ({ value }) => {
      const result = await mutateAsync(value);

      if (!result.success) {
        toast.error(result.message || "Failed to create specialty");
        return;
      }

      toast.success(result.message || "Specialty created successfully");

      // setOpen(false);
      form.reset();

      await queryClient.invalidateQueries({
        queryKey: ["specialties"],
      });

      onSuccess?.();

      router.refresh();
    },
  });
 return (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      e.stopPropagation();
      form.handleSubmit();
    }}
    className="space-y-6"
  >
    <div className="space-y-4">
      {/* Title */}
      <form.Field
        name="title"
        validators={{
          onChange: createSpecialtyServerZodSchema.shape.title,
        }}
      >
        {(field) => (
          <AppField
            field={field}
            label="Title"
            placeholder="Cardiology"
          />
        )}
      </form.Field>

      {/* Icon */}
      <form.Field
        name="icon"
        validators={{
          onChange: createSpecialtyServerZodSchema.shape.icon,
        }}
      >
        {(field) => (
          <AppField
            field={field}
            label="Icon URL"
            placeholder="https://..."
          />
        )}
      </form.Field>

      {/* Description */}
      <form.Field
        name="description"
        validators={{
          onChange: createSpecialtyServerZodSchema.shape.description,
        }}
      >
        {(field) => {
          const firstError =
            field.state.meta.isTouched &&
            field.state.meta.errors.length > 0
              ? field.state.meta.errors[0]
              : null;

          return (
            <div className="space-y-1.5">
              <Label
                htmlFor={field.name}
                className={cn(
                  firstError && "text-destructive"
                )}
              >
                Description
              </Label>

              <Textarea
                id={field.name}
                value={field.state.value}
                onChange={(e) =>
                  field.handleChange(e.target.value)
                }
                onBlur={field.handleBlur}
                placeholder="Enter specialty description"
                className={cn(
                  firstError && "border-destructive"
                )}
              />

              {firstError && (
                <p className="text-sm text-destructive">
                  {firstError.message}
                </p>
              )}
            </div>
          );
        }}
      </form.Field>
    </div>

    {/* Actions */}
    <div className="flex justify-end gap-3 border-t pt-4">
      <DialogClose asChild>
        <Button
          variant="outline"
          type="button"
          disabled={isPending}
        >
          Cancel
        </Button>
      </DialogClose>

      <form.Subscribe
        selector={(state) =>
          [state.canSubmit, state.isSubmitting] as const
        }
      >
        {([canSubmit, isSubmitting]) => (
          <AppSubmitButton
            isPending={isSubmitting || isPending}
            pendingLabel={
              mode === "edit"
                ? "Updating specialty..."
                : "Creating specialty..."
            }
            disabled={!canSubmit}
          >
            {mode === "edit"
              ? "Update Specialty"
              : "Create Specialty"}
          </AppSubmitButton>
        )}
      </form.Subscribe>
    </div>
  </form>
);
};

export default SpecialtyForm;
