import { Product } from "@/types/types";

type TableProps = {
	data: {
		title: string;
		columns: string[];
		contents: Product[]
	}
}

export function Table({ data }: TableProps) {
	return (
		<div className="w-full">
			<table className="p-2 my-2 w-full border-2 border-solid border-slate-950">
				<tbody>
					<tr>
						<p className="font-bold">
							{data.title}
						</p>
						{
							data.columns.map((column, i) => {
								return <td key={i}>{column}</td>
							})
						}
					</tr>
				</tbody>
			</table>

		</div>
	)
}