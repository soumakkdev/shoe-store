import { z } from 'zod'

const ZProductImage = z.object({
	publicId: z.string(),
	url: z.string(),
})

const ZProductVariant = z.object({
	color: z.string(),
	price: z.number(),
	images: z.array(ZProductImage),
})

export const ZCreateProductBody = z.object({
	name: z.string(),
	description: z.string().optional(),
	brandId: z.number(),
	categoryId: z.number(),
	variants: z.array(ZProductVariant),
})
export type ICreateProductBody = z.infer<typeof ZCreateProductBody>
