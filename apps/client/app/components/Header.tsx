import BagIcon from '@/icons/BagIcon'
import LoveIcon from '@/icons/LoveIcon'
import { useCategories } from '@/lib/hooks/queries'
import { AvatarImage } from '@radix-ui/react-avatar'
import { Link } from '@remix-run/react'
import { Avatar } from './ui/Avatar'

export default function Header() {
	const { data: categories } = useCategories()

	return (
		<header className="max-w-5xl mx-auto px-4">
			<div className="flex items-center justify-between h-20">
				<Link to="/">
					<h2 className="text-xl font-semibold">
						Swift <span className="text-gray-400">Shop</span>
					</h2>
				</Link>

				<ul className="flex items-center gap-6 text-sm font-medium">
					{categories?.map((category) => (
						<li key={category.id}>
							<Link to={`/products?categoryId=${category.id}`}>{category.name}</Link>
						</li>
					))}
				</ul>

				<div className="flex items-center gap-5">
					<BagIcon />

					<LoveIcon />

					<Link to="/login">
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" />
						</Avatar>
					</Link>
				</div>
			</div>
		</header>
	)
}
