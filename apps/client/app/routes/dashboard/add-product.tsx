import { useForm } from '@tanstack/react-form'
import React from 'react'
import InputField from '~/components/fields/InputField'
import SelectField from '~/components/fields/SelectField'
import { Button } from '~/components/ui/Button'
import { Label } from '~/components/ui/Label'
import { useCategories } from '~/hooks/queries'

export default function AddProductPage() {
	const { data: categories } = useCategories()

	const categoriesOptions =
		categories?.map((category) => ({
			label: category.name,
			value: category.id.toString(),
		})) ?? []

	const form = useForm({
		defaultValues: {
			variants: [] as Array<{ color: string; price: number }>,
		},
		onSubmit({ value }) {
			alert(JSON.stringify(value))
		},
	})

	return (
		<div className="max-w-7xl mx-auto py-8">
			<div className="flex align-items justify-between">
				<h1 className="text-3xl font-bold">New Product</h1>
			</div>

			<form
				onSubmit={(e) => {
					e.preventDefault()
					e.stopPropagation()
					form.handleSubmit()
				}}
			>
				<div className="max-w-3xl mt-5">
					<div className="grid grid-cols-2 gap-5">
						<InputField label="Product name" />
						<InputField label="Description" />

						<SelectField label="Category" options={categoriesOptions} />
					</div>

					<Label>Variants</Label>
					<form.Field mode="array" name="variants">
						{(field) => (
							<div className="">
								<div className="border border-border p-5 rounded-lg space-y-4">
									{field.state.value.map((_, i) => (
										<div className="grid grid-cols-2 gap-5">
											<form.Field key={i} name={`variants[${i}].color`}>
												{(subField) => (
													<InputField
														value={subField.state.value}
														onChange={(e) => subField.handleChange(e.target.value)}
														label="Color"
													/>
												)}
											</form.Field>

											<form.Field key={i} name={`variants[${i}].price`}>
												{(subField) => (
													<InputField
														value={subField.state.value}
														onChange={(e) =>
															subField.handleChange(parseInt(e.target.value))
														}
														label="Price"
													/>
												)}
											</form.Field>
										</div>
									))}
								</div>

								<Button
									variant="default"
									onClick={() => field.pushValue({ color: '', price: 0 })}
									type="button"
								>
									Add variant
								</Button>
							</div>
						)}
					</form.Field>
				</div>
			</form>
		</div>
	)
}
