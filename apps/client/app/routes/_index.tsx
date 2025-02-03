import { getUrl } from '@/lib/utils'
import { LoaderFunctionArgs, redirect, type MetaFunction } from '@remix-run/node'
import { useLoaderData } from 'react-router'

export const meta: MetaFunction = () => {
	return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }]
}

export async function loader({ request }: LoaderFunctionArgs) {
	const cookie = request.headers.get('cookie') || ''

	const response = await fetch(getUrl('/verify-session'), {
		method: 'GET',
		credentials: 'include',
		headers: {
			Cookie: cookie,
		},
	})

	if (!response.ok) {
		throw redirect('/login') // Redirect to login if unauthorized
	}
	// try {
	// 	const user = await getUser()
	// 	console.log(user)
	// } catch (error) {
	// 	console.log(error)
	// 	// return redirect('/login')
	// }
	const data = await response.json()
	return data?.user
	return null
}

export default function Index() {
	const user = useLoaderData()

	// useEffect(() => {
	// 	fetch(getUrl('/profile'), {
	// 		method: 'GET',
	// 		credentials: 'include',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 	})
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			console.log(data)
	// 		})
	// 		.catch((err) => console.log(err))
	// }, [])

	return (
		<div>
			{/* <Header /> */}

			<img
				src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_1719,c_limit/5089b234-7766-4d9d-84ca-ea6018c4d4bb/nike-just-do-it.png"
				alt="banner"
			/>

			{/* <TrendingSection /> */}
		</div>
	)
}
