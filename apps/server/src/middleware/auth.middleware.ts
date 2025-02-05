import { auth } from '@/lib/firebase.ts'
import prisma from '@/lib/prisma.ts'
import type { Context, Next } from 'hono'
import { getCookie } from 'hono/cookie'
import { createMiddleware } from 'hono/factory'
import { HTTPException } from 'hono/http-exception'

export const verifySession = createMiddleware(async (c: Context, next: Next) => {
	const sessionCookie = getCookie(c, 'session') || ''

	try {
		const decodedToken = await auth.verifySessionCookie(sessionCookie, true)
		const user = await prisma.user.findUnique({
			where: {
				uid: decodedToken?.uid,
				email: decodedToken?.email,
			},
		})
		c.set('userId', user.id)
		await next()
	} catch (error) {
		throw new HTTPException(401, {
			message: 'Unauthorized',
		})
	}
})
