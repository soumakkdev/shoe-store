import { useForm } from '@tanstack/react-form'
import { getIdToken, signInWithEmailAndPassword } from 'firebase/auth'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'
import InputField from '~/components/fields/InputField'
import PasswordField from '~/components/fields/PasswordField'
import { Button } from '~/components/ui/Button'
import { Label } from '~/components/ui/Label'
import { auth } from '~/lib/firebase'
import { getUrl } from '~/lib/utils'

export default function LoginPage() {
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

	const form = useForm({
		defaultValues: {
			email: 'soumak@yopmail.com',
			password: 'Password@123',
		},
		onSubmit: async ({ value }) => {
			setIsLoading(true)
			try {
				const userCredential = await signInWithEmailAndPassword(auth, value.email, value.password)
				const token = await getIdToken(userCredential?.user)
				await fetch(getUrl('/session-login'), {
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ token }),
				})
				navigate('/')
			} catch (error) {
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
		<div className="h-screen flex items-center justify-center bg-background">
			<div>
				<div className="mb-12">
					<h1 className="text-4xl font-semibold text-center">Welcome back</h1>
					<p className="max-w-md mx-auto text-sm text-muted-foreground mt-4 text-center">
						Log in to access your account and stay connected
					</p>
				</div>

				<form className="space-y-6 min-w-[440px] mx-auto" onSubmit={handleSubmit}>
					<form.Field name="email">
						{(field) => (
							<InputField
								id={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								label="Email address"
								placeholder="Enter your email address"
								// startIcon={<Mail size={16} />}
							/>
						)}
					</form.Field>

					<div className="space-y-3">
						<div className="flex justify-between items-center">
							<Label htmlFor="password">Password</Label>
							<a href="#" className="text-xs underline text-primary">
								Forgot password?
							</a>
						</div>
						<form.Field name="password">
							{(field) => (
								<PasswordField
									placeholder="Enter the password"
									id={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
							)}
						</form.Field>
					</div>

					<Button size="lg" className="w-full" loading={isLoading}>
						Sign in
					</Button>

					{/* <div className="space-y-4">
					<Button className="w-full" size="lg" variant="outline">
						<GoogleIcon />
						<span>Sign in with Google</span>
					</Button>

					<Button className="w-full" size="lg" variant="outline">
						<GithubIcon />
						<span>Sign in with GitHub</span>
					</Button>
				</div> */}
				</form>

				<p className="text-sm text-center mt-8">
					Don&apos;t have an account?{' '}
					<Link to="/signup" className="text-primary underline">
						Sign up
					</Link>
				</p>
			</div>
		</div>
	)
}
