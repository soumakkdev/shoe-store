import { useSearchParams } from 'react-router'
import Header from '~/components/layouts/Header'
import { useOrder } from '~/hooks/queries'

export default function ConfirmPage() {
	const [searchParams] = useSearchParams()
	const orderId = searchParams.get('orderId')

	const { data } = useOrder(orderId!)

	console.log(data)
	return (
		<div>
			<Header minimal />

			<div className="max-w-5xl mx-auto px-4 py-10">
				<h2>Thank you</h2>
			</div>
		</div>
	)
}
