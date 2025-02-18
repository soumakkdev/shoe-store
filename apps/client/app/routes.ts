import { type RouteConfig, index, layout, prefix, route } from '@react-router/dev/routes'

export default [
	index('routes/home.tsx'),
	route('/login', 'routes/auth/login.tsx'),
	route('/signup', 'routes/auth/signup.tsx'),

	// products routes
	...prefix('products', [
		index('routes/products/products-list.tsx'),
		route(':productId', 'routes/products/product-details.tsx'),
	]),

	// user protected routes
	layout('routes/user/user.layout.tsx', [
		route('/checkout', 'routes/user/checkout.tsx'),
		route('/confirm', 'routes/user/confirm.tsx'),
		route('/orders', 'routes/user/orders.tsx'),
	]),

	// admin dashboard routes
	...prefix('dashboard', [
		layout('routes/dashboard/dashboard.layout.tsx', [
			index('routes/dashboard/dashboard.tsx'),
			route('products', 'routes/dashboard/products.tsx'),
			route('products/add', 'routes/dashboard/add-product.tsx'),
		]),
	]),
] satisfies RouteConfig
