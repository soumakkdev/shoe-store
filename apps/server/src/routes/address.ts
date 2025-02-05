import prisma from '@/lib/prisma.ts'
import { verifySession } from '@/middleware/auth.middleware.ts'
import type { IVariables } from '@/types/auth.types.ts'
import { ZCreateAddressBody, type ICreateAddressBody } from '@/types/user.types.ts'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { toInt } from 'radash'

const app = new Hono<{ Variables: IVariables }>()

app.get('/', verifySession, async (c) => {
	try {
		const data = await prisma.address.findMany({})
		return c.json({ data })
	} catch (error) {
		throw new HTTPException(400, {
			message: 'Internal server error. Please try again',
		})
	}
})
app.post('/', verifySession, zValidator('json', ZCreateAddressBody), async (c) => {
	try {
		const userId = c.get('userId')
		const body = (await c.req.json()) as ICreateAddressBody
		const data = await prisma.address.create({
			data: {
				address: body.address,
				locality: body.locality,
				city: body.city,
				state: body.state,
				zipcode: body.zipcode,
				country: body.country,
				phoneNo: body.phoneNo,
				userId: toInt(userId),
			},
		})
		return c.json({ data })
	} catch (error) {
		throw new HTTPException(400, {
			message: 'Internal server error. Please try again',
		})
	}
})
app.delete('/:id', async (c) => {
	try {
		const params = await c.req.param()
		await prisma.address.delete({
			where: {
				id: toInt(params.id),
			},
		})
		return c.json({ success: true })
	} catch (error) {
		throw new HTTPException(400, {
			message: 'Internal server error. Please try again',
		})
	}
})

export default app
