import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { type FormEvent } from 'react'
import { useCart } from '~/hooks/useCart'
import { fetchFn, getUrl } from '~/lib/utils'
import { Button } from '../ui/Button'

export default function PaymentForm() {
	const { cartItems, cartTotal, cartAddress } = useCart()
	const stripe = useStripe()
	const elements = useElements()

	async function handleSubmit(e: FormEvent) {
		e.preventDefault()

		if (!stripe || !elements) {
			return
		}

		const { error: submitError } = await elements.submit()
		if (submitError) {
			console.log(submitError)
			// TODO: handle error
			return
		}

		const newOrderRes = await fetchFn<{ orderId: string }>('/order/place-order', 'POST', {
			items: cartItems?.map((item) => ({
				variantId: item?.variant?.id,
				quantity: item?.quantity,
				size: '12', // TODO: make it dynamic
			})),
			address: cartAddress,
		})
		const orderId = newOrderRes?.orderId

		//

		const paymentIntentRes = await fetchFn<{ clientSecret: string }>('/order/create-payment-intent', 'POST', {
			currency: 'inr',
			amount: cartTotal,
			orderId,
		})
		const clientSecret = paymentIntentRes?.clientSecret

		if (clientSecret) {
			const result = await stripe.confirmPayment({
				elements,
				clientSecret,
				confirmParams: {
					payment_method_data: {
						billing_details: {
							address: {
								country: 'US',
							},
						},
					},
					return_url: `${window.location.origin}/confirm?orderId=${orderId}`,
				},
			})

			if (result.error) {
				// Show error to your customer (for example, payment details incomplete)
				console.log(result.error.message)
			} else {
				// Your customer will be redirected to your `return_url`. For some payment
				// methods like iDEAL, your customer will be redirected to an intermediate
				// site first to authorize the payment, then redirected to the `return_url`.
			}
		}
	}

	return (
		<form className="space-y-5 p-1" onSubmit={handleSubmit}>
			<PaymentElement
				options={{
					fields: {
						billingDetails: {
							address: {
								country: 'never',
							},
						},
					},
				}}
			/>

			<Button className="w-full" disabled={!stripe} size="lg" type="submit">
				Pay now
			</Button>
		</form>
	)
}
