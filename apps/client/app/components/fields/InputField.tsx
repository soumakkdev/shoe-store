import { forwardRef, ReactNode } from 'react'
import { Label } from '../ui/Label'
import { Input } from '../ui/Input'
import { cn } from '../../lib/utils'

interface InputFieldProps extends React.ComponentProps<'input'> {
	label?: string
	startIcon?: ReactNode
	error?: string
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({ label, className, startIcon, id, error, ...props }, ref) => {
	return (
		<div className="space-y-2">
			{label ? <Label htmlFor={id}>{label}</Label> : null}

			<div className="relative">
				<Input ref={ref} className={cn(className, { 'ps-12': startIcon })} id={id} {...props} />

				{startIcon ? (
					<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-5 text-muted-foreground/80 peer-disabled:opacity-50">
						{startIcon}
					</div>
				) : null}
			</div>

			{error ? <p className="text-red-600 text-xs">{error}</p> : null}
		</div>
	)
})

InputField.displayName = 'InputField'

export default InputField
