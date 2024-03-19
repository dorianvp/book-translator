export const dynamic = 'force-dynamic';

import io from 'socket.io-client';

export async function POST(request: Request) {
	const HOST = process.env.NODE_ENV == 'production' ? 'https://book-translator-gamma.vercel.app/' : 'http://localhost:3000';

	const socket = io(HOST);
	const res = await request.json();
	socket.emit('data', res.translation);

	return new Response('Success!', {
		status: 200
	})
}