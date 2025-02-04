import { serve } from '@hono/node-server'
import { Hono } from 'hono'

import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

import authRoutes from './routes/auth.ts'
import productRoutes from './routes/products.ts'
import categoryRoutes from './routes/category.ts'
import brandRoutes from './routes/brand.ts'

const app = new Hono()

app.use(logger())
app.use(
	'/api/*',
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
	})
)

app.get('/', (c) => {
	return c.text('Hello Hono!')
})

app.route('/api/', authRoutes)
app.route('/api/products', productRoutes)
app.route('/api/categories', categoryRoutes)
app.route('/api/brands', brandRoutes)

app.onError((err, c) => {
	const status = (err as any)?.status ?? 500
	return c.json(
		{
			success: false,
			error: err.message ?? 'An unexpected error occurred',
			cause: err.cause,
		},
		status
	)
})

const port = 5000
console.log(`Server is running on http://localhost:${port}`)

serve({
	fetch: app.fetch,
	port,
})
