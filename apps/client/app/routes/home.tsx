import Header from '~/components/layouts/Header'
import type { Route } from './+types/home'

export function meta({}: Route.MetaArgs) {
	return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function Home() {
	return (
		<div>
			<Header />

			<img
				src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_1719,c_limit/5089b234-7766-4d9d-84ca-ea6018c4d4bb/nike-just-do-it.png"
				alt="banner"
			/>
		</div>
	)
}
