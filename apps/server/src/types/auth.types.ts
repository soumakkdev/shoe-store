import z from 'zod'

export const ZSignupReqBody = z.object({
	name: z.string(),
	email: z.string().email(),
	uid: z.string(),
})
export type ISignupReqBody = z.infer<typeof ZSignupReqBody>

export type IVariables = {
	userId: string
}
