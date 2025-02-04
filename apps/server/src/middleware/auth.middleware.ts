import { auth } from '@/lib/firebase.ts'
import type { Context, Next } from 'hono'
import { getCookie } from 'hono/cookie'
import { HTTPException } from 'hono/http-exception'

export const verifySession = async (c: Context, next: Next) => {
	const sessionCookie = getCookie(c, 'session') || ''

	try {
		const user = await auth.verifySessionCookie(sessionCookie, true)
		c.set('user', user)
		await next()
	} catch (error) {
		throw new HTTPException(401, {
			message: 'Unauthorized',
		})
	}
}
