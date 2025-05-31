import { PropsWithChildren } from 'react';

import { SidebarProvider, SidebarTrigger } from '@/components/shadcn/sidebar';

import AdminSidebar from './AdminSidebar';

export default async function CMSLayout({ children }: PropsWithChildren) {
	return (
		<SidebarProvider>
			<div className="overflow-hidden w-screen h-screen">
				<AdminSidebar />
				<SidebarTrigger className="absolute top-0 left-0 z-20 lg:hidden" />
				<main className="lg:pl-[17rem] w-full h-screen relative p-4">{children}</main>
			</div>
		</SidebarProvider>
	);
}
