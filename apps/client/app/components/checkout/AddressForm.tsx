import { useForm } from '@tanstack/react-form'
import { defaultCountries, FlagImage, parseCountry } from 'react-international-phone'
import { useCart } from '~/hooks/useCart'
import InputField from '../fields/InputField'
import PhoneField from '../fields/PhoneField'
import { Button } from '../ui/Button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select'
import { useEffect } from 'react'

export default function AddressForm({ onSubmit }: { onSubmit: () => void }) {
	const { cartAddress, saveCartAddress } = useCart()
	const form = useForm({
		defaultValues: {
			name: cartAddress?.name ?? '',
			phoneNo: cartAddress?.phoneNo ?? '',
			address: cartAddress?.address ?? '',
			locality: cartAddress?.locality ?? '',
			city: cartAddress?.city ?? '',
			state: cartAddress?.state ?? '',
			zipcode: cartAddress?.zipcode ?? '',
			country: cartAddress?.country ?? '',
		},
		onSubmit: ({ value }) => {
			saveCartAddress(value)
			onSubmit?.()
		},
	})

	useEffect(() => {}, [])

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				e.stopPropagation()
				form.handleSubmit()
			}}
			className="space-y-5 mt-4"
		>
			<form.Field name="name">
				{(field) => (
					<InputField
						placeholder="Full name"
						id={field.name}
						value={field.state.value}
						onBlur={field.handleBlur}
						onChange={(e) => field.handleChange(e.target.value)}
					/>
				)}
			</form.Field>
			<form.Field name="phoneNo">
				{(field) => (
					<PhoneField
						placeholder="Phone no"
						value={field.state.value}
						onBlur={field.handleBlur}
						onChange={(value: string) => field.handleChange(value)}
					/>
				)}
			</form.Field>

			<form.Field name="address">
				{(field) => (
					<InputField
						placeholder="Address"
						id={field.name}
						value={field.state.value}
						onBlur={field.handleBlur}
						onChange={(e) => field.handleChange(e.target.value)}
					/>
				)}
			</form.Field>
			<form.Field name="locality">
				{(field) => (
					<InputField
						placeholder="Apartment, suite etc (Optional)"
						id={field.name}
						value={field.state.value}
						onBlur={field.handleBlur}
						onChange={(e) => field.handleChange(e.target.value)}
					/>
				)}
			</form.Field>

			<div className="grid grid-cols-2 gap-4">
				<form.Field name="country">
					{(field) => (
						<Select value={field.state.value} onValueChange={(value) => field.handleChange(value)}>
							<SelectTrigger>
								<SelectValue placeholder="Country"></SelectValue>
							</SelectTrigger>
							<SelectContent>
								{defaultCountries?.map((c) => {
									const country = parseCountry(c)
									return (
										<SelectItem value={country.iso2} key={country.iso2}>
											<div className="flex gap-2 items-center">
												<FlagImage iso2={country.iso2} />
												<span>{country.name}</span>
											</div>
										</SelectItem>
									)
								})}
							</SelectContent>
						</Select>
					)}
				</form.Field>
				<form.Field name="city">
					{(field) => (
						<InputField
							placeholder="City"
							id={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
					)}
				</form.Field>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<form.Field name="state">
					{(field) => (
						<InputField
							placeholder="State/Province/Region"
							id={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
					)}
				</form.Field>
				<form.Field name="zipcode">
					{(field) => (
						<InputField
							placeholder="ZIP/Postal Code"
							id={field.name}
							type="number"
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
					)}
				</form.Field>
			</div>

			{/* <div>
				<CheckboxField label="Save address for future orders" id="save-address" />
			</div> */}

			<Button className="w-full rounded-full mt-5" size="lg" type="submit">
				Continue
			</Button>
		</form>
	)
}
