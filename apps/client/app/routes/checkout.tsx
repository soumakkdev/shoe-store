import Header from '@/components/layouts/Header'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/hooks/useCart'
import { cn, formatCurrency } from '@/lib/utils'
import { useState } from 'react'

const Stepper = ({ steps, currentStep }: { steps: string[]; currentStep: number }) => {
	return (
		<div className="flex items-center justify-center">
			{steps.map((step, index) => {
				const isCompleted = index < currentStep
				const isActive = index === currentStep

				return (
					<div key={index} className="flex items-center w-full last:w-auto">
						<div className="relative">
							<div
								className={cn(
									'flex items-center justify-center w-4 h-4 rounded-full text-white font-bold transition-all', // Shared styles
									{
										'border-[3px] border-blue-500 bg-white': isActive,
										'bg-blue-500 text-white': isCompleted,
										'border-[3px] border-gray-200 bg-white': !isCompleted && !isActive,
									}
								)}
							></div>

							<div className="absolute top-6 left-1/2 -translate-x-1/2 text-sm font-medium">{step}</div>
						</div>

						{index < steps.length - 1 && (
							<div
								className={cn(
									'flex-grow h-1 transition-all',
									isCompleted ? 'bg-blue-500' : 'bg-gray-200'
								)}
							></div>
						)}
					</div>
				)
			})}
		</div>
	)
}

export default function CheckoutPage() {
	const { cartItems, subTotal, cartTotal, deliveryCharge, cartCount, removeItemFromCart } = useCart()
	const [currentStep, setCurrentStep] = useState(0)
	return (
		<div>
			<Header minimal />

			<div className="max-w-5xl mx-auto px-4 py-10">
				{/* <div className="max-w-xl mx-auto mb-20">
					<Stepper steps={['Cart', 'Delivery', 'Payment']} currentStep={currentStep} />
				</div> */}

				<div className="grid grid-cols-5 gap-12">
					<div className="col-span-3 space-y-5">
						<h1 className="text-xl font-medium mb-5">Shopping Bag</h1>

						{cartItems?.map((item) => (
							<div key={item.variant.id} className="flex gap-5">
								<img src={item?.variant?.images?.[0]?.url} alt="" className="w-32 rounded-xl" />

								<div className="flex-1">
									<div className="flex items-center justify-between">
										<p className="font-semibold text-lg">{item?.product?.name}</p>

										<p>{formatCurrency(item?.variant?.price)}</p>
									</div>
									<p>{item?.product?.category?.name}</p>

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

					{cartCount > 0 ? (
						<div className="col-span-2">
							<h1 className="text-xl font-medium mb-5">Summary</h1>

							<div className="flex items-center justify-between my-3">
								<p>Subtotal</p>
								<p>{formatCurrency(subTotal)}</p>
							</div>
							<div className="flex items-center justify-between my-3">
								<p>Delivery Charge</p>
								<p>{formatCurrency(deliveryCharge)}</p>
							</div>

							<div className="flex items-center justify-between py-4 border-y my-5 font-semibold">
								<p className="">Total</p>
								<p>{formatCurrency(cartTotal)}</p>
							</div>

							<Button className="w-full rounded-full" size="lg">
								Place Order
							</Button>
						</div>
					) : null}
				</div>
			</div>
		</div>
	)
}
