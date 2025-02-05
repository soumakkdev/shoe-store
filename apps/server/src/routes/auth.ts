import { auth } from '@/lib/firebase.ts'
import prisma from '@/lib/prisma.ts'
import { verifySession } from '@/middleware/auth.middleware.ts'
import { ZSignupReqBody, type ISignupReqBody, type IVariables } from '@/types/auth.types.ts'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'
import { HTTPException } from 'hono/http-exception'

const app = new Hono<{ Variables: IVariables }>()

app.post('/session-login', async (c) => {
	const { token } = await c.req.json()

	// decode the token
	const decodedToken = await auth.verifyIdToken(token)

	const user = await prisma.user.findUnique({
		where: {
			uid: decodedToken?.uid,
			email: decodedToken?.email,
		},
	})

	await auth.setCustomUserClaims(decodedToken?.uid, { demo: user.id })

	const expiresIn = 1000 * 60 * 60 * 24 * 5 // 5 days
	const sessionCookie = await auth.createSessionCookie(token, { expiresIn })
	setCookie(c, 'session', sessionCookie, {
		maxAge: expiresIn / 1000,
		httpOnly: true,
		secure: true,
		path: '/',
	})

	return c.json({ success: true })
})

app.post('/signup', zValidator('json', ZSignupReqBody), async (c) => {
	try {
		const body = (await c.req.json()) as ISignupReqBody

		const user = await prisma.user.findUnique({
			where: {
				email: body.email,
			},
		})

		if (user) {
			throw new HTTPException(400, {
				message: 'User already exists',
			})
		}

		await prisma.user.create({
			data: {
				email: body.email,
				name: body.name,
				uid: body.uid,
				role: 'Customer',
			},
		})

		return c.json({ success: true })
	} catch (error) {
		throw new HTTPException(400, {
			message: 'Signup failed! Try again',
		})
	}
})

app.get('/verify-session', async (c) => {
	const sessionCookie = getCookie(c, 'session') || ''

	try {
		const user = await auth.verifySessionCookie(sessionCookie, true)
		// await auth.setCustomUserClaims(user.uid, { role: 'admin' })
		return c.json({ user })
	} catch (error) {
		throw new HTTPException(401, {
			message: 'Unauthorized',
		})
	}
})

app.post('/logout', (c) => {
	deleteCookie(c, 'session')
	return c.json({ success: true })
})

app.get('/profile', verifySession, (c) => {
	const user = c.get('userId')
	return c.json({ email: user })
})

export default app
