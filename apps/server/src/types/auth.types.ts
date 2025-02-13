import z from 'zod'

export const ZSignupReqBody = z.object({
	name: z.string(),
	email: z.string().email(),
	uid: z.string(),
	role: z.string().optional(),
})
export type ISignupReqBody = z.infer<typeof ZSignupReqBody>

export type IVariables = {
	userId: string
	role: string
}
