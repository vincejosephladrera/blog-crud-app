import {
	Sidebar,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarContent,
	SidebarHeader,
	SidebarFooter,
} from '@/components/shadcn/sidebar';
import Link from 'next/link';

import SignOutButton from './SignOutButton';
import { NotepadTextIcon, ChevronUpIcon } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu';

import DarkModeToggleCMS from './DarkModeToggleCMS';

const contentMaintenanceLinks = [
	{
		title: 'Blogs',
		url: '/user/blogs',
		icon: NotepadTextIcon,
	},
];

export default function AdminSidebar() {
	return (
		<Sidebar>
			<SidebarHeader>
				<SidebarGroup className="mt-auto">
					<DarkModeToggleCMS />
				</SidebarGroup>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Content Maintenance</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{contentMaintenanceLinks.map(({ title, url, icon: IconComponent }) => (
								<SidebarMenuItem key={title}>
									<SidebarMenuButton asChild>
										<Link href={url}>
											<IconComponent />
											<span>{title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton>
									Username
									<ChevronUpIcon className="ml-auto" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
								<SignOutButton />
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
