import { useQuery } from '@tanstack/react-query'
import { getUrl } from '~/lib/utils'

export function useUser() {
	const { data, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: async () => {
			const res = await fetch(getUrl('/profile'), { credentials: 'include' })
			if (!res.ok) throw new Error('Not authenticated')
			return res.json()
		},
		retry: 1,
	})
	return {
		user: data?.data,
		isLoading,
	}
}
