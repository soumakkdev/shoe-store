import React from 'react'
import { Outlet, redirect } from 'react-router'
import type { Route } from './+types/dashboard.layout'
import { getUrl } from '~/lib/utils'
import { Role } from '~/types/common.types'

export async function loader({ request }: Route.LoaderArgs) {
	const cookie = request.headers.get('cookie') || ''

	const response = await fetch(getUrl('/verify-session'), {
		method: 'GET',
		credentials: 'include',
		headers: {
			Cookie: cookie,
		},
	})

	const redirectUrl = '/login'
	const data = await response.json()

	if (!response.ok || data?.metadata?.role !== Role.Admin) {
		throw redirect(redirectUrl)
	}

	return data?.metadata
}

export default function DashboardLayout({ loaderData }: Route.ComponentProps) {
	return (
		<div>
			Sidebar
			<Outlet />
		</div>
	)
}
