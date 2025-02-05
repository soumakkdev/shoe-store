import { useCart } from '@/context/cart'
import { Button } from '../ui/Button'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '../ui/Drawer'
import { formatCurrency } from '@/lib/utils'
import { Link } from '@remix-run/react'

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
	const { cartItems, subTotal, cartTotal, deliveryCharge, cartCount, removeItemFromCart } = useCart()

	return (
		<Drawer open={open} onOpenChange={onClose} direction="right">
			<DrawerContent className="w-[500px]">
				<DrawerHeader>
					<DrawerTitle>Shopping Bag ({cartCount})</DrawerTitle>
				</DrawerHeader>

				<div className="p-4 space-y-4 overflow-auto">
					{cartItems?.map((item) => (
						<div key={item.id} className="flex gap-5">
							<img src={item?.images?.[0]?.url} alt="" className="w-24 rounded-xl" />

							<div className="flex-1">
								<div className="flex items-center justify-between">
									<p className="font-semibold text-lg">{item?.name}</p>

									<p className="font-medium">{formatCurrency(item?.price)}</p>
								</div>
								<p className="text-sm">{item?.category?.name}</p>

								<button className="text-sm underline" onClick={() => removeItemFromCart(item.id)}>
									Remove
								</button>
							</div>
						</div>
					))}
				</div>

				<DrawerFooter>
					<div>
						<div className="flex items-center justify-between py-4 border-y my-4 font-semibold">
							<p>Subtotal</p>
							<p>{formatCurrency(subTotal)}</p>
						</div>

						<Link to="/checkout">
							<Button className="w-full rounded-full" size="lg">
								Checkout
							</Button>
						</Link>
					</div>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
