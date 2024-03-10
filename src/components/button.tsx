import { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export function Button({ children, className, onClick }: ButtonProps) {
	return <button
		className={`px-4 py-2 w-auto text-lg rounded-lg bg-slate-950 text-slate-200 font-serif font-semibold ${className}`}
		onClick={onClick}
	>
		{children}
	</button>
}