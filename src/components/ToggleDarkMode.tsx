'use client';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/shadcn/tooltip';

import { SunIcon, MoonIcon } from 'lucide-react';
import { toggleTheme } from '@/store/themeSlice';

export default function ToggleDarkMode() {
	const theme = useAppSelector((state) => state.theme.theme);
	const dispatch = useAppDispatch();

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger
					className="ml-auto"
					onClick={() => {
						if (theme === 'light') {
							localStorage.setItem('theme', 'dark');
						} else {
							localStorage.setItem('theme', 'light');
						}
						dispatch(toggleTheme());
					}}
				>
					{theme === 'light' ? (
						<SunIcon className="text-white" />
					) : (
						<MoonIcon className=" text-white" />
					)}
				</TooltipTrigger>
				<TooltipContent>
					<p className="font-bold">
						{theme === 'light' ? 'Toggle to light mode' : 'Toggle to dark mode'}
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
