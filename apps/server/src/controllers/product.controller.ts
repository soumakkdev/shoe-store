import prisma from '@/lib/prisma.ts'
import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'

export async function getProducts(c: Context) {
	try {
		const data = await prisma.product.findMany({})
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
				categoryId: 1,
			},
		})
		return c.json(data)
	} catch (error) {
		throw new HTTPException(400, {
			message: 'Internal server error. Please try again',
		})
	}
}
