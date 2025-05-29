import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import FeaturedBlogCard from './FeaturedBlogCard';
import '@testing-library/jest-dom';

import { expect } from 'vitest';

vi.mock('next/image', () => ({
	__esModule: true,
	default: ({ fill, ...props }) => <img {...props} alt={props.alt || 'mocked image'} />,
}));

const blog = {
	title: 'Blog Title',
	content: 'Blog Description',
	thumbnailUrl: '/featured-blog.jpg',
	datePublished: new Date(),
};

describe('FeaturedBlogCard', () => {
	it('renders title, datePublished, description', () => {
		const stringDate = new Date().toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});

		render(
			<FeaturedBlogCard
				title={blog.title}
				content={blog.content}
				thumbnailUrl={blog.thumbnailUrl}
				datePublished={blog.datePublished}
			/>,
		);

		// expect().toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /blog title/i })).toBeInTheDocument();
		const image = screen.getByRole('img');
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('src', '/featured-blog.jpg');

		expect(screen.getByText(stringDate)).toBeInTheDocument();
	});

	it('eager loads image', () => {
		render(
			<FeaturedBlogCard
				title={blog.title}
				content={blog.content}
				thumbnailUrl={blog.thumbnailUrl}
				datePublished={blog.datePublished}
			/>,
		);

		const image = screen.getByRole('img');

		expect(image).toHaveAttribute('loading', 'eager');
	});

	it('shows skeleton while the image is still loading', async () => {
		render(
			<FeaturedBlogCard
				title={blog.title}
				content={blog.content}
				thumbnailUrl={blog.thumbnailUrl}
				datePublished={blog.datePublished}
			/>,
		);

		const skeleton = screen.getByTestId('loading-skeleton');

		expect(skeleton).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
		});

		const image = screen.getByRole('img');

		expect(image).toBeInTheDocument();
	});

	it('shows fallback image on error', async () => {
		render(
			<FeaturedBlogCard
				title={blog.title}
				content={blog.content}
				thumbnailUrl={'toError'}
				datePublished={blog.datePublished}
			/>,
		);

		const image = screen.getByRole('img');

		await fireEvent.error(image);

		expect(image).toHaveAttribute('src', '/images/featured-placeholder-img.webp');
	});

	it('shows fallback image on no thumbnailUrl', () => {
		render(
			<FeaturedBlogCard
				title={blog.title}
				content={blog.content}
				datePublished={blog.datePublished}
			/>,
		);

		const image = screen.getByRole('img');

		expect(image).toHaveAttribute('src', '/images/featured-placeholder-img.webp');
	});
});
