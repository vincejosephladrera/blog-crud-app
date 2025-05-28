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

import { NotepadTextIcon, SettingsIcon, ChevronUpIcon } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu';

const contentMaintenanceLinks = [
	{
		title: 'Blogs',
		url: '/admin/blogs',
		icon: NotepadTextIcon,
	},
];

const adminMaintenanceLinks = [
	{
		title: 'Admin Settings',
		url: '/admin/settings',
		icon: SettingsIcon,
	},
];

interface LinkProps {
	title: string;
	url: string;
	icon: typeof NotepadTextIcon;
}

export default function AdminSidebar() {
	return (
		<Sidebar>
			<SidebarHeader></SidebarHeader>
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
				<SidebarGroup className=" mt-auto">
					<SidebarGroupLabel>User/Admin Maintenance</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{adminMaintenanceLinks.map(({ title, url, icon }: LinkProps) => {
								const IconComponent = icon;
								return (
									<SidebarMenuItem key={title}>
										<SidebarMenuButton asChild>
											<Link href={url}>
												<IconComponent />
												<span>{title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
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
								<DropdownMenuItem>
									<span>Account</span>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<span>Sign out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
