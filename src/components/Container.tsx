import { cn } from '@/lib/utils';

const Container = ({ children, className }: React.HtmlHTMLAttributes<HTMLDivElement>) => {
	return <div className={cn('container mx-auto px-4', className)}>{children}</div>;
};

export default Container;
