import React from 'react'
import { Link } from 'react-router'
import { Button } from '~/components/ui/Button'

export default function DashboardProducts() {
	return (
		<div className="max-w-7xl mx-auto py-8">
			<div className="flex align-items justify-between">
				<h1 className="text-3xl font-bold">Products</h1>

				<Link to="add">
					<Button>Add product</Button>
				</Link>
			</div>
		</div>
	)
}
