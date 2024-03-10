import { Product } from "@/types/types";

type ProductProps = {
	data: Product
}

export function ProductItem({ data }: ProductProps) {
	return <div className="flex flex-col p-2 my-2 w-full border-2 border-solid border-slate-950">
		<div className="flex justify-between w-full">
			<h3>
				{
					data.title
				}
			</h3>
			<h4 className="flex items-center">${data.price}</h4>
		</div>
		<p>
			{data.description}
		</p>
	</div>
}