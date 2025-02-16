import type { IProduct, IProductVariant } from './products.types'

export interface ICartItem {
	quantity: number
	variant: IProductVariant
	product: IProduct
}

export interface ICartAddress {
	name: string
	phoneNo: string
	address: string
	locality?: string
	city: string
	state?: string
	zipcode: string
	country: string
}
