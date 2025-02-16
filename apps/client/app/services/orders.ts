import { toInt } from 'radash'
import { fetchFn } from '~/lib/utils'
import type { IApiRes } from '~/types/common.types'
import type { ICategory, IProduct } from '~/types/products.types'

export async function fetchOrder(orderId: string) {
	const res = await fetchFn<IApiRes<any>>(`/order/${orderId}`, 'GET')
	return res?.data
}
