import prisma from '@/lib/prisma.ts'
import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { toInt } from 'radash'

export async function getProducts(c: Context) {
	try {
		// const queries = await c.req.query()
		const body = await c.req.json()

		const whereQuery = {} as {
			categoryId?: number
		}

		if (body?.categoryId) {
			whereQuery.categoryId = toInt(body.categoryId)
		}

		const data = await prisma.product.findMany({
			include: {
				images: true,
				category: true,
			},
			where: whereQuery,
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
				images: true,
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
		const body = await c.req.json()
		const data = await prisma.product.create({
			data: {
				name: body.name,
				price: body.price,
				stock: body.stock,
				description: body.description,
				categoryId: toInt(body.categoryId),
				sku: body.sku,
				images: {
					createMany: {
						data: body.images,
					},
				},
			},
		})
		return c.json(data)
	} catch (error) {
		console.log(error)
		throw new HTTPException(400, {
			message: 'Internal server error. Please try again',
		})
	}
}
