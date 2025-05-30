'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from './login-schema';
import { useRouter } from 'next/navigation';

import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
	FormField,
	Form,
} from '@/components/shadcn/form';

import { login } from './api';

import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '@/store/hooks';

import { useForm } from 'react-hook-form';
import { PasswordInput } from '@/components/shadcn/password-input';
import { addError } from '@/store/errorSlice';
import { setUser } from '@/store/userSlice';

export default function LoginForm({ className, ...props }: React.ComponentProps<'form'>) {
	const form = useForm<LoginInput>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const dispatch = useAppDispatch();
	const router = useRouter();

	const { handleSubmit } = form;

	const { mutate: loginMutate } = useMutation({
		mutationFn: login,
		onSuccess: (data) => {
			localStorage.setItem('access_token', data.session.access_token);
			dispatch(setUser({ email: null, accessToken: data.session.access_token }));
			router.push('/admin/blogs');
		},
		onError: (error) => {
			dispatch(addError(error.message));
		},
	});

	return (
		<Form {...form}>
			<form
				className={cn('flex flex-col gap-6', className)}
				{...props}
				onSubmit={handleSubmit((values) => loginMutate(values))}
			>
				<div className="flex flex-col items-center gap-2 text-center">
					<h1 className="text-2xl font-bold">Login to your account</h1>
					<p className="text-muted-foreground text-sm text-balance">
						Enter your email and password below to login to your account
					</p>
				</div>
				<div className="grid gap-6">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => {
							return (
								<FormItem className="grid gap-3">
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => {
							return (
								<FormItem className="grid gap-3">
									<FormLabel>Password</FormLabel>
									<FormControl>
										<PasswordInput type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					<Button type="submit" className="w-full">
						Login
					</Button>
				</div>
				<div className="text-center text-sm">
					Don&apos;t have an account?{' '}
					<Link href="/admin/register" className="underline underline-offset-4">
						Sign up
					</Link>
				</div>
			</form>
		</Form>
	);
}
