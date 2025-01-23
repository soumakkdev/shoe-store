import { createProduct, getProducts } from '@/controllers/product.controller.ts'
import { authorize } from '@/middleware/auth.middleware.ts'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', authorize, getProducts)
app.post('/', authorize, createProduct)

export default app
