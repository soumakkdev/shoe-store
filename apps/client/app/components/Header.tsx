import BagIcon from '@/icons/BagIcon'
import LoveIcon from '@/icons/LoveIcon'
import { Avatar } from './ui/Avatar'
import { AvatarImage } from '@radix-ui/react-avatar'

export default function Header() {
	return (
		<header className="max-w-5xl mx-auto px-4">
			<div className="flex items-center justify-between h-20">
				<h2 className="text-xl font-semibold">
					Swift <span className="text-gray-400">Shop</span>
				</h2>

				<ul className="flex items-center gap-6 text-sm font-medium">
					<li>Electronics</li>
					<li>Clothing</li>
					<li>Shoes</li>
					<li>Accessories</li>
				</ul>

				<div className="flex items-center gap-5">
					<BagIcon />

					<LoveIcon />

					<Avatar>
						<AvatarImage src="https://github.com/shadcn.png" />
					</Avatar>
				</div>
			</div>
		</header>
	)
}
