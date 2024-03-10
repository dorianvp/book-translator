'use client'

import { Key } from "react";

type WordProps = {
	word: string;
	translation: string;
	k: Key;
}

export function Word({ word, translation, k }: WordProps) {
	async function handleClick() {
		console.log(translation);

		await fetch('http://localhost:3000/api', {
			method: 'POST',
			body: JSON.stringify({
				translation: translation
			})
		})
	}
	return <span
		onClick={handleClick}
		className="transition-colors duration-150 cursor-pointer hover:bg-orange-300"
		key={k}
	>
		{word + ' '}
	</span>
}