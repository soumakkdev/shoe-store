import { CheckboxField } from '../fields/CheckboxField'
import InputField from '../fields/InputField'
import { Button } from '../ui/Button'

export default function AddressForm() {
	return (
		<div className="space-y-5">
			<div className="grid grid-cols-2 gap-4">
				<InputField placeholder="First name" />
				<InputField placeholder="Last name" />
			</div>

			<InputField placeholder="Address" />
			<InputField placeholder="Apartment, suite etc (Optional)" />
			<InputField placeholder="Country" />
			<InputField placeholder="City" />
			<div className="grid grid-cols-2 gap-4">
				<InputField placeholder="State/Province/Region" />
				<InputField placeholder="ZIP/Postal Code" />
			</div>
			<InputField placeholder="Phone No" />

			{/* <div>
				<CheckboxField label="Save address for future orders" id="save-address" />
			</div> */}

			<Button className="w-full rounded-full mt-5" size="lg">
				Continue
			</Button>
		</div>
	)
}
