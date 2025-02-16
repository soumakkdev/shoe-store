import { createProduct, getProduct, getProducts } from '@/controllers/product.controller.ts'
import { verifySession } from '@/middleware/auth.middleware.ts'
import { ZCreateProductBody, ZGetProductsFilters } from '@/types/product.types.ts'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'

const app = new Hono()

app.post('/', zValidator('json', ZGetProductsFilters), getProducts)
app.post('/create', zValidator('json', ZCreateProductBody), createProduct)
app.get('/:productId', getProduct)

export default app
