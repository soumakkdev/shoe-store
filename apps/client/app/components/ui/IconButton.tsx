import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '~/lib/utils'
import { Loader } from 'lucide-react'

const buttonVariants = cva(
	'grid place-content-center gap-2 whitespace-nowrap rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'hover:bg-accent',
				outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
			},
			size: {
				default: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
)

export interface IconButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	loading?: boolean
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
	({ className, variant, size, loading, children, ...props }, ref) => {
		return (
			<button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
				{loading ? <Loader className="h-4 w-4 animate-spin" /> : null}
				{children}
			</button>
		)
	}
)
IconButton.displayName = 'IconButton'

export { IconButton, buttonVariants }
