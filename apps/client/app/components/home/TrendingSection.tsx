import React from 'react'
import ProductCard from './ProductCard'

export default function TrendingSection() {
	return (
		<div className="max-w-5xl mx-auto px-4">
			<div className="py-16">
				<h1 className="mb-10 text-2xl font-semibold">Trending Products</h1>

				<div className="grid grid-cols-3 gap-8">
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
				</div>
			</div>
		</div>
	)
}
