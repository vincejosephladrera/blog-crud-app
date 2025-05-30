'use client';

import { useAppSelector } from '@/store/hooks';
import { useState, useEffect } from 'react';
import { GalleryVerticalEnd } from 'lucide-react';

import LoginForm from '@/app/admin/login/LoginForm';
import { useRouter } from 'next/navigation';

export default function LoginPageClient() {
	const user = useAppSelector((state) => state.user);

	const [isLoading, setIsLoading] = useState(true);

	const router = useRouter();

	useEffect(() => {
		if (user.accessToken) {
			setIsLoading(true);
			router.push('/admin/blogs');
		} else {
			setIsLoading(false);
		}
	}, [router, user]);

	if (isLoading)
		return (
			<div className="h-screen w-screen flex items-center justify-center">
				<div className="spinner"></div>
			</div>
		);

	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<a href="#" className="flex items-center gap-2 font-medium">
						<div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
							<GalleryVerticalEnd className="size-4" />
						</div>
						Blog App
					</a>
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-sm">
						<LoginForm />
					</div>
				</div>
			</div>
			<div className="bg-muted relative hidden lg:block"></div>
		</div>
	);
}
