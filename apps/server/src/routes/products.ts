import { createProduct, getProduct, getProducts } from '@/controllers/product.controller.ts'
import { verifySession } from '@/middleware/auth.middleware.ts'
import { ZCreateProductBody } from '@/types/product.types.ts'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', getProducts)
app.get('/:productId', getProduct)
app.post('/', verifySession, zValidator('json', ZCreateProductBody), createProduct)

export default app
