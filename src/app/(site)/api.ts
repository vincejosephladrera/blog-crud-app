import type { QueryFunctionContext } from '@tanstack/react-query';

async function fetchAllBlogs({ pageParam }: QueryFunctionContext) {
	const limit = 8;
	const skip = pageParam;

	const res = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`);

	if (!res.ok) throw new Error('Failed to fetch blogs');

	const data = await res.json();

	//uncomment to Simulate empty state
	// data.posts = [];
	// data.total = 0;

	return data;
}

export { fetchAllBlogs };
