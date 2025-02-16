import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useCategories } from '~/hooks/queries'
import { useCart } from '~/hooks/useCart'
import { useUser } from '~/hooks/useUser'
import BagIcon from '~/icons/BagIcon'
import LoveIcon from '~/icons/LoveIcon'
import { fetchFn } from '~/lib/utils'
import CartDrawer from '../home/CartDrawer'
import { Avatar, AvatarFallback } from '../ui/Avatar'
import { Button } from '../ui/Button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/Dropdown'
import FloatingCounter from '../ui/FloatingCounter'
import { IconButton } from '../ui/IconButton'

export default function Header({ minimal }: { minimal?: boolean }) {
	const { data: categories } = useCategories()
	const { cartCount } = useCart()
	const [isCartOpen, setIsCartOpen] = useState(false)
	const { user } = useUser()
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	async function handleLogout() {
		queryClient.clear()
		await fetchFn('/logout', 'DELETE')
		navigate('/login')
	}

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
					{!minimal && (
						<>
							<FloatingCounter count={cartCount}>
								<IconButton onClick={() => setIsCartOpen(true)}>
									<BagIcon size={24} className="mb-0.5" />
								</IconButton>
							</FloatingCounter>

							<IconButton>
								<LoveIcon size={24} />
							</IconButton>
						</>
					)}

					{user ? (
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Avatar className="bg-blue-200">
									{/* <AvatarImage src="https://github.com/shadcn.png" /> */}
									<AvatarFallback>{user?.name?.slice(0, 1)}</AvatarFallback>
								</Avatar>
							</DropdownMenuTrigger>

							<DropdownMenuContent>
								<DropdownMenuItem>Profile</DropdownMenuItem>
								<DropdownMenuItem>Orders</DropdownMenuItem>
								<DropdownMenuItem>Wishlist</DropdownMenuItem>
								<DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Link to="/login">
							<Button>Login</Button>
						</Link>
					)}
				</div>
			</div>

			<CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
		</header>
	)
}
