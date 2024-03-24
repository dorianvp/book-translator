'use client'

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const HOST = process.env.NODE_ENV == 'production' ? 'https://book-translator-production.up.railway.app' : 'http://localhost:3000';

const socket = io(HOST);

export default function Home() {

	const [translation, setTranslation] = useState('')

	useEffect(() => {
		socket.on('data', (data: string) => {
			setTranslation(data.toLocaleUpperCase())
		})
	}, [socket]);


	return (
		<main className="flex flex-col justify-center items-center min-h-screen bg-yellow-100">
			<section className="flex flex-col justify-start items-center p-5 w-full">
				<h1>
					{translation}
				</h1>
			</section>
		</main>
	);
}

export const dynamic = 'force-dynamic';