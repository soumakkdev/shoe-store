export interface ICategory {
	createdAt: string
	id: number
	name: string
	updatedAt: string
}

export interface IProduct {
	id: number
	createdAt: string
	updatedAt: string
	name: string
	description: string
	price: number
	stock: number
	sku: string
	categoryId: number
	images: IProductImage[]
	category: ICategory
}

export interface IProductImage {
	id: number
	createdAt: string
	publicId: string
	url: string
	productId: number
}
