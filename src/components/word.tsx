'use client'

import { Key } from "react";

type WordProps = {
	word: string;
	translation: string;
	k: Key;
}

export function Word({ word, translation, k }: WordProps) {
	async function handleClick() {
		const HOST = process.env.NODE_ENV == 'production' ? 'https://book-translator-production.up.railway.app' : 'http://localhost:3000';
		await fetch(`${HOST}/api`, {
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