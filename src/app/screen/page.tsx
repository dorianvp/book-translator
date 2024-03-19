'use client'

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const HOST = process.env.NODE_ENV == 'production' ? 'https://book-translator-gamma.vercel.app/' : 'http://localhost:3000';

const socket = io(HOST);

export default function Home() {

	const [translation, setTranslation] = useState('')

	useEffect(() => {
		socket.on('data', (data: string) => {
			setTranslation(data)
		})
	}, [socket]);


	return (
		<main className="flex flex-col justify-start items-center min-h-screen bg-yellow-100">
			<section className="flex flex-col justify-start items-center p-5 w-full">
				<h2>
					{translation}
				</h2>
			</section>
		</main>
	);
}

export const dynamic = 'force-dynamic';