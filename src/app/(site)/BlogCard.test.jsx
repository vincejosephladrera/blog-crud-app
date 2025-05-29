import { render, screen, waitFor } from '@testing-library/react';
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
		description: 'Test description',
		thumbnailUrl: '/test-thumbnail.jpg',
	};

	it('renders title, description, image, date created, and read more', () => {
		render(<BlogCard blog={blog} />);

		expect(screen.getByRole('heading', { name: /test blog title/i })).toBeInTheDocument();
		expect(screen.getByText(/test description/i)).toBeInTheDocument();
		const image = screen.getByAltText(/test blog title-thumbnail/i);
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('src', '/test-thumbnail.jpg');
		expect(screen.getByText(/read more/i)).toBeInTheDocument();
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
});
