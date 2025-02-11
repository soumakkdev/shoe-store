import AddressForm from '@/components/checkout/AddressForm'
import PaymentForm from '@/components/checkout/PaymentForm'
import Header from '@/components/layouts/Header'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion'
import { useCart } from '@/hooks/useCart'
import { formatCurrency } from '@/lib/utils'
import { useState } from 'react'

export default function CheckoutPage() {
	const { cartItems, subTotal, cartTotal, deliveryCharge, cartCount, removeItemFromCart } = useCart()
	const [currentStep, setCurrentStep] = useState('shipping')

	return (
		<div>
			<Header minimal />

			<div className="max-w-5xl mx-auto px-4 py-10">
				<div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
					<div className="col-span-3 space-y-5">
						<Accordion type="single" value={currentStep} onValueChange={(step) => setCurrentStep(step)}>
							<AccordionItem value="shipping" className="border my-4 px-6 py-2 rounded-xl">
								<AccordionTrigger>
									<h1 className="text-lg font-semibold">Shipping</h1>
								</AccordionTrigger>
								<AccordionContent>
									<AddressForm />
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="payment" className="border my-4 px-6 py-2 rounded-xl">
								<AccordionTrigger>
									<h1 className="text-lg font-semibold">Payment</h1>
								</AccordionTrigger>
								<AccordionContent>
									<PaymentForm />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>

					<div className="col-span-2">
						<h1 className="text-lg font-semibold mb-5">Shopping Bag</h1>

						<div className="space-y-4">
							{cartItems?.map((item) => (
								<div key={item.variant.id} className="flex gap-5">
									<img src={item?.variant?.images?.[0]?.url} alt="" className="w-28 rounded-xl" />

									<div className="flex-1">
										<p className="font-semibold text-lg">{item?.product?.name}</p>

										<p>{formatCurrency(item?.variant?.price)}</p>
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

						<h1 className="text-lg font-semibold my-5">Summary</h1>

						<div className="flex items-center justify-between my-3">
							<p>Subtotal</p>
							<p>{formatCurrency(subTotal)}</p>
						</div>
						<div className="flex items-center justify-between my-3">
							<p>Delivery Charge</p>
							<p>{formatCurrency(deliveryCharge)}</p>
						</div>

						<div className="flex items-center justify-between py-4 border-t my-5 font-semibold">
							<p className="">Total</p>
							<p>{formatCurrency(cartTotal)}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
