import prisma from '@/lib/prisma.ts'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { toInt } from 'radash'

const app = new Hono()

app.get('/', async (c) => {
	try {
		const data = await prisma.brand.findMany({})
		return c.json(data)
	} catch (error) {
		throw new HTTPException(400, {
			message: 'Internal server error. Please try again',
		})
	}
})
app.post('/', async (c) => {
	try {
		const body = await c.req.json()
		const data = await prisma.brand.create({
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
})
app.delete('/:id', async (c) => {
	try {
		const params = await c.req.param()
		const data = await prisma.brand.delete({
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
})

export default app
