import express from 'express';
import next from 'next';
import { Server } from 'socket.io';
import { createServer } from 'http';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
	const server = express();
	const httpServer = createServer(server);
	const io = new Server(httpServer, {
		cors: {
			origin: 'http://localhost:3000'
		}
	});

	io.on('connection', (socket) => {
		console.log('Client connected');

		socket.on('data', (data) => {
			console.log('Recieved ::', data)
			io.emit('data', data);
		})
	});

	server.all('*', (req, res) => {
		return handle(req, res);
	});

	const PORT = process.env.PORT || 3000;
	httpServer.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
});