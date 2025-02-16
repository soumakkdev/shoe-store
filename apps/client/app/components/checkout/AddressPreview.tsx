import { useCart } from '~/hooks/useCart'

export default function AddressPreview() {
	const { cartAddress } = useCart()

	return (
		<div>
			<p>{cartAddress?.name}</p>
			<p>{cartAddress?.phoneNo}</p>

			<p>
				<span>{cartAddress?.address}</span>
				<span>{cartAddress?.locality ?? ''}</span>
			</p>
			<p>
				<span>{cartAddress?.city}</span>
				<span>{cartAddress?.zipcode}</span>
			</p>
			<p>
				<span>{cartAddress?.state}</span>
				<span>{cartAddress?.country}</span>
			</p>
		</div>
	)
}
