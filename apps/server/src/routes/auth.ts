import { auth } from '@/lib/firebase.ts'
import { Hono, type Context, type Next } from 'hono'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'
import { HTTPException } from 'hono/http-exception'

const app = new Hono()

// app.post('/login', zValidator('json', ZLoginReqBody), loginController)
// app.post('/signup', zValidator('json', ZSignupReqBody), signupController)
// app.post('/verify-email', zValidator('json', ZVerifyEmailReqBody), verifyEmailController)
// app.post('/logout', logoutController)
// app.get('/profile', authorize, getProfileController)

app.post('/session-login', async (c) => {
	const { token } = await c.req.json()

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

app.get('/verify-session', async (c) => {
	const sessionCookie = getCookie(c, 'session') || ''

	try {
		const user = await auth.verifySessionCookie(sessionCookie, true)
		await auth.setCustomUserClaims(user.uid, { role: 'admin' })
		return c.json({ user })
	} catch (error) {
		throw new HTTPException(401, {
			message: 'Unauthorized',
		})
	}
})

const verifySession = async (c: Context, next: Next) => {
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

app.post('/logout', (c) => {
	deleteCookie(c, 'session')
	return c.json({ success: true })
})

app.get('/profile', verifySession, (c) => {
	const user = c.get('user')
	return c.json({ email: user.email })
})

export default app
