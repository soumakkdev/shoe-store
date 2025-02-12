import { Avatar, AvatarImage } from '../ui/Avatar'
import FloatingCounter from '../ui/FloatingCounter'
import CartDrawer from '../home/CartDrawer'
import { useState } from 'react'
import { IconButton } from '../ui/IconButton'
import { useCart } from '~/hooks/useCart'
import { useCategories } from '~/hooks/queries'
import { Link } from 'react-router'
import BagIcon from '~/icons/BagIcon'
import LoveIcon from '~/icons/LoveIcon'

export default function Header({ minimal }: { minimal?: boolean }) {
	const { data: categories } = useCategories()
	const { cartCount } = useCart()
	const [isCartOpen, setIsCartOpen] = useState(false)

	return (
		<header className="max-w-5xl mx-auto px-4">
			<div className="flex items-center justify-between h-20">
				<Link to="/">
					<h2 className="text-xl font-semibold">
						Shoe.<span className="text-gray-400">Shop</span>
					</h2>
				</Link>

				{!minimal && (
					<ul className="flex items-center gap-6 text-sm font-medium">
						{categories?.map((category) => (
							<li key={category.id}>
								<Link to={`/products?categoryId=${category.id}`}>{category.name}</Link>
							</li>
						))}
					</ul>
				)}

				<div className="flex items-center gap-3">
					<FloatingCounter count={cartCount}>
						<IconButton onClick={() => setIsCartOpen(true)}>
							<BagIcon size={24} className="mb-0.5" />
						</IconButton>
					</FloatingCounter>

					<IconButton>
						<LoveIcon size={24} />
					</IconButton>

					<Link to="/login">
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" />
						</Avatar>
					</Link>
				</div>
			</div>

			<CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
		</header>
	)
}
