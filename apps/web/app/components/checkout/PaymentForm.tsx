import { getUrl } from '@/lib/utils'
import { Elements, ExpressCheckoutElement, PaymentElement } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/Button'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY)

export default function PaymentForm() {
	const [clientSecret, setClientSecret] = useState(null)

	useEffect(() => {
		fetch(getUrl('/order/create-payment-intent'), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setClientSecret(data?.clientSecret)
			})
			.catch((err) => {
				setClientSecret(null)
			})
	}, [])

	if (!clientSecret) return null

	return (
		<>
			<Elements
				stripe={stripePromise}
				options={{
					clientSecret,
				}}
			>
				<form className="space-y-5">
					<PaymentElement options={{}} />

					<Button className="w-full" size="lg">
						Pay now
					</Button>
				</form>
			</Elements>
		</>
	)
}
