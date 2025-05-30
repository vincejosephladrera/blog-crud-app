import { ColumnDef } from '@tanstack/react-table';

export type Blog = {
	id: string;
	title: string;
	excerpt: string;
	created_by: string;
	created_at: string;
};

export const columns: ColumnDef<Blog>[] = [
	{
		accessorKey: 'title',
		header: 'Title',
	},
	{
		accessorKey: 'excerpt',
		header: 'Excerpt',
	},
	{
		accessorKey: 'created_by',
		header: 'Created By',
	},
	{
		accessorKey: 'created_at',
		header: 'Created At',
		cell: ({ row }) => {
			const date = new Date(row.getValue('created_at'));
			return date.toLocaleString();
		},
	},
];
