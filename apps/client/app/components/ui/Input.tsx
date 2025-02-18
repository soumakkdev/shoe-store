import * as React from 'react'

import { cn } from '~/lib/utils'

interface InputProps extends Omit<React.ComponentProps<'input'>, 'size'> {
	size?: 'sm' | 'md' | 'lg'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, size = 'md', ...props }, ref) => {
	return (
		<input
			type={type}
			className={cn(
				'flex w-full rounded-lg border border-input bg-transparent px-4 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
				{
					'h-12': size === 'lg',
					'h-11': size === 'md',
					'h-9': size === 'sm',
				},
				className
			)}
			ref={ref}
			{...props}
		/>
	)
})
Input.displayName = 'Input'

export { Input }
