import { useId } from 'react'
import {
	defaultCountries,
	FlagImage,
	parseCountry,
	usePhoneInput,
	type PhoneInputProps,
} from 'react-international-phone'
import 'react-international-phone/style.css'
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select'

interface PhoneFieldProps extends PhoneInputProps {
	label?: string
	error?: string
}

export default function PhoneField({ label, value, onChange, ...rest }: PhoneFieldProps) {
	const id = useId()

	const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({
		defaultCountry: 'in',
		value,
		countries: defaultCountries,
		onChange: (data) => {
			onChange?.(data.phone, {
				country: data.country,
				inputValue: data.inputValue,
			})
		},
	})

	return (
		<div className="space-y-2" dir="ltr">
			{label ? <Label htmlFor={id}>{label}</Label> : null}

			<div className="relative flex">
				<Select value={country?.iso2} onValueChange={(country) => setCountry(country)}>
					<SelectTrigger className="w-auto shadow-none h-auto mb-0 rounded-tr-none rounded-br-none gap-1">
						<SelectValue>
							<FlagImage iso2={country?.iso2} />
						</SelectValue>
					</SelectTrigger>
					<SelectContent>
						{defaultCountries?.map((c) => {
							const country = parseCountry(c)
							return (
								<SelectItem value={country.iso2} key={country.iso2}>
									<div className="flex gap-2 items-center">
										<FlagImage iso2={country.iso2} className="mr-2" />
										<span>{country.name}</span>
										<span>(+{country.dialCode})</span>
									</div>
								</SelectItem>
							)
						})}
					</SelectContent>
				</Select>
				<Input
					id={id}
					value={inputValue}
					ref={inputRef}
					onChange={handlePhoneValueChange}
					type="tel"
					className="border-l-0 rounded-tl-none rounded-bl-none"
					{...rest}
				/>
			</div>
		</div>
	)
}
