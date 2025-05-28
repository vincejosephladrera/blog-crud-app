import { PropsWithChildren } from 'react';

import { SidebarProvider, SidebarTrigger } from '@/components/shadcn/sidebar';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout({ children }: PropsWithChildren) {
	return (
		<SidebarProvider>
			<AdminSidebar />
			<main>
				<SidebarTrigger />
				{children}
			</main>
		</SidebarProvider>
	);
}
