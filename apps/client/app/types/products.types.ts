export interface ICategory {
	id: number
	name: string
}

export interface IProduct {
	id: number
	createdAt: string
	updatedAt: string
	name: string
	description: string
	categoryId: number
	brandId: number
	category: ICategory
	brand: IBrand
	variants: IIProductVariant[]
}

export interface IBrand {
	id: number
	name: string
}

export interface IIProductVariant {
	id: number
	color: string
	price: number
	sku: string
	productId: number
	images: IProductImage[]
}

export interface IProductImage {
	id: number
	publicId: string
	url: string
	variantId: number
}
