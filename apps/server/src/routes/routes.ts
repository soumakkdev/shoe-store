import { Hono } from 'hono'

import authRoutes from './auth.ts'
import productRoutes from './products.ts'
import categoryRoutes from './category.ts'
import brandRoutes from './brand.ts'
import addressRoutes from './address.ts'
import orderRoutes from './order.ts'

const app = new Hono()

app.route('/', authRoutes)
app.route('/products', productRoutes)
app.route('/categories', categoryRoutes)
app.route('/brands', brandRoutes)
app.route('/address', addressRoutes)
app.route('/order', orderRoutes)

export default app
