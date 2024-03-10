import { ItemType, MenuData } from "@/types/types"
import { ProductItem } from "../Product"
import { Table } from "../Table"

export function MenuParser(menu: { menu: MenuData }) {
	const menuData = menu.menu

	return <>
		{
			menuData.map((item, i) => {
				if (item.type == ItemType.Product) {
					return <ProductItem key={i} data={item} />
				}
				if (item.type == ItemType.Table) {
					return <Table key={i} data={item} />
				}
				return null
			})
		}
	</>
}