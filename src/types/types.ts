export type MenuData = (Product | ListItem)[]

export enum ItemType {
	List = 'list',
	Product = 'product',
	Dynamic = 'dynamic'
}

export type ListItem = {
	type: ItemType.List;
	id?: number;
	order?: number;
	title: string;
	contents: DynamicProduct[]
}

export type Product = {
	type: ItemType.Product;
	id?: number;
	order?: number;
	title: string;
	description?: string;
	price: number;
}

export type DynamicProduct = {
	type: ItemType.Dynamic;
	id?: number;
	order: number;
	[key: string]: any;
}