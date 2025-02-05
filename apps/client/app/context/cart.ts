import { atom, useAtom } from 'jotai'
import { IProduct } from '../types/products.types'
import { useMemo } from 'react'

const cartItemsAtom = atom<IProduct[]>([])

export function useCart() {
	const [cartItems, setCartItems] = useAtom(cartItemsAtom)
	const deliveryCharge = 40

	function addItemToCart(product: IProduct) {
		setCartItems((items) => {
			if (!items?.find((item) => item.id === product.id)) {
				return items?.concat([product])
			}
			return items
		})
	}

	function removeItemFromCart(productId: number) {
		setCartItems((items) => {
			return items?.filter((item) => item.id !== productId)
		})
	}

	const subTotal = useMemo(() => {
		return cartItems?.reduce((total, item) => {
			total += item?.price
			return total
		}, 0)
	}, [cartItems])

	const cartTotal = useMemo(() => {
		return subTotal + deliveryCharge
	}, [subTotal])

	return {
		addItemToCart,
		removeItemFromCart,
		cartItems,
		cartCount: cartItems?.length ?? 0,
		subTotal,
		cartTotal,
		deliveryCharge,
	}
}
