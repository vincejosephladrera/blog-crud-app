import Container from '@/components/Container';
import SiteBlogList from './SiteBlogList';

export default function Home() {
	return (
		<>
			<div className="text-center mb-8 pt-20 pb-12">
				<Container>
					<p className="h4 mb-4">Blog Posts</p>
					<h1 className="h1">Insights & Updates</h1>
				</Container>
			</div>
			<SiteBlogList />
		</>
	);
}
