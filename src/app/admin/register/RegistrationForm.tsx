import { cn } from '@/lib/utils';
import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterInput } from './register-schema';
import { useRouter } from 'next/navigation';

import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
	FormField,
	Form,
} from '@/components/shadcn/form';

import { register } from './api';

import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '@/store/hooks';

import { useForm } from 'react-hook-form';
import { PasswordInput } from '@/components/shadcn/password-input';
import { addError } from '@/store/errorSlice';
import { setUser } from '@/store/userSlice';

export default function RegistrationForm({ className, ...props }: React.ComponentProps<'form'>) {
	const form = useForm<RegisterInput>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const dispatch = useAppDispatch();
	const router = useRouter();

	const { handleSubmit } = form;

	const { mutate: registerMutate } = useMutation({
		mutationFn: register,
		onSuccess: (data) => {
			localStorage.setItem('access_token', String(data?.session?.access_token));
			dispatch(setUser({ email: null, accessToken: String(data?.session?.access_token) }));
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
				onSubmit={handleSubmit((values) => registerMutate(values))}
				{...props}
			>
				<div className="flex flex-col items-center gap-2 text-center">
					<h1 className="text-2xl font-bold">Create a new account</h1>
					<p className="text-muted-foreground text-sm text-balance">
						Enter your credentials below to create a new account
					</p>
				</div>
				<div className="grid gap-6">
					{/* <div className="grid gap-3">
						<Label htmlFor="firstName">First Name</Label>
						<Input id="firstName" placeholder="Vince Joseph" required />
					</div>
					<div className="grid gap-3">
						<Label htmlFor="lastName">Last Name</Label>
						<Input id="lastName" placeholder="Ladrera" required />
					</div> */}
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
										<PasswordInput {...field} />
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
					Already have an account?{' '}
					<Link href="/admin/login" className="underline underline-offset-4">
						Login
					</Link>
				</div>
			</form>
		</Form>
	);
}
