import { generateNanoid } from '@/lib/helpers.ts'
import prisma from '@/lib/prisma.ts'
import type { ICreateProductBody } from '@/types/product.types.ts'
import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { toInt } from 'radash'

export async function getProducts(c: Context) {
	try {
		// const queries = await c.req.query()
		// const body = await c.req.json()

		// const whereQuery = {} as {
		// 	categoryId?: number
		// }

		// if (body?.categoryId) {
		// 	whereQuery.categoryId = toInt(body.categoryId)
		// }

		const data = await prisma.product.findMany({
			include: {
				category: true,
				brand: true,
				variants: {
					include: {
						images: true,
					},
				},
			},
			// where: whereQuery,
		})
		return c.json(data)
	} catch (error) {
		console.log(error)
		throw new HTTPException(400, {
			message: 'Internal server error. Please try again',
		})
	}
}

export async function getProduct(c: Context) {
	try {
		const params = await c.req.param()
		const data = await prisma.product.findFirst({
			include: {
				category: true,
			},
			where: {
				id: toInt(params.productId),
			},
		})
		return c.json(data)
	} catch (error) {
		throw new HTTPException(400, {
			message: 'Internal server error. Please try again',
		})
	}
}

export async function createProduct(c: Context) {
	try {
		const body = (await c.req.json()) as ICreateProductBody

		// create the product
		const product = await prisma.product.create({
			data: {
				name: body.name,
				description: body.description,
				categoryId: toInt(body.categoryId),
				brandId: toInt(body.brandId),
			},
		})

		// create multiple variants
		const createdVariants = await Promise.all(
			body.variants?.map(async (variant) => {
				const newVariant = await prisma.productVariant?.create({
					data: {
						color: variant?.color,
						price: variant?.price,
						sku: generateNanoid(12),
						productId: product?.id,
					},
				})

				// create the images
				if (variant.images.length > 0) {
					await prisma.productImages.createMany({
						data: variant.images.map((image) => ({
							publicId: image.publicId,
							url: image.url,
							variantId: newVariant.id,
						})),
					})
				}

				return newVariant
			})
		)

		// connect variant ids to product
		await prisma.product.update({
			where: { id: product.id },
			data: {
				variants: {
					connect: createdVariants?.map((variant) => ({ id: variant.id })),
				},
			},
		})

		const finalProduct = await prisma.product.findUnique({
			where: { id: product.id },
			include: {
				variants: {
					include: { images: true },
				},
			},
		})

		return c.json(finalProduct)
	} catch (error) {
		console.log(error)
		throw new HTTPException(400, {
			message: 'Internal server error. Please try again',
		})
	}
}
