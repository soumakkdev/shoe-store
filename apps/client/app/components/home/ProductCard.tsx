import { IProduct } from '@/lib/types/products.types'
import { formatCurrency } from '@/lib/utils'
import { Link } from '@remix-run/react'

export default function ProductCard({ product }: { product: IProduct }) {
	return (
		<div>
			<Link to={`/products/${product.id}`}>
				<img src={product?.images?.[0]?.url} alt="shoe" />

				<div className="mt-3">
					<div className="flex items-center justify-between">
						<p className="font-medium">{product?.name}</p>
						<p className="font-semibold">{formatCurrency(product.price)}</p>
					</div>
					<p className="text-sm text-gray-500">{product?.category?.name}</p>
				</div>
			</Link>
		</div>
	)
}
