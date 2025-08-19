import { z } from "zod";

export const exampleSchema = z.object({
  name: z.string().min(3),
});

export const signUpSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(5),
});

export const signInSchema = signUpSchema.omit({ name: true });

export const createCourseSchema = z.object({
  name: z.string().min(5),
  categoryId: z.string().min(5, { message: "Category must be selected" }),
  tagline: z.string().min(5),
  description: z.string().min(10),
  thumbnail: z
    .any()
    .refine((file) => file?.name, { message: "Thumbnail is required" }),
});

export const updateCourseSchema = createCourseSchema.partial({
  thumbnail: true,
});

export const mutateContentSchema = z
  .object({
    title: z.string().min(5),
    type: z.string().min(3, { message: "Type is required" }),
    youtubeId: z.string().optional(),
    text: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    const parseVideoId = z.string().min(4).safeParse(val.youtubeId);
    const parseTextId = z.string().min(4).safeParse(val.text);

    if (val.type === "video") {
      if (!parseVideoId.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Youtube ID is required",
          path: ["youtubeId"],
        });
      }
    }
    if (val.type === "text") {
      if (!parseTextId.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Content Text is required",
          path: ["text"],
        });
      }
    }
  });

export const createStudentSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(5),
  photo: z.any().refine((file) => file?.name, { message: "Photo is required" }),
});

export const updateStudentSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().optional(), // Simple: izinkan string apapun termasuk kosong
  photo: z.any().optional(),
});

export const addStudentCourseSchema = z.object({
  studentId: z.string().min(5),
});
