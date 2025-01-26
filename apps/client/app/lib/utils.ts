import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getUrl(url: string) {
	return `${import.meta.env.VITE_SERVER_URL}${url}`
}

export async function fetchFn(url: string, method: 'POST' | 'GET' | 'PUT' | 'DELETE', body?: object) {
	// const cookies = nookies.get(null)

	const res = await fetch(getUrl(url), {
		method,
		// credentials: 'include',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			// Authorization: `Bearer ${cookies.access_token}`,
		},
	})

	if (!res.ok) {
		const error = await res.json()
		throw new Error(error.error ?? 'An unexpected error occurred')
	}

	return await res.json()
}

export function formatCurrency(amount: number) {
	if (isNaN(amount)) {
		throw new Error('Invalid amount')
	}

	return new Intl.NumberFormat('en-IN', {
		style: 'currency',
		currency: 'INR',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(amount)
}
