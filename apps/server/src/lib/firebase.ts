import { cert, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import path from 'path'

const serviceAccountPath = path.resolve('./', 'service-account.json')

const admin = initializeApp({
	credential: cert(serviceAccountPath),
})

const auth = getAuth(admin)

export { admin, auth }
