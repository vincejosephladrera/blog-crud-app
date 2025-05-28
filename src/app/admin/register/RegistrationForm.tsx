import { cn } from '@/lib/utils';
import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import Link from 'next/link';

export default function RegistrationForm({ className, ...props }: React.ComponentProps<'form'>) {
	return (
		<form className={cn('flex flex-col gap-6', className)} {...props}>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">Create a new account</h1>
				<p className="text-muted-foreground text-sm text-balance">
					Enter your credentials below to create a new account
				</p>
			</div>
			<div className="grid gap-6">
				<div className="grid gap-3">
					<Label htmlFor="firstName">First Name</Label>
					<Input id="firstName" placeholder="Vince Joseph" required />
				</div>
				<div className="grid gap-3">
					<Label htmlFor="lastName">Last Name</Label>
					<Input id="lastName" placeholder="Ladrera" required />
				</div>
				<div className="grid gap-3">
					<Label htmlFor="">Email</Label>
					<Input id="email" type="email" placeholder="codebyvince@gmail.com" required />
				</div>
				<div className="grid gap-3">
					<div className="flex items-center">
						<Label htmlFor="password">Password</Label>
					</div>
					<Input id="password" type="password" required />
				</div>
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
	);
}
