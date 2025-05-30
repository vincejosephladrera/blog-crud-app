import { z } from 'zod';

export const createBlogSchema = z.object({
	title: z.string(),
	excerpt: z.string(),
	content: z.string(),
	thumbnailUrl: z.string(),
});

export type CreateBlogInput = z.infer<typeof createBlogSchema>;
