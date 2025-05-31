'use client';

import React, { useState } from 'react';
import { DataTable } from '@/components/shadcn/data-table';
import { useBlogColumns } from './useBlogsColumn';
import { useQuery } from '@tanstack/react-query';
import { fetchAllBlogs } from './api';
import { CardContent, CardFooter } from '@/components/shadcn/card';

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/shadcn/pagination';
import { cn } from '@/lib/utils';

function getPages(current: number, lastPage: number) {
	// If total pages <= 5, show all pages
	if (lastPage <= 5) {
		return Array.from({ length: lastPage }, (_, i) => i + 1);
	}

	const pages = [];

	// Always show first and last page
	pages.push(1);

	// Calculate left and right window around current page
	const left = current - 1;
	const right = current + 1;

	if (current <= 3) {
		// Near start: show 2 and 3, then ellipsis, then last page
		pages.push(2, 3, '...');
	} else if (current >= lastPage - 2) {
		// Near end: show ellipsis, last-2, last-1, then last page
		pages.push('...', lastPage - 2, lastPage - 1);
	} else {
		// Middle: show ellipsis, current-1, current, current+1, ellipsis
		pages.push('...', left, current, right, '...');
	}

	// Include last page always
	pages.push(lastPage);

	// Remove duplicates (in case pages overlap)
	return [...new Set(pages)];
}

export default function BlogTable() {
	const columns = useBlogColumns();
	const [limit] = useState(10);
	const [skip, setSkip] = useState(0);

	const { data, isLoading } = useQuery({
		queryKey: ['blogs', { limit, skip }],
		staleTime: 0,
		queryFn: () => fetchAllBlogs({ limit, skip }),
	});

	const lastPage = data?.count ? Math.ceil(data.count / limit) : 1;

	const page = Math.min(Math.max(skip + 1, 1), lastPage);

	const goToPage = (pageNumber: number) => {
		if (pageNumber >= 1 && pageNumber <= lastPage) {
			setSkip(pageNumber - 1);
		}
	};

	const goPrev = () => {
		if (page > 1) setSkip(skip - 1);
	};

	const goNext = () => {
		if (page < lastPage) setSkip(skip + 1);
	};

	const pages = getPages(page, lastPage);

	return (
		<>
			<CardContent className=" h-full overflow-auto">
				<DataTable columns={columns} isLoading={isLoading} data={data?.data ?? []} />
			</CardContent>
			<CardFooter>
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								className={cn(page === 1 && 'pointer-events-none')}
								onClick={(e) => {
									e.preventDefault();
									goPrev();
								}}
							/>
						</PaginationItem>

						{pages.map((p, i) =>
							p === 'ellipsis' ? (
								<PaginationItem key={`ellipsis-${i}`}>
									<PaginationEllipsis />
								</PaginationItem>
							) : (
								<PaginationItem key={p}>
									<PaginationLink
										className={cn(page === p && 'bg-blue-300 dark:bg-blue-700 pointer-events-none')}
										onClick={(e) => {
											e.preventDefault();
											goToPage(p as number);
										}}
									>
										{p}
									</PaginationLink>
								</PaginationItem>
							),
						)}

						<PaginationItem>
							<PaginationNext
								className={cn(page === lastPage && 'pointer-events-none')}
								onClick={(e) => {
									e.preventDefault();
									goNext();
								}}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</CardFooter>
		</>
	);
}
