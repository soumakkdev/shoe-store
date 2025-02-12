import { type ReactNode } from 'react'

export default function FloatingCounter({ children, count }: { children: ReactNode; count: number }) {
	return (
		<div className="relative">
			{count > 0 ? (
				<div className="absolute bg-blue-600 text-white h-5 text-xs font-medium grid place-content-center rounded-full px-2 -top-1.5 -right-1.5">
					{count}
				</div>
			) : null}
			{children}
		</div>
	)
}
