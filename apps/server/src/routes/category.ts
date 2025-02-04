import { createCategory, deleteCategory, getCategories } from '@/controllers/category.controller.ts'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', getCategories)
app.post('/', createCategory)
app.delete('/:id', deleteCategory)

export default app
