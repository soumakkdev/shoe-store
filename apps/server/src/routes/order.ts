import prisma from '@/lib/prisma.ts'
import { verifySession } from '@/middleware/auth.middleware.ts'
import type { IVariables } from '@/types/auth.types.ts'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { toInt } from 'radash'
import Stripe from 'stripe'

const app = new Hono<{ Variables: IVariables }>()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.post('/create-payment-intent', verifySession, async (c) => {
	try {
		const body = await c.req.json()
		const paymentIntent = await stripe.paymentIntents.create({
			currency: body?.currency,
			amount: body?.amount,
			automatic_payment_methods: {
				enabled: true,
			},
			metadata: {
				orderId: body?.orderId,
				// email: body?.email,
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
		name: string
		address: string
		locality?: string
		city: string
		state: string
		zipcode: string
		country: string
		phoneNo: string
	}
}

app.post('/place-order', verifySession, async (c) => {
	try {
		const { items, address } = (await c.req.json()) as IPlaceOrderBody
		const userId = c.get('userId')

		console.log(userId, items, address)

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

		const order = await prisma.order.create({
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
				paymentStatus: 'Pending',
			},
		})

		return c.json({ success: true, orderId: order?.id })
	} catch (error) {
		console.log(error)
		throw new HTTPException(400, {
			message: 'Internal server error',
		})
	}
})

app.get('/:orderId', verifySession, async (c) => {
	try {
		const params = await c.req.param()
		const orderId = params.orderId

		const order = await prisma.order.findUnique({
			where: {
				id: toInt(orderId),
			},
		})

		return c.json({ data: order })
	} catch (error) {
		throw new HTTPException(400, {
			message: 'Internal server error',
		})
	}
})

app.post('/webhook', async (c) => {
	const signature = c.req.header('stripe-signature')
	try {
		if (!signature) {
			return c.text('', 400)
		}
		const body = await c.req.text()
		const event = await stripe.webhooks.constructEventAsync(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
		const paymentIntent = event.data.object as Stripe.PaymentIntent
		const orderId = paymentIntent.metadata?.orderId
		const paymentIntentId = paymentIntent?.id

		switch (event.type) {
			case 'payment_intent.succeeded': {
				await prisma.order.update({
					where: {
						id: toInt(orderId),
					},
					data: {
						paymentIntentId,
						paymentStatus: 'Succeeded',
						status: 'Paid',
					},
				})
				break
			}
			case 'payment_intent.payment_failed': {
				await prisma.order.update({
					where: {
						id: toInt(orderId),
					},
					data: {
						paymentIntentId,
						paymentStatus: 'Failed',
						status: 'Failed',
					},
				})
				break
			}
			default:
				break
		}
		return c.text('', 200)
	} catch (err) {
		const errorMessage = `⚠️  Webhook signature verification failed. ${
			err instanceof Error ? err.message : 'Internal server error'
		}`
		console.log(errorMessage)
		return c.text(errorMessage, 400)
	}
})

export default app
