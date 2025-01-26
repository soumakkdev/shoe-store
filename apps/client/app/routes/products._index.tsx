import Header from '@/components/Header'
import ProductCard from '@/components/home/ProductCard'
import { useProductsByCategory } from '@/lib/hooks/queries'
import { useSearchParams } from '@remix-run/react'

export default function ProductsPage() {
	const [searchParams] = useSearchParams()
	const categoryId = searchParams.get('categoryId')

	const { data: products } = useProductsByCategory(categoryId)

	return (
		<div>
			<Header />

			<div className="max-w-5xl mx-auto px-4">
				<div className="py-10">
					<h1 className="mb-10 text-2xl font-semibold">{products?.[0]?.category?.name} Collection</h1>

					<div className="grid grid-cols-3 gap-8">{products?.map((product) => <ProductCard key={product.id} product={product} />)}</div>
				</div>
			</div>
		</div>
	)
}
