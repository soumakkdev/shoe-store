import { getUrl } from '../utils'

export async function login(email: string, password: string) {
	const res = await fetch(getUrl('/login'), {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify({
			email,
			password,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	})

	if (!res.ok) {
		const error = await res.json()
		throw new Error(error.error ?? 'An unexpected error occurred')
	}

	return await res.json()
}

export async function getUser() {
	const res = await fetch(getUrl('/profile'), {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	if (!res.ok) {
		const error = await res.json()
		throw new Error(error.error ?? 'An unexpected error occurred')
	}

	return await res.json()
}
