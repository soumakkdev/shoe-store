import { auth } from '@/lib/firebase.ts'
import prisma from '@/lib/prisma.ts'
import { verifySession } from '@/middleware/auth.middleware.ts'
import { ZSignupReqBody, type ISignupReqBody, type IVariables } from '@/types/auth.types.ts'
import { zValidator } from '@hono/zod-validator'
import type { Role } from '@prisma/client'
import { Hono } from 'hono'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'
import { HTTPException } from 'hono/http-exception'
import { toInt } from 'radash'

const app = new Hono<{ Variables: IVariables }>()

app.post('/session-login', async (c) => {
	const { token } = await c.req.json()

	const metadata = await auth.verifyIdToken(token)

	const user = await prisma.user.findUnique({
		where: {
			id: toInt(metadata.userId),
		},
	})
	if (!user) {
		throw new HTTPException(401, {
			message: 'Login failed',
		})
	}

	// create session cookie with the token
	const expiresIn = 1000 * 60 * 60 * 24 * 5 // 5 days
	const sessionCookie = await auth.createSessionCookie(token, { expiresIn })
	setCookie(c, 'session', sessionCookie, {
		maxAge: expiresIn / 1000,
		httpOnly: true,
		secure: true,
		path: '/',
	})

	return c.json({ success: true, user })
})

app.post('/signup', zValidator('json', ZSignupReqBody), async (c) => {
	try {
		const body = (await c.req.json()) as ISignupReqBody

		// find the already existing user
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

		// create the new user
		const newUser = await prisma.user.create({
			data: {
				email: body.email,
				name: body.name,
				uid: body.uid,
				role: (body?.role as Role) ?? 'Customer',
			},
		})

		// store role and userId in the token
		await auth.setCustomUserClaims(newUser?.uid, { role: newUser.role, userId: newUser.id })

		return c.json({ success: true })
	} catch (error) {
		console.log(error)
		throw new HTTPException(400, {
			message: 'Signup failed! Try again',
		})
	}
})

app.get('/verify-session', async (c) => {
	const sessionCookie = getCookie(c, 'session') || ''

	try {
		const metadata = await auth.verifySessionCookie(sessionCookie, true)
		return c.json({ metadata })
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

app.get('/profile', verifySession, async (c) => {
	try {
		const userId = c.get('userId')
		const user = await prisma.user.findUnique({
			where: {
				id: toInt(userId),
			},
		})
		if (!user) {
			throw new HTTPException(401, {
				message: 'Unauthorized',
			})
		}
		return c.json({ data: user })
	} catch (error) {
		throw new HTTPException(401, {
			message: 'Unauthorized',
		})
	}
})

export default app
