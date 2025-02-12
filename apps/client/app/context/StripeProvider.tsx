import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { type ReactNode } from 'react'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY)

export const StripeProvider = ({ children, clientSecret }: { children: ReactNode; clientSecret: string }) => {
	return (
		<Elements
			stripe={stripePromise}
			options={{
				clientSecret,
			}}
		>
			{children}
		</Elements>
	)
}
