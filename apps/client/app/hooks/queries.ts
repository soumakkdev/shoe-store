import { fetchCategories, fetchProductDetails, fetchProducts } from '@/services/products'
import { useQuery } from '@tanstack/react-query'

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
