'use client';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu';
import { SidebarMenuButton } from '@/components/shadcn/sidebar';
import { ChevronUpIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DropdownMenuItem } from '@/components/shadcn/dropdown-menu';
import { signOut } from './api';

export default function UserNav() {
	const router = useRouter();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<SidebarMenuButton>
					<span>Admin</span>
					<ChevronUpIcon className="ml-auto" />
				</SidebarMenuButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
				<DropdownMenuItem asChild>
					<button
						className="w-full"
						onClick={async () => {
							await signOut();
							router.push('/');
						}}
					>
						Sign Out
					</button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
