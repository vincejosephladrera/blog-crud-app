import { PropsWithChildren } from 'react';
import Header from '@/components/Header';

export default function Site({ children }: PropsWithChildren) {
	return (
		<>
			<Header />
			<main className="pt-[96px]">{children}</main>
		</>
	);
}
