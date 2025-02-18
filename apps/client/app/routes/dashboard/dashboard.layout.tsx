import React from 'react'
import { Link, Outlet, redirect } from 'react-router'
import type { Route } from './+types/dashboard.layout'
import { getUrl } from '~/lib/utils'
import { Role } from '~/types/common.types'
import { Avatar, AvatarImage } from '~/components/ui/Avatar'

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
			<div className=" border-b border-border">
				<header className="max-w-7xl mx-auto py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-12">
							<Link to="/dashboard">
								<h2 className="text-xl font-semibold">
									Shoe.<span className="text-gray-400">Admin</span>
								</h2>
							</Link>

							<ul className="flex items-center gap-8 text-sm font-medium">
								<Link to="/dashboard">
									<li>Dashboard</li>
								</Link>
								<Link to="/dashboard/products">
									<li>Products</li>
								</Link>
								<Link to="/dashboard/products">
									<li>Orders</li>
								</Link>
								<Link to="/dashboard/products">
									<li>Customers</li>
								</Link>
							</ul>
						</div>

						<div>
							<Avatar className="bg-blue-200">
								<AvatarImage src="https://github.com/shadcn.png" />
							</Avatar>
						</div>
					</div>
				</header>
			</div>
			<Outlet />
		</div>
	)
}
