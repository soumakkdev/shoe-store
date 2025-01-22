import z from 'zod'

export const ZLoginReqBody = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export const ZSignupReqBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
})

export const ZVerifyEmailReqBody = z.object({
    token: z.string(),
})
