import { PropsWithChildren } from 'react';
import Header from '../admin/_components/Header';

export default function Site({ children }: PropsWithChildren) {
	return (
		<>
			<Header />
			<main className="pt-[96px]">{children}</main>
		</>
	);
}
