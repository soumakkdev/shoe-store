import { fetchFn } from '@/lib/utils'
import { IApiRes } from '@/types/common.types'
import { ICategory, IProduct } from '@/types/products.types'
import { toInt } from 'radash'

export async function fetchCategories() {
	const res = await fetchFn<IApiRes<ICategory[]>>('/categories', 'GET')
	return res?.data
}

export async function fetchProducts(params: { categoryId?: string }) {
	const res = await fetchFn<IApiRes<IProduct[]>>('/products', 'POST', {
		categoryId: toInt(params?.categoryId),
	})
	return res?.data
}

export async function fetchProductDetails(params: { productId?: string }) {
	const res = await fetchFn<IApiRes<IProduct>>(`/products/${params?.productId}`, 'GET')
	return res?.data
}
