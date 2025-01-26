import Header from '@/components/Header'
import { Button } from '@/components/ui/Button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import LoveIcon from '@/icons/LoveIcon'
import { useProduct } from '@/lib/hooks/queries'
import { formatCurrency } from '@/lib/utils'
import { useParams } from '@remix-run/react'

export default function ProductPage() {
	const params = useParams()
	const productId = params?.productId

	const { data: product, isLoading: isProductLoading } = useProduct(productId)

	return (
		<div>
			<Header />

			{isProductLoading ? (
				<p>Loading...</p>
			) : (
				<div className="max-w-5xl mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-16 py-10">
						<Carousel>
							<CarouselContent>
								{product?.images?.map((image) => (
									<CarouselItem key={image.id}>
										<img src={image.url} alt="product" />
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious />
							<CarouselNext />
						</Carousel>

						<div className="md:pl-10">
							<h2 className="text-2xl font-semibold">{product?.name}</h2>
							{/* <p>{product?.sku}</p> */}

							{product?.price ? <h4 className="text-3xl font-semibold py-4">{formatCurrency(product.price)}</h4> : null}

							<p>{product?.description}</p>

							<div className="flex gap-2 mt-8">
								<Button className="w-full" size="lg">
									Add to cart
								</Button>

								<Button variant="ghost" size="lg" className="px-4">
									<LoveIcon />
								</Button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
