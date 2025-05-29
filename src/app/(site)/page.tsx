import FeaturedBlogCard from './FeaturedBlogCard';
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
			<section className="border-rgb(229, 231, 235) border-t border-b py-10 bg-background-alt">
				<Container>
					<FeaturedBlogCard
						title="All he wanted was a candy bar."
						content={`Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas dicta perspiciatis debitis temporibus fuga! Perspiciatis voluptates repudiandae obcaecati necessitatibus illum temporibus eos minus et? Quae voluptate itaque architecto provident commodi.
							Beatae, sapiente culpa. Facilis explicabo ab nihil asperiores, nemo laboriosam soluta sed reprehenderit incidunt commodi alias qui architecto nisi ullam optio quam. Maiores libero non, sequi impedit labore corporis suscipit.
							Aperiam eos aliquid tempora, reiciendis laudantium fugit dolores dolor itaque nihil corrupti perspiciatis magni. Dolore aliquam quas ad? Pariatur laboriosam libero aperiam at nisi nulla ipsa iusto deleniti eligendi suscipit!
							Magnam eligendi ullam nesciunt, libero, deserunt saepe deleniti sit dolores mollitia reprehenderit amet modi culpa inventore? Aspernatur pariatur libero deleniti voluptatum, accusamus assumenda dolorum maiores vitae, voluptate aperiam corporis rem.
							Accusantium architecto eius quaerat, aspernatur ea id modi laboriosam eaque illo corporis veniam, vitae quis vero deserunt laudantium laborum mollitia minus cum non, ipsam doloribus. Ipsa dolorum numquam id. Minus!
							Excepturi facere laudantium commodi officia ab ratione architecto sed quidem dolore assumenda enim eum nesciunt placeat voluptatibus ullam vitae harum, quaerat accusamus similique nam hic? Beatae incidunt veniam blanditiis voluptatibus?
							Eveniet consectetur delectus porro fugiat, dolorem quia quas magni nostrum recusandae facilis repudiandae. Voluptas provident quae reprehenderit debitis vel aliquid consectetur odit? Exercitationem tempora nulla sint illo iste itaque voluptate.
							Iusto ad adipisci exercitationem et inventore debitis recusandae doloremque illo, minus deleniti atque maiores, veniam pariatur fugit ab rem ex tempore, laudantium perferendis quos eos quod repudiandae vitae ipsum! Nobis.
							Veniam quibusdam saepe optio eius illum? Explicabo nulla illo quibusdam corporis numquam facere provident commodi ipsum fugiat. Provident cupiditate, aperiam reprehenderit laborum omnis repudiandae quo dolores, praesentium quidem magnam rem.
							Nesciunt iste provident sint enim ipsam ab, quis nisi optio, excepturi aperiam nobis amet eos dignissimos minima voluptates corrupti fugiat. Quasi fugit nesciunt eos ducimus consequuntur repudiandae odit amet minus?`}
						datePublished={new Date()}
					/>
				</Container>
			</section>
			<Container>
				<SiteBlogList />
			</Container>
		</>
	);
}
