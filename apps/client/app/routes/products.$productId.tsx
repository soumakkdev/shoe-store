import Header from '@/components/layouts/Header'
import { Button } from '@/components/ui/Button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import LoveIcon from '@/icons/LoveIcon'
import { useCart } from '@/context/cart'
import { useProduct } from '@/hooks/queries'
import { formatCurrency } from '@/lib/utils'
import { Link, useNavigate, useParams, useSearchParams } from '@remix-run/react'
import { toInt } from 'radash'

export default function ProductPage() {
	const params = useParams()
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()

	const variantId = searchParams.get('variantId') as string
	const productId = params?.productId

	const { data: product, isLoading: isProductLoading } = useProduct(productId)
	const { addItemToCart } = useCart()

	const selectedVariantId = variantId ?? product?.variants[0]?.id
	const selectedVariant = product?.variants?.find((v) => v.id === toInt(selectedVariantId))

	return (
		<div>
			<Header />

			{isProductLoading || !product ? (
				<p>Loading...</p>
			) : (
				<div className="max-w-5xl mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-16 py-10">
						<Carousel>
							<CarouselContent>
								{selectedVariant?.images?.map((image) => (
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
							{/* <p>{selectedVariant?.sku}</p> */}

							{selectedVariant?.price ? (
								<h4 className="text-3xl font-semibold py-4">{formatCurrency(selectedVariant.price)}</h4>
							) : null}

							<p>{product?.description}</p>

							<div className="flex items-center gap-2 my-10">
								{product?.variants?.map((variant) => (
									<Link key={variant.id} to={`/products/${product.id}?variantId=${variant.id}`}>
										<img
											src={variant?.images?.[0]?.url}
											alt={variant.color}
											className="h-20 w-20 object-cover"
										/>
									</Link>
								))}
							</div>

							<div className="flex gap-2 mt-8">
								<Button className="w-full" size="lg" onClick={() => addItemToCart(product)}>
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
