import { Card, CardContent } from '@/components/shadcn/card';
import Image from 'next/image';
import { Skeleton } from '@/components/shadcn/skeleton';
import { useState } from 'react';
import Link from 'next/link';
import { toKebabCase } from '@/lib/kebab-case';

interface BlogCardProps {
	loading?: 'lazy' | 'eager';
	blog: {
		id?: string;
		title: string;
		description?: string;
		thumbnailUrl?: string;
		dateCreated?: string;
	};
}

export default function BlogCard({
	loading = 'lazy',
	blog: { title, thumbnailUrl = '/images/placeholder-img.webp', description },
}: BlogCardProps) {
	const [photoUrl, setPhotoUrl] = useState(thumbnailUrl);

	const [isImageLoading, setIsImageLoading] = useState(true);

	const slug = toKebabCase(title);

	return (
		<li className=" h-full">
			<Card className="h-full">
				<CardContent>
					<Link href={`/${slug}`}>
						<div className="w-full relative aspect-[360/240] mb-4">
							{isImageLoading && (
								<Skeleton
									data-testid="loading-skeleton"
									className="w-full aspect-[360/240] top-0 left-0"
								/>
							)}
							<Image
								fill
								className="object-cover overflow-clip rounded-lg"
								loading={loading}
								onLoad={() => setIsImageLoading(false)}
								onError={() => setPhotoUrl('/images/placeholder-img.webp')}
								src={photoUrl}
								alt={`${title}-thumbnail`}
							/>
						</div>
					</Link>
					<Link href={`/${slug}`} className="hover:opacity-70">
						<h3 className="h3 line-clamp-3 mb-3">{title ?? 'Title'}</h3>
					</Link>
					<Link href={`/${slug}`} className="hover:opacity-70">
						<p className="line-clamp-3 mb-3">
							{description ??
								`Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste aut eius fugiat esse
						iusto, cupiditate, sed accusantium eos ex, at et repellendus velit beatae dolores
						blanditiis deleniti unde ut magni. At, voluptas quaerat, odit voluptate officiis
						doloribus atque sed, quia a vel eos architecto labore. Provident consequuntur omnis
						quibusdam, eveniet fuga nihil illo laboriosam, fugit quam quos repudiandae minus
						aliquam. Maiores quidem magni fuga odio aut. Quisquam quam laborum dolorum amet vitae
						soluta, corporis est. Possimus at praesentium corporis ab debitis dicta, necessitatibus
						animi, perferendis sunt odit obcaecati fuga optio. Ipsa distinctio dolor at consequuntur
						ducimus eveniet alias vitae officia non tempore omnis, vero voluptas est, fugiat
						corporis ex ratione fugit dolorem eligendi atque pariatur natus molestias ullam.
						Voluptates, eligendi? Sequi rem quas esse minima dolores quaerat possimus natus
						adipisci! Excepturi minus vero tenetur voluptate accusamus, quidem placeat amet est
						ratione molestiae cum ipsum molestias magni nesciunt tempore quaerat et. Assumenda
						soluta quo modi maiores nemo fugit ipsa non esse rem, corporis ducimus aut facere
						corrupti omnis. Nam eaque sed, provident molestiae, amet aliquam maxime quasi ab
						repellendus velit alias. Nostrum modi a repudiandae temporibus, quas necessitatibus
						eligendi neque, ad ipsum amet quae, natus consequatur. Officiis ullam libero nam a esse
						sequi repellendus optio, nihil tempore inventore non repellat illum. Minima iste
						quisquam tempore harum autem consectetur odit ex ab aliquam nisi, dolorem explicabo
						neque distinctio animi dolor reiciendis nam inventore pariatur tempora eum quidem
						reprehenderit. Placeat mollitia officiis eum. Quisquam sunt praesentium, accusamus eius
						excepturi dolor eveniet corporis nihil, saepe animi, harum tempora rem nobis. Quam
						provident suscipit cumque deleniti labore quae repellat beatae, odio tenetur aspernatur
						necessitatibus ut! Nesciunt amet qui repudiandae vero corrupti repellendus laborum?
						Voluptate fugiat culpa laboriosam eius molestiae officiis eveniet, esse adipisci illum
						nihil facilis animi inventore beatae ut aperiam cupiditate odio aspernatur quibusdam.`}
						</p>
					</Link>
					<Link href={`/${slug}`} className="hover:opacity-70">
						<p className="mb-3">Read More</p>
					</Link>
				</CardContent>
			</Card>
		</li>
	);
}
