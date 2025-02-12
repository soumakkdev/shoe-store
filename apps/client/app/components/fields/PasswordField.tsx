import { cn } from '~/lib/utils'
import { Eye, EyeClosed, Lock } from 'lucide-react'
import { forwardRef, useState } from 'react'
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'

interface PasswordFieldProps extends React.ComponentProps<'input'> {
	label?: string
	error?: string
	showLockIcon?: boolean
	showStrength?: boolean
}

const passwordMaxStrength = 5

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
	({ label, className, showLockIcon, showStrength, id, error, ...props }, ref) => {
		const [passwordVisible, setPasswordVisible] = useState(false)

		const password = props.value as string
		const strength = checkStrength(password)

		return (
			<div className="space-y-3">
				<div className="flex items-center justify-between">
					{label ? <Label htmlFor={id}>{label}</Label> : null}

					{showStrength ? (
						<span className="text-xs text-muted-foreground">{getStrengthText(strength)}</span>
					) : null}
				</div>

				<div className="relative">
					<Input
						ref={ref}
						type={passwordVisible ? 'text' : 'password'}
						className={cn(className, { 'ps-12': showLockIcon })}
						id={id}
						{...props}
					/>

					{showLockIcon ? (
						<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-5 text-muted-foreground/80 peer-disabled:opacity-50">
							<Lock size={16} />
						</div>
					) : null}

					<div
						className="cursor-pointer absolute inset-y-0 end-0 flex items-center justify-center pe-5 text-muted-foreground/80 peer-disabled:opacity-50"
						onClick={() => setPasswordVisible((v) => !v)}
					>
						{passwordVisible ? (
							<EyeClosed size={18} strokeWidth={2} aria-hidden="true" />
						) : (
							<Eye size={18} strokeWidth={2} aria-hidden="true" />
						)}
					</div>
				</div>

				{showStrength ? (
					<div className="h-1 w-full bg-zinc-200 rounded-full">
						<div
							className={cn(
								'h-full rounded-full transition-all duration-500',
								getStrengthColor(strength)
							)}
							style={{
								width: `${(strength / passwordMaxStrength) * 100}%`,
							}}
						></div>
					</div>
				) : null}

				{error ? <p className="text-red-600 text-xs">{error}</p> : null}
			</div>
		)
	}
)

export default PasswordField

PasswordField.displayName = 'PasswordField'

function checkStrength(password: string) {
	let score = 0
	if (password) {
		if (/[a-z]/.test(password)) score += 1
		if (/[A-Z]/.test(password)) score += 1
		if (/[0-9]/.test(password)) score += 1
		if (/.{8}/.test(password)) score += 1
		if (/[!@#$%^&*_-]/.test(password)) score += 1
	}
	return score
}

function getStrengthColor(score: number) {
	if (score === 0) return 'bg-zinc-200'
	else if (score === 1) return 'bg-red-500'
	else if (score === 2) return 'bg-orange-500'
	else if (score === 3) return 'bg-amber-500'
	else if (score === 4) return 'bg-yellow-500'
	else if (score === 5) return 'bg-green-500'
}

function getStrengthText(score: number) {
	if (score === 0) return 'Too short'
	else if (score === 1) return 'Weak'
	else if (score === 2) return 'Fair'
	else if (score === 3) return 'Good'
	else if (score === 4) return 'Good'
	else if (score === 5) return 'Strong'
}
