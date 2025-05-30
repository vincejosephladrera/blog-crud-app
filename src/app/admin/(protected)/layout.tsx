import { PropsWithChildren } from 'react';

import { SidebarProvider, SidebarTrigger } from '@/components/shadcn/sidebar';

import AdminSidebar from './AdminSidebar';

export default async function CMSLayout({ children }: PropsWithChildren) {
	return (
		<SidebarProvider>
			<AdminSidebar />
			<SidebarTrigger />
			<main className="p-4 w-full h-screen">{children}</main>
		</SidebarProvider>
	);
}
