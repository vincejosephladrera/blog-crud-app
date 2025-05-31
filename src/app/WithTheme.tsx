import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTheme } from '@/store/themeSlice';

export default function WithTheme({ children }: { children: React.ReactNode }) {
	const dispatch = useAppDispatch();
	const theme = useAppSelector((state) => state.theme.theme);

	useEffect(() => {
		// On mount, set theme from localStorage or system preference
		const stored = localStorage.getItem('theme');

		if (stored === 'light' || stored === 'dark') {
			dispatch(setTheme(stored));
		} else {
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			dispatch(setTheme(prefersDark ? 'dark' : 'light'));
		}
	}, [dispatch]);

	useEffect(() => {
		const root = document.documentElement;
		root.classList.toggle('dark', theme === 'dark');
		localStorage.setItem('theme', theme);
	}, [theme]);

	return <>{children}</>;
}
