import { type RouteConfig, index, prefix, route } from '@react-router/dev/routes'

export default [
	index('routes/home.tsx'),
	route('/login', 'routes/auth/login.tsx'),
	route('/signup', 'routes/auth/signup.tsx'),
	...prefix('products', [
		index('routes/products/products-list.tsx'),
		route(':productId', 'routes/products/product-details.tsx'),
	]),
	route('/checkout', 'routes/checkout.tsx'),
] satisfies RouteConfig
