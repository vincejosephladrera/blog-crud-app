import { PropsWithChildren } from 'react';

import { SidebarProvider, SidebarTrigger } from '@/components/shadcn/sidebar';

import AdminSidebar from './AdminSidebar';

export default async function CMSLayout({ children }: PropsWithChildren) {
	return (
		<SidebarProvider>
			<AdminSidebar />
			<SidebarTrigger />
			<main className="w-full min-h-screen relative p-4">{children}</main>
		</SidebarProvider>
	);
}
