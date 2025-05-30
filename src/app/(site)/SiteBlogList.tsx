'use client';

import { useEffect, useRef } from 'react';
import BlogCard from './BlogCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchAllBlogs } from './api';
import BlogSkeleton from './BlogSkeleton';
import EmptyState from './EmptyState';

interface Blogs {
	id: string;
	title: string;
}

export default function SiteBlogList() {
	const {
		data: blogs,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
		isLoading,
	} = useInfiniteQuery({
		initialPageParam: 0,
		queryKey: ['blogs'],
		queryFn: fetchAllBlogs,
		staleTime: 0,
		getNextPageParam: (lastPage) => {
			const { skip, limit, total } = lastPage;
			const nextSkip = skip + limit;
			return nextSkip < total ? nextSkip : undefined;
		},
	});

	const loadMoreRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = loadMoreRef.current;

		if (!el || !hasNextPage) return;

		let fetching = false;

		const checkAndFetch = () => {
			if (fetching || isFetchingNextPage || !hasNextPage) return;

			const rect = el.getBoundingClientRect();
			const isVisible = rect.top <= window.innerHeight + 200 && rect.bottom >= 0;

			if (isVisible) {
				fetching = true;
				fetchNextPage().finally(() => {
					fetching = false;

					// After render, check again in case we're still stuck at the bottom
					requestAnimationFrame(() => {
						checkAndFetch();
					});
				});
			}
		};

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					checkAndFetch();
				}
			},
			{
				rootMargin: '200px',
			},
		);

		observer.observe(el);

		// Initial check — in case the element is already in view
		checkAndFetch();

		return () => observer.disconnect();
	}, [fetchNextPage, hasNextPage, isFetchingNextPage]);

	return (
		<div className="py-20">
			<section>
				<h2 className="h2 mb-8">All Blogs</h2>
				{isLoading ? (
					<ul className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8 list-none">
						<BlogSkeleton />
					</ul>
				) : blogs?.pages[0].blogs.length === 0 ? (
					<EmptyState />
				) : (
					<>
						<ul className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
							{blogs?.pages.flatMap((page) =>
								page.blogs.map((blog: Blogs) => <BlogCard key={blog.id} blog={blog} />),
							)}
						</ul>
					</>
				)}
				{isFetchingNextPage && (
					<ul className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8 list-none">
						<BlogSkeleton />
					</ul>
				)}
				<div ref={loadMoreRef} style={{ height: '1px' }} />
				{!hasNextPage && blogs?.pages[0].blogs.length !== 0 && (
					<p className="h3 text-center">You&apos;ve reached the end! Thanks for reading!</p>
				)}
			</section>
		</div>
	);
}
