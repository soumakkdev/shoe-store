import { useForm } from '@tanstack/react-form'
import { atom, useSetAtom } from 'jotai'
import { Button } from '../ui/Button'

export const checkoutAddressAtom = atom({})

export default function ContactForm() {
	const setAddress = useSetAtom(checkoutAddressAtom)
	const form = useForm({
		defaultValues: {
			name: '',
			phoneNo: '',
			address: '',
			locality: '',
			city: '',
			state: '',
			zipcode: '',
			country: '',
		},
		onSubmit: ({ value }) => {
			setAddress(value)
		},
	})
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				e.stopPropagation()
				form.handleSubmit()
			}}
			className="space-y-5 p-1"
		>
			<h2>Soumak Dutta</h2>
			<p>soumakdutta@gmail.com</p>

			<Button className="w-full rounded-full mt-5" size="lg" type="submit">
				Continue
			</Button>
		</form>
	)
}
