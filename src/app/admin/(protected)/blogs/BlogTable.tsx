'use client';

import { useState } from 'react';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/shadcn/table';
import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';

export function BlogTable() {
	const [page, setPage] = useState(1);
	const totalPages = 5; // static for now

	return (
		<>
			<Input className="w-[90%] mb-4" id="title" placeholder="Search by Title" />
			<div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Title</TableHead>
							<TableHead>Excerpt</TableHead>
							<TableHead>Created By</TableHead>
							<TableHead>Created At</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{[...Array(8)].map((_, i) => (
							<TableRow key={i}>
								<TableCell className="font-medium">Blog Title {i + 1}</TableCell>
								<TableCell>Sample excerpt for blog {i + 1}...</TableCell>
								<TableCell>user_{i + 1}</TableCell>
								<TableCell>2025-05-29</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				{/* Pagination */}
				<div className="flex justify-between items-center mt-20">
					<Button
						variant="outline"
						disabled={page === 1}
						onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
					>
						Previous
					</Button>
					<p className="text-sm text-muted-foreground">
						Page {page} of {totalPages}
					</p>
					<Button
						variant="outline"
						disabled={page === totalPages}
						onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
					>
						Next
					</Button>
				</div>
			</div>
		</>
	);
}
