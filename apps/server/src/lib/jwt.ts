import { sign, verify } from 'hono/jwt'

export async function generateToken(data: object, exp: number = 60) {
    const payload = {
        ...data,
        exp: Math.floor(Date.now() / 1000) * 60 * exp,
    }
    const secretKey = process.env.JWT_SECRET_KEY as string

    return await sign(payload, secretKey)
}

export async function verifyToken(token: string) {
    const secretKey = process.env.JWT_SECRET_KEY as string
    return await verify(token, secretKey)
}
