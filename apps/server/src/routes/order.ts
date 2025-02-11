import prisma from '@/lib/prisma.ts'
import type { IVariables } from '@/types/auth.types.ts'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { toInt } from 'radash'
import Stripe from 'stripe'

const app = new Hono<{ Variables: IVariables }>()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.post('/create-payment-intent', async (c) => {
	try {
		const paymentIntent = await stripe.paymentIntents.create({
			currency: 'usd',
			amount: 20000,
			automatic_payment_methods: {
				enabled: true,
			},
		})
		return c.json({ clientSecret: paymentIntent.client_secret })
	} catch (error) {
		throw new HTTPException(400, {
			message: 'Internal server error',
		})
	}
})

interface IPlaceOrderBody {
	items: {
		variantId: string
		quantity: number
		size: string
	}[]
	address: {
		address: string
		locality: string
		city: string
		state: string
		zipcode: string
		country: string
		phoneNo: string
	}
}

app.post('/place-order', async (c) => {
	const { items, address } = (await c.req.json()) as IPlaceOrderBody
	const userId = c.get('userId')

	// fetch products
	const variantIds = items?.map((item) => item.variantId)
	const variants = await Promise.all(
		variantIds?.map((variantId) =>
			prisma.productVariant.findUnique({
				where: {
					id: toInt(variantId),
				},
				include: {
					product: true,
				},
			})
		)
	)

	const subTotalAmount = variants?.reduce((total, item) => {
		return (total += item.price)
	}, 0)
	const deliveryCharge = 40
	const totalAmount = subTotalAmount + deliveryCharge

	await prisma.order.create({
		data: {
			status: 'Pending',
			totalAmount,
			orderAddress: {
				create: address,
			},
			user: {
				connect: {
					id: toInt(userId),
				},
			},
			orderItems: {
				createMany: {
					data: items?.map((item) => ({
						quantity: item?.quantity,
						size: item?.size,
						variantId: toInt(item?.variantId),
					})),
				},
			},
			payments: {},
		},
	})

	return c.json({})
})

export default app
