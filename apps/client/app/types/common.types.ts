export interface IApiRes<T> {
	data: T
}

export enum Role {
	Admin = 'Admin',
	Customer = 'Customer',
}
