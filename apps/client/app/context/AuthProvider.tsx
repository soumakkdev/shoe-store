import { createContext, type ReactNode, useContext, useEffect, useState } from 'react'
import { Loader } from 'lucide-react'
import { getUrl } from '../lib/utils'

interface IAuthContext {
	user: any | null
	loading: boolean
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function fetchProfile() {
			// const cookies = nookies.get(null)
			const res = await fetch(getUrl('/profile'), {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					// Authorization: `Bearer ${cookies.access_token}`,
				},
			})
			// if (res.status === 401) {
			// 	return await refreshAccessToken()
			// }
			const data = await res.json()
			setUser(data?.data)

			setLoading(false)
			// return data
		}

		fetchProfile()
	}, [])

	const contextValue = {
		user,
		loading,
	}

	if (loading) {
		return (
			<div className="min-h-svh grid place-content-center">
				<Loader className="animate-spin" />
			</div>
		)
	}

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
	return useContext(AuthContext)
}
