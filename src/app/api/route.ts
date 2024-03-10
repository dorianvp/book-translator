export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
	const res = await request.json();
	console.log(res.translation);
	return new Response('Success!', {
		status: 200
	})
}