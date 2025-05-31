'use client';

import { useEffect, useRef } from 'react';
import BlogCard from './BlogCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchAllActiveBlogs } from './api';
import BlogSkeleton from './BlogSkeleton';
import EmptyState from './EmptyState';
import Container from '@/components/Container';
import FeaturedBlogCard from './FeaturedBlogCard';

interface Blog {
	id?: string;
	title: string;
	excerpt: string;
	content: string;
	thumbnailUrl?: string;
	createdAt: Date;
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
		queryFn: fetchAllActiveBlogs,
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
		const lastFetchedPage = { current: -1 };

		const checkAndFetch = () => {
			if (fetching || isFetchingNextPage || !hasNextPage) return;

			// Get the latest skip from last page of data
			const lastPage = blogs?.pages[blogs.pages.length - 1];
			if (!lastPage) return;

			const currentSkip = lastPage.skip;

			// Only fetch if we haven't fetched this page yet
			if (lastFetchedPage.current === currentSkip) return;

			const rect = el.getBoundingClientRect();
			const isVisible = rect.top <= window.innerHeight + 200 && rect.bottom >= 0;

			if (isVisible) {
				fetching = true;
				fetchNextPage().finally(() => {
					fetching = false;
					lastFetchedPage.current = currentSkip;

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
	}, [fetchNextPage, hasNextPage, isFetchingNextPage, blogs]);

	return (
		<>
			<section className="border-rgb(229, 231, 235) border-t border-b py-10 bg-background-alt">
				<Container>
					{}
					<FeaturedBlogCard
						title={blogs?.pages[0].blogs[0].title}
						excerpt={blogs?.pages[0].blogs[0].excerpt}
						datePublished={blogs?.pages[0].blogs[0].createdAt}
						slug={blogs?.pages[0].blogs[0].slug}
					/>
				</Container>
			</section>

			<section className="py-20">
				<Container>
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
									page.blogs.map((blog: Blog) => <BlogCard key={blog.id} blog={blog} />),
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
				</Container>
			</section>
		</>
	);
}
