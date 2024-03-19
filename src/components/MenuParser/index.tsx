import { ItemType, MenuData } from "@/types/types"
import { ProductItem } from "../Product"
import { Table } from "../Table"

export function MenuParser(menu: { menu: MenuData }) {
	const menuData = menu.menu

	return <>
		{
			menuData.map((item, i) => {
				return null
			})
		}
	</>
}