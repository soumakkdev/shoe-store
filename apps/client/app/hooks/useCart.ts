import { atom, useAtom } from 'jotai'
import { ICartItem, IProductVariant, IProduct } from '../types/products.types'
import { useMemo } from 'react'
import { toInt } from 'radash'

const cartItemsAtom = atom<ICartItem[]>([])

export function useCart() {
	const [cartItems, setCartItems] = useAtom(cartItemsAtom)
	const deliveryCharge = 40

	function addItemToCart(product: IProduct, variant: IProductVariant) {
		setCartItems((items) => {
			if (!items?.find((item) => item.variant.id === variant.id)) {
				return items?.concat([
					{
						product,
						variant,
						quantity: 1,
					},
				])
			}
			return items
		})
	}

	function removeItemFromCart(variantId: number) {
		setCartItems((items) => {
			return items?.filter((item) => item.variant.id !== variantId)
		})
	}

	const subTotal = useMemo(() => {
		return cartItems?.reduce((total, item) => {
			total += toInt(item?.variant.price)
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
