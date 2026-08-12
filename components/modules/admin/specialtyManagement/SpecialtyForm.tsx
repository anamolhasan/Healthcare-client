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
import Image from "next/image";
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
    icon: null,
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
            <AppField field={field} label="Title" placeholder="Cardiology" />
          )}
        </form.Field>

        {/* Icon */}
        <form.Field name="icon">
          {(field) => {
            const firstError =
              field.state.meta.isTouched && field.state.meta.errors?.length
                ? field.state.meta.errors[0]
                : undefined;

            const selectedFile = field.state.value;

            return (
              <div className="space-y-2">
                <Label
                  htmlFor="specialty-icon"
                  className={cn(firstError && "text-destructive")}
                >
                  Icon
                </Label>

                <label
                  htmlFor="specialty-icon"
                  className={cn(
                    "flex min-h-40 cursor-pointer flex-col items-center justify-center",
                    "rounded-lg border-2 border-dashed px-6 py-6 text-center",
                    "bg-muted/20 transition-colors",
                    "hover:border-primary/50 hover:bg-muted/40",
                    firstError && "border-destructive",
                  )}
                >
                  {/* Existing / Selected Image */}
                  {selectedFile ? (
                    <div className="mb-3 flex flex-col items-center">
                      <Image
                        src={URL.createObjectURL(selectedFile)}
                        alt="Selected icon"
                        width={80}
                        height={80}
                        className="size-20 rounded-xl object-cover"
                      />

                      <p className="mt-2 max-w-60 truncate text-sm font-medium">
                        {selectedFile.name}
                      </p>
                    </div>
                  ) : initialData?.icon ? (
                    <div className="mb-3 flex flex-col items-center">
                      <Image
                        src={initialData.icon}
                        alt={initialData.title}
                        width={80}
                        height={80}
                        className="size-20 rounded-xl object-cover"
                      />

                      <p className="mt-2 text-sm font-medium">Current icon</p>
                    </div>
                  ) : (
                    <div className="mb-3 text-2xl">📎</div>
                  )}

                  <p className="text-sm font-medium">
                    {selectedFile
                      ? "Change icon"
                      : initialData?.icon
                        ? "Click to change icon"
                        : "Add icon"}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Click to upload or drag and drop
                  </p>

                  <p className="mt-2 text-xs text-muted-foreground">
                    PNG, JPG or WEBP
                  </p>

                  <input
                    id="specialty-icon"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (file) {
                        field.handleChange(file);
                      }
                    }}
                    onBlur={field.handleBlur}
                  />
                </label>

                {firstError && (
                  <p className="text-sm text-destructive">
                    {String(firstError)}
                  </p>
                )}
              </div>
            );
          }}
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
              field.state.meta.isTouched && field.state.meta.errors.length > 0
                ? field.state.meta.errors[0]
                : null;

            return (
              <div className="space-y-1.5">
                <Label
                  htmlFor={field.name}
                  className={cn(firstError && "text-destructive")}
                >
                  Description
                </Label>

                <Textarea
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Enter specialty description"
                  className={cn(firstError && "border-destructive")}
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
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting] as const}
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
              {mode === "edit" ? "Update Specialty" : "Create Specialty"}
            </AppSubmitButton>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
};

export default SpecialtyForm;
