import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const commonPostSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  summary: z.string().optional(),
  date: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  category: z.string(),
  author: z.string().optional().default("Altibase 노동조합"),
  thumbnail: z.string().optional().default(""),
  thumbnailAlt: z.string().optional().default(""),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(true),
  slug: z.string()
});

const noticeSchema = commonPostSchema.extend({
  category: z.literal("공지"),
  important: z.boolean().optional(),
  pinned: z.boolean().optional(),
  attachments: z.array(z.object({ name: z.string(), url: z.string() })).optional().default([])
}).refine((data) => Boolean(data.description || data.summary), {
  message: "description 또는 기존 summary가 필요합니다."
});

const activitySchema = commonPostSchema.extend({
  category: z.literal("활동보고"),
  period: z.string(),
  year: z.number().int(),
  month: z.number().int().min(1).max(12)
}).refine((data) => Boolean(data.description || data.summary), {
  message: "description 또는 기존 summary가 필요합니다."
});

export const collections = {
  notices: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./content/notices" }),
    schema: noticeSchema
  }),
  activities: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./content/activities" }),
    schema: activitySchema
  })
};
