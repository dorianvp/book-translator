import { DetailedHTMLProps, InputHTMLAttributes } from "react"

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & {
	pending?: boolean;
}

export function Input({ onChange, pending, placeholder, className, ...restProps }: InputProps) {
	return <textarea
		wrap="hard"
		className={`px-2 py-2 text-sm rounded-md resize-y ${className}`}
		onChange={onChange}
		rows={1}
		placeholder={placeholder}
		aria-disabled={pending}
		{...restProps}
	/>
}