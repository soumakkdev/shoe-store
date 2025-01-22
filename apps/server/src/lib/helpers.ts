import { customAlphabet } from 'nanoid'

export function generateNanoid(length = 20) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const nanoid = customAlphabet(alphabet, length)
    return nanoid()
}
