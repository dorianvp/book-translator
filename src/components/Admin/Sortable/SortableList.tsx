import { GripIcon } from "@/components/icons/grip";
import { Input } from "@/components/input";
import { Product } from "@/types/types";
import { DragOverlay, DropAnimation, UniqueIdentifier, defaultDropAnimationSideEffects } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChangeEvent, EventHandler, HTMLProps, PropsWithChildren } from "react";

export function SortableList({ product, changeHandler, k }: { product: Product, changeHandler: EventHandler<ChangeEvent>, k?: string | number } & HTMLProps<HTMLInputElement>) {
	const {
		attributes,
		listeners,
		setNodeRef,
		setActivatorNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({ id: product.order as UniqueIdentifier });

	const style = {
		opacity: isDragging ? 0.4 : undefined,
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div className="flex flex-col touch-none bg-amber-200 mb-2 py-2" ref={setNodeRef} style={style} key={k}>
			<li
				className="grid grid-cols-[minmax(0,_1fr)_minmax(0,_1fr)_minmax(0,_0.7fr)] grid-flow-row justify-between items-center py-2 mb-2 "
			>
				<Input
					id={String(k)}
					name="title"
					type="text"
					onChange={changeHandler}
					className="mx-2 h-max"
					value={product.title}
				/>
				<Input
					id={String(k)}
					name="description"
					type="text"
					onChange={changeHandler}
					className="mx-2 h-max"
					value={product.description}
				/>
				<Input
					id={String(k)}
					name="price"
					type="number"
					onChange={changeHandler}
					className="mx-2"
					value={product.price}
				/>
			</li>
			<div ref={setActivatorNodeRef}  {...attributes} {...listeners} className="w-min">
				<GripIcon aria-describedby="" />
			</div>
		</div>
	);
}