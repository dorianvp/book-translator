import { DragOverlay, DropAnimation, defaultDropAnimationSideEffects } from "@dnd-kit/core";
import { PropsWithChildren } from "react";

const dropAnimationConfig: DropAnimation = {
	sideEffects: defaultDropAnimationSideEffects({
		styles: {
			active: {
				opacity: "0.4"
			}
		}
	})
};

interface Props { }

export function SortableOverlay({ children }: PropsWithChildren<Props>) {
	return (
		<DragOverlay dropAnimation={dropAnimationConfig}>{children}</DragOverlay>
	);
}