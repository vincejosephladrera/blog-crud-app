import { z } from 'zod';

export const updateBlogSchema = z.object({
	id: z.string(),
	isActive: z.boolean(),
	title: z
		.string()
		.min(5, 'Title must be at least 5 characters long')
		.max(100, 'Title must be at most 100 characters long')
		.trim(),
	slug: z
		.string()
		.min(3, 'Slug must be at least 3 characters long')
		.max(50, 'Slug must be at most 50 characters long')
		.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be URL-friendly (lowercase, hyphens only)'),
	excerpt: z
		.string()
		.min(20, 'Excerpt must be at least 20 characters long')
		.max(300, 'Excerpt must be at most 300 characters long')
		.trim(),
	content: z.string(),
	file: z.instanceof(File).optional(),
	thumbnailUrl: z.string(),
});

export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
