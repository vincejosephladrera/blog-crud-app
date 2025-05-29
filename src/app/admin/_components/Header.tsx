import Container from '@/components/Container';
import ToggleDarkMode from './ToggleDarkMode';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
	return (
		<header className="h-[96px] bg-[#02362D] z-50 fixed top-0 left-0 w-screen grid items-center">
			<Container className="flex">
				<Link href="/">
					<Image src="/images/logo.webp" alt="logo" width={229} height={48} />
				</Link>

				<ToggleDarkMode />
			</Container>
		</header>
	);
}
