'use client'

import { ItemType, MenuData, Product } from "@/types/types";
import { PlusIcon } from "../icons/plus";
import { ChangeEvent, EventHandler, HTMLProps, PropsWithChildren, useEffect, useMemo, useState } from "react";
import { Input } from "../input";
import { updateProducts } from "@/app/lib/actions";
import { Button } from "../button";
import { HomeIcon } from "../icons/home";
import { GripIcon } from '../icons/grip'
import Link from "next/link";
import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useSensors, type UniqueIdentifier, useSensor, PointerSensor, KeyboardSensor, DndContext, closestCenter, DragEndEvent, Active, DropAnimation, defaultDropAnimationSideEffects, DragOverlay } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableProduct } from "./Sortable/SortableProduct";
import { SortableOverlay } from "./Sortable/Overlay";

export function AdminEditor({ data }: { data: MenuData }) {
	const [items, setItems] = useState(data)
	const [active, setActive] = useState<Active | null>(null);
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const activeItem = useMemo(
		() => items.find((item) => item.order === active?.id),
		[active, items]
	);

	function handleDragEnd({ active, over }: DragEndEvent) {
		if (over && active.id !== over?.id) {
			const oldIndex = items.findIndex(({ order }) => order === active?.id);
			const newIndex = items.findIndex(({ order }) => order === over?.id);
			setItems(arrayMove(items, oldIndex, newIndex));
		}
		setActive(null);
	}

	function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
		const id: number = Number(e.currentTarget.id)

		let product = items[id]
		// @ts-ignore
		product[e.currentTarget.name] = e.currentTarget.value;
		const newProducts = items.map((item, i) => {
			if (i === id) {
				return product
			}
			return item
		})
		setItems(newProducts)
	}

	function addProduct() {
		const newItems = items.concat()
		newItems.push({
			type: ItemType.Product,
			title: '',
			description: '',
			id: items.length + 1,
			price: 0,
			order: newItems.length + 1
		})
		setItems(newItems)
	}

	function addList() {
		const newItems = items.concat();
		newItems.push({
			type: ItemType.List,
			title: '',
			id: items.length + 1,
			order: newItems.length + 1,
			contents: []
		})
		setItems(newItems)
	}

	return <form
		onSubmit={(e) => {
			e.preventDefault();
			updateProducts(items)
		}}
		className="flex flex-col h-full"
	>
		<div className="flex mb-2">
			<Link
				className="flex justify-center items-center px-4 mr-2 h-full text-lg rounded-none bg-slate-950 text-slate-200"
				href={'/'}
			>
				<HomeIcon className="" />
			</Link>
			<Button
				className="rounded-none"
				type="submit"
			>
				Save
			</Button>
		</div>
		<DndContext
			sensors={sensors}
			modifiers={[restrictToVerticalAxis]}
			collisionDetection={closestCenter}
			onDragStart={({ active }) => {
				setActive(active);
			}}
			onDragEnd={handleDragEnd}
			onDragCancel={() => {
				setActive(null);
			}}
		>
			<SortableContext
				items={items.map(item => item.order) as number[]}
				strategy={verticalListSortingStrategy}
			>
				<ul className="w-full h-full">
					{items.map((item, i) => {
						if (item.type == ItemType.Product) {

							return <SortableProduct changeHandler={handleChange} product={item} key={item.order} k={i} />
						} else if (item.type == ItemType.List) {

						}
					})}
				</ul>
			</SortableContext>
			<SortableOverlay>
				{activeItem?.type == ItemType.Product ? <SortableProduct changeHandler={handleChange} product={activeItem} key={activeItem.order} /> : <h1>No item selected</h1>}
			</SortableOverlay>
		</DndContext>

		<div className="flex fixed right-0 bottom-0 justify-end">
			<div className="flex flex-col justify-around items-center bg-slate-900 bg-clip-border rounded-xl m-5">
				<div className="flex flex-col w-full">
					<button
						type="button"
						className="p-4 text-white border-b border-slate-700"
						onClick={addProduct}
					>
						Nuevo producto
					</button>
					<button
						type="button"
						className="p-4 text-white border-slate-700"
						onClick={addList}
					>
						Nueva lista
					</button>
				</div>
			</div>
		</div>
	</form>
}