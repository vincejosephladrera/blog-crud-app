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
import { NotepadTextIcon } from 'lucide-react';
import DarkModeToggleCMS from './DarkModeToggleCMS';
import UserNav from './UserNav';

const contentMaintenanceLinks = [
	{
		title: 'Blogs',
		url: '/admin/blogs',
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
						<UserNav />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
