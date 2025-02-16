import { useQuery } from '@tanstack/react-query'
import { fetchFn } from '~/lib/utils'
import { fetchOrder } from '~/services/orders'
import { fetchCategories, fetchProductDetails, fetchProducts } from '~/services/products'
import type { IApiRes } from '~/types/common.types'

export function useCategories() {
	return useQuery({
		queryKey: ['categories'],
		queryFn: fetchCategories,
	})
}

export function useProductsByCategory(categoryId?: string) {
	return useQuery({
		queryKey: ['categories', categoryId, 'products'],
		queryFn: () => fetchProducts({ categoryId }),
	})
}

export function useProduct(productId?: string) {
	return useQuery({
		queryKey: ['products', productId],
		queryFn: () => fetchProductDetails({ productId }),
	})
}

export function useOrder(orderId: string) {
	return useQuery({
		queryKey: ['orders', orderId],
		queryFn: () => fetchOrder(orderId),
		enabled: !!orderId,
	})
}
