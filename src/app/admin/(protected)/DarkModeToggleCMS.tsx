'use client';

import { Tooltip, TooltipProvider, TooltipTrigger } from '@/components/shadcn/tooltip';

import { SunIcon, MoonIcon } from 'lucide-react';
import { TooltipContentNoArrow } from '@/components/shadcn/tooltip-content-no-arrow';
import { toggleTheme } from '@/store/themeSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function DarkModeToggleCMS() {
	const theme = useAppSelector((state) => state.theme.theme);
	const dispatch = useAppDispatch();

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger
					className="w-fit ml-auto"
					onClick={() => {
						if (theme === 'light') {
							localStorage.setItem('theme', 'dark');
						} else {
							localStorage.setItem('theme', 'light');
						}
						dispatch(toggleTheme());
					}}
				>
					{theme === 'light' ? <SunIcon /> : <MoonIcon className="text-white" />}
				</TooltipTrigger>
				<TooltipContentNoArrow>
					<p className=" font-bold">
						{theme === 'dark' ? 'Toggle to light mode' : 'Toggle to dark mode'}
					</p>
				</TooltipContentNoArrow>
			</Tooltip>
		</TooltipProvider>
	);
}
