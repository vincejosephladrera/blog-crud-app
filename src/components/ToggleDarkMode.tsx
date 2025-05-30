'use client';

import { useEffect, useState } from 'react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/shadcn/tooltip';

import { SunIcon, MoonIcon } from 'lucide-react';

export default function ToggleDarkMode() {
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
					className="ml-auto"
					onClick={() => {
						setIsDarkMode(!isDarkMode);
					}}
				>
					{isDarkMode ? <SunIcon /> : <MoonIcon className=" text-white" />}
				</TooltipTrigger>
				<TooltipContent>
					<p className=" font-bold">
						{isDarkMode ? 'Toggle to light mode' : 'Toggle to dark mode'}
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
