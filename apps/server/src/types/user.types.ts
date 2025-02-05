import { z } from 'zod'

export const ZCreateAddressBody = z.object({
	address: z.string(),
	locality: z.string().optional(),
	city: z.string(),
	state: z.string(),
	zipcode: z.string(),
	country: z.string(),
	phoneNo: z.string(),
})

export type ICreateAddressBody = z.infer<typeof ZCreateAddressBody>
