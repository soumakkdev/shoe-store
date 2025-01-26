import { useQuery } from '@tanstack/react-query'
import { fetchFn } from '../utils'
import { ICategory, IProduct } from '../types/products.types'

export function useCategories() {
	return useQuery<ICategory[]>({
		queryKey: ['categories'],
		queryFn: () => fetchFn('/api/categories', 'GET'),
	})
}

export function useProductsByCategory(categoryId: string | null) {
	return useQuery<IProduct[]>({
		queryKey: ['categories', categoryId, 'products'],
		queryFn: () =>
			fetchFn('/api/products', 'POST', {
				categoryId,
			}),
	})
}

export function useProduct(productId?: string) {
	return useQuery<IProduct>({
		queryKey: ['products', productId],
		queryFn: () => fetchFn(`/api/products/${productId}`, 'GET'),
	})
}
