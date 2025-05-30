import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import BlogCard from './BlogCard';

vi.mock('next/image', () => ({
	__esModule: true,
	default: ({ fill, ...props }) => <img {...props} alt={props.alt || 'mocked image'} />,
}));

describe('BlogCard', () => {
	const blog = {
		title: 'Test Blog Title',
		content: 'Test description',
		thumbnailUrl: '/test-thumbnail.jpg',
		createdAt: new Date(),
	};

	const stringDate = blog.createdAt.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	it('renders title, content, image, date created, and read more', () => {
		render(<BlogCard blog={blog} />);

		expect(screen.getByRole('heading', { name: /test blog title/i })).toBeInTheDocument();
		expect(screen.getByText(/test description/i)).toBeInTheDocument();
		const image = screen.getByAltText(/test blog title-thumbnail/i);
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('src', '/test-thumbnail.jpg');
		expect(screen.getByText(/read more/i)).toBeInTheDocument();

		expect(screen.getByText(stringDate)).toBeInTheDocument();
	});

	it('renders skeleton while image is loading and hides it after image loads', async () => {
		render(<BlogCard blog={{ title: 'Test', description: 'Desc', thumbnailUrl: '/test.jpg' }} />);

		const skeleton = screen.getByTestId('loading-skeleton');
		expect(skeleton).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
		});

		const image = screen.getByAltText(/test-thumbnail/i);
		expect(image).toBeInTheDocument();
	});

	it('shows fallback image on error', async () => {
		render(<BlogCard blog={{ title: 'Test', description: 'Desc', thumbnailUrl: 'toError' }} />);

		const image = screen.getByRole('img');

		await fireEvent.error(image);

		expect(image).toHaveAttribute('src', '/images/placeholder-img.webp');
	});

	it('shows fallback image on no url', async () => {
		render(<BlogCard blog={{ title: 'Test', description: 'Desc' }} />);

		const image = screen.getByRole('img');

		expect(image).toHaveAttribute('src', '/images/placeholder-img.webp');
	});
});
