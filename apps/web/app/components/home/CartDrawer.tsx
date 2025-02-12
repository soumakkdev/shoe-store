import { useCart } from '@/hooks/useCart'
import { formatCurrency } from '@/lib/utils'
import { Link } from '@remix-run/react'
import { Button } from '../ui/Button'
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '../ui/Drawer'

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
						<div key={item.variant.id} className="flex gap-5">
							<img src={item?.variant?.images?.[0]?.url} alt="" className="w-24 rounded-xl" />

							<div className="flex-1">
								<div className="flex items-center justify-between">
									<p className="font-semibold text-lg">{item?.product.name}</p>

									<p className="font-medium">{formatCurrency(item?.variant.price)}</p>
								</div>
								<p className="text-sm">{item?.product?.category?.name}</p>

								<button
									className="text-sm underline"
									onClick={() => removeItemFromCart(item.variant.id)}
								>
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
