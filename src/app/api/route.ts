export const dynamic = 'force-dynamic';

import io from 'socket.io-client';

export async function POST(request: Request) {
	const socket = io('http://localhost:3000');
	const res = await request.json();
	socket.emit('data', res.translation);

	return new Response('Success!', {
		status: 200
	})
}