import prisma from '@/lib/prisma.ts'
import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { toInt } from 'radash'

export async function getCategories(c: Context) {
	try {
		const data = await prisma.category.findMany({})
		return c.json(data)
	} catch (error) {
		throw new HTTPException(400, {
			message: 'Internal server error. Please try again',
		})
	}
}

export async function createCategory(c: Context) {
	try {
		const body = await c.req.json()
		const data = await prisma.category.create({
			data: {
				name: body.name,
			},
		})
		return c.json(data)
	} catch (error) {
		throw new HTTPException(400, {
			message: 'Internal server error. Please try again',
		})
	}
}

export async function deleteCategory(c: Context) {
	try {
		const params = await c.req.param()
		const data = await prisma.category.delete({
			where: {
				id: toInt(params.id),
			},
		})
		return c.json(data)
	} catch (error) {
		throw new HTTPException(400, {
			message: 'Internal server error. Please try again',
		})
	}
}
