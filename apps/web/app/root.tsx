import type { LinksFunction } from '@remix-run/node'
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react'

import QueryProvider from './context/QueryProvider'
import './tailwind.css'
import { Toaster } from './components/ui/Toaster'

export const links: LinksFunction = () => [
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
		crossOrigin: 'anonymous',
	},
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
	},
]

export async function loader() {
	return {
		env: {
			SERVER_URL: process.env.SERVER_URL,
		},
	}
}

export function Layout({ children }: { children: React.ReactNode }) {
	const data = useLoaderData<typeof loader>()

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<QueryProvider>{children}</QueryProvider>
				<ScrollRestoration />
				{/* <script
					dangerouslySetInnerHTML={{
						__html: `window.ENV = ${JSON.stringify(data.env)}`,
					}}
				/> */}
				<Toaster />
				<Scripts />
			</body>
		</html>
	)
}

export default function App() {
	return <Outlet />
}
