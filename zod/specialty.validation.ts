import { z } from "zod";

export const createSpecialtyServerZodSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .optional(),

  icon: z
    .instanceof(File, {
      message: "Please select an icon",
    })
    .optional(),
});

export const updateSpecialtyServerZodSchema =
  createSpecialtyServerZodSchema;