import { createProduct, getProduct, getProducts } from '@/controllers/product.controller.ts'
import { authorize } from '@/middleware/auth.middleware.ts'
import { Hono } from 'hono'

const app = new Hono()

app.post('/', getProducts)
app.get('/:productId', getProduct)
app.post('/', authorize, createProduct)

export default app
