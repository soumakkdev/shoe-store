import { createCategory, deleteCategory, getCategories } from '@/controllers/category.controller.ts'
import { authorize } from '@/middleware/auth.middleware.ts'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', getCategories)
app.post('/', authorize, createCategory)
app.delete('/:id', authorize, deleteCategory)

export default app
