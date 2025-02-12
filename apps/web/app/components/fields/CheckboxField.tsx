import { CheckboxProps } from '@radix-ui/react-checkbox'
import { Checkbox } from '../ui/Checkbox'

export interface CheckboxFieldProps extends CheckboxProps {
	label: string
}

export function CheckboxField(props: CheckboxFieldProps) {
	const { label, id, ...rest } = props
	return (
		<div className="flex items-center space-x-2">
			<Checkbox id={id} {...rest} />
			<label
				htmlFor={id}
				className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				{label}
			</label>
		</div>
	)
}
