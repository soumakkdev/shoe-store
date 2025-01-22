import {
    getProfileController,
    loginController,
    logoutController,
    signupController,
    verifyEmailController
} from '@/controllers/auth.controller.ts'
import { authorize } from '@/middleware/auth.middleware.ts'
import { ZLoginReqBody, ZSignupReqBody, ZVerifyEmailReqBody } from '@/types/auth.types.ts'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'

const app = new Hono()

app.post('/login', zValidator('json', ZLoginReqBody), loginController)
app.post('/signup', zValidator('json', ZSignupReqBody), signupController)
app.post('/verify-email', zValidator('json', ZVerifyEmailReqBody), verifyEmailController)
app.post('/logout', logoutController)
app.get('/profile', authorize, getProfileController)


export default app
 