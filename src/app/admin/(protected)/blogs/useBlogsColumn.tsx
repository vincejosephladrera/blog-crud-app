'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Edit2Icon, DeleteIcon } from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { setAlert } from '@/store/alertSlice';

import { toKebabCase } from '@/lib/kebab-case';
import Link from 'next/link';

interface Blog {
	id?: string;
	title: string;
	content: string;
	thumbnailUrl?: string;
	createdAt: Date;
}

export const useBlogColumns = (): ColumnDef<Blog>[] => {
	const dispatch = useAppDispatch();

	return [
		{
			accessorKey: 'id',
			header: '',
			cell: () => null,
		},
		{
			accessorKey: 'title',
			header: 'Title',
		},
		{
			accessorKey: 'excerpt',
			header: 'Excerpt',
		},
		{
			accessorKey: 'createdAt',
			header: 'Created At',
			cell: ({ row }) => {
				const date = new Date(row.getValue('createdAt'));
				return date.toLocaleString();
			},
		},
		{
			accessorKey: 'actions',
			header: 'Actions',
			cell: ({ row }) => {
				const title = row.getValue('title') as string;
				const slug = toKebabCase(title);

				const alert = {
					content: {
						message: `Are you sure you want to delete "${title}"`,
						title: 'Are you absolutely sure?',
						cancelLabel: 'Cancel',
						confirmLabel: 'Continue',
						slug: slug,
					},
				};

				const handleDelete = () => {
					dispatch(setAlert(alert));
				};

				return (
					<div className="flex gap-2">
						<Link
							className="bg-blue-400 dark:bg-blue-700 text-black dark:text-white rounded-xl p-2"
							href={`blogs/${slug}`}
						>
							<Edit2Icon size={24} />
						</Link>
						<button
							onClick={handleDelete}
							className="bg-red-400 dark:bg-red-700 text-black dark:text-white rounded-xl p-2"
						>
							<DeleteIcon size={24} />
						</button>
					</div>
				);
			},
		},
	];
};
