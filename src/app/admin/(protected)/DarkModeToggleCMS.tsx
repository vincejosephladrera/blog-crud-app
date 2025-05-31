'use client';

import { useEffect, useState } from 'react';
import { Tooltip, TooltipProvider, TooltipTrigger } from '@/components/shadcn/tooltip';

import { SunIcon, MoonIcon } from 'lucide-react';
import { TooltipContentNoArrow } from '@/components/shadcn/tooltip-content-no-arrow';

export default function DarkModeToggleCMS() {
	const [isDarkMode, setIsDarkMode] = useState(true);

	useEffect(() => {
		const html = document.querySelector('html');
		if (isDarkMode) {
			html?.classList.add('dark');
		} else {
			html?.classList.remove('dark');
		}
	}, [isDarkMode]);

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger
					className="w-fit ml-auto"
					onClick={() => {
						setIsDarkMode(!isDarkMode);
					}}
				>
					{isDarkMode ? <SunIcon /> : <MoonIcon className="text-white" />}
				</TooltipTrigger>
				<TooltipContentNoArrow>
					<p className=" font-bold">
						{isDarkMode ? 'Toggle to light mode' : 'Toggle to dark mode'}
					</p>
				</TooltipContentNoArrow>
			</Tooltip>
		</TooltipProvider>
	);
}
