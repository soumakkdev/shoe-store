import InputField from '@/components/fields/InputField'
import PasswordField from '@/components/fields/PasswordField'
import { Button } from '@/components/ui/Button'
import { auth } from '@/lib/firebase'
import { getUrl } from '@/lib/utils'
import { Link, useNavigate } from '@remix-run/react'
import { useForm } from '@tanstack/react-form'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Mail, User2 } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'

export default function Signup() {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm({
		defaultValues: {
			name: '',
			email: '',
			password: '',
			cPassword: '',
		},
		onSubmit: async ({ value }) => {
			setIsLoading(true)
			try {
				const userCredential = await createUserWithEmailAndPassword(auth, value.email, value.password)
				// const token = await getIdToken(userCredential?.user)

				await fetch(getUrl('/signup'), {
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: value?.email,
						name: value?.name,
						uid: userCredential?.user?.uid,
					}),
				})

				navigate('/login')
			} catch (error: any) {
				toast.error(error?.message)
			} finally {
				setIsLoading(false)
			}
		},
	})

	function handleSubmit(e: FormEvent) {
		e.preventDefault()
		e.stopPropagation()
		form.handleSubmit()
	}

	return (
		<div className="h-screen flex flex-col items-center justify-center bg-background">
			<div>
				<div className="mb-12">
					<h1 className="text-4xl font-semibold text-center">Create an Account</h1>
					<p className="max-w-md mx-auto text-sm text-muted-foreground mt-4 text-center">
						Welcome! Sign up to create your account and start your journey with us
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6 max-w-[440px] mx-auto">
					<form.Field
						name="name"
						validators={{
							onSubmit: ({ value }) => (!value ? 'Name is a required field' : undefined),
						}}
					>
						{(field) => (
							<InputField
								id={field.name}
								label="Name"
								placeholder="Enter your name"
								startIcon={<User2 size={16} />}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								error={field.state.meta.errors.join(', ')}
							/>
						)}
					</form.Field>

					<form.Field
						name="email"
						validators={{
							onSubmit: ({ value }) => (!value ? 'Email is a required field' : undefined),
						}}
					>
						{(field) => (
							<InputField
								id={field.name}
								label="Email address"
								placeholder="Enter your email address"
								startIcon={<Mail size={16} />}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								error={field.state.meta.errors.join(', ')}
							/>
						)}
					</form.Field>

					<form.Field
						name="password"
						validators={{
							onSubmit: ({ value }) => (!value ? 'Password is a required field' : undefined),
						}}
					>
						{(field) => (
							<PasswordField
								label="Password"
								placeholder="Enter the password"
								showLockIcon
								showStrength
								id={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								error={field.state.meta.errors.join(', ')}
							/>
						)}
					</form.Field>

					<form.Field
						name="cPassword"
						validators={{
							onChange: ({ value, fieldApi }) => {
								if (fieldApi.form.state.values.password !== value) return "Password doesn't match"
							},
						}}
					>
						{(field) => (
							<PasswordField
								label="Confirm Password"
								placeholder="Enter the password again"
								showLockIcon
								id={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								error={field.state.meta.errors.join(', ')}
							/>
						)}
					</form.Field>

					<Button loading={isLoading} size="lg" className="w-full">
						Create account
					</Button>
				</form>

				<p className="text-sm text-center mt-8">
					Already have an account?{' '}
					<Link to="/login" className="text-primary underline">
						Login
					</Link>
				</p>
			</div>
		</div>
	)
}
