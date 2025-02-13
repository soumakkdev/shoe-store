import React from 'react'
import type { Route } from './+types/user.layout'
import { getUrl } from '~/lib/utils'
import { Outlet, redirect } from 'react-router'

export async function loader({ request }: Route.LoaderArgs) {
	const cookie = request.headers.get('cookie') || ''

	const response = await fetch(getUrl('/verify-session'), {
		method: 'GET',
		credentials: 'include',
		headers: {
			Cookie: cookie,
		},
	})

	const url = new URL(request.url)
	let redirectUrl = '/login'
	if (url?.pathname) {
		redirectUrl += `?redirect=${url.pathname}`
	}

	if (!response.ok) {
		throw redirect(redirectUrl) // Redirect to login if unauthorized
	}

	const data = await response.json()
	return data?.metadata
}

export default function UserLayout() {
	return <Outlet />
}
