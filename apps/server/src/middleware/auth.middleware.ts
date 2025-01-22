import type { Context, Next } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { verifyToken } from '../lib/jwt.ts'

export async function authorize(c: Context, next: Next) {
    const authHeader = c.req.header('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new HTTPException(401, { message: 'Unauthorized' })
    }

    try {
        const accessToken = authHeader.split('Bearer ')[1]
        const decoded = await verifyToken(accessToken)

        c.set('userId', decoded.userId)
        return next()
    } catch (error) {
        throw new HTTPException(401, { message: 'Unauthorized' })
    }
}
