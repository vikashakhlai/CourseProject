import { Server } from 'socket.io';

const io = new Server(3001, {
	cors: {
		origin: '*',
	},
});

io.on('connection', socket => {
	socket.on('NewDish', () => {
		console.log('Dish add');
		socket.broadcast.emit('addDish');
	});
});
