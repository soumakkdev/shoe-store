import React from 'react'

export default function ProductCard() {
	return (
		<div>
			<img
				src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/5d4ed0e0-7df0-4a31-8a40-aacf8462c39e/NIKE+C1TY.png"
				alt="shoe"
			/>

			<div className="mt-3">
				<div className="flex items-center justify-between">
					<p className="font-medium">Nike Air Low</p>
					<p className="font-semibold">₹8,000</p>
				</div>
				<p className="text-sm text-gray-500">Shoes</p>
			</div>
		</div>
	)
}
