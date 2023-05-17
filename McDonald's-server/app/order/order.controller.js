import asyncHandler from 'express-async-handler';

import { prisma } from '../prisma.js';

//@desc Get All Orders
//@route GET /api/orders
//@access Private Admin

export const getOrders = asyncHandler(async (req, res) => {
	const orders = await prisma.order.findMany({
		include: {
			dishes: {
				select: {
					dish: true,
					quantity: true,
				},
			},
		},
		orderBy: {
			createAt: 'desc',
		},
	});
	if (!orders) {
		res.status(404);
		throw new Error('Orders not found');
	}
	res.json(orders);
});

//@desc Get Order
//@route GET /api/orders/:id
//@access Private Admin

export const getOrder = asyncHandler(async (req, res) => {
	const order = await prisma.order.findUnique({
		where: {
			id: +req.params.id,
		},
	});
	if (!order) {
		res.status(404);
		throw new Error('Order not found!');
	}
	res.json(order);
});

//@desc Delete Order
//@route DELETE /api/orders/:id
//@access Private Admin

export const deleteOrder = asyncHandler(async (req, res) => {
	try {
		const order = await prisma.order.delete({
			where: {
				id: +req.params.id,
			},
		});

		res.json('Order deleted!');
	} catch (err) {
		res.status(401);
		throw new Error('Incorrect order');
	}
});

//@desc Update Order
//@route PUT /api/orders/:id
//@access Private Admin

export const updateOrder = asyncHandler(async (req, res) => {
	try {
		const order = await prisma.order.update({
			where: {
				id: +req.params.id,
			},
			data: {
				comment,
			},
		});
		res.json(order);
	} catch (err) {
		res.status(401);
		throw new Error('Incorrect order');
	}
});

//@desc Set isCompleted Order
//@route PATH /api/orders/:id
//@access Private Admin

export const updateCompleteOrder = asyncHandler(async (req, res) => {
	try {
		const completeOrder = await prisma.order.update({
			where: {
				id: +req.params.id,
			},
			data: {
				isCompleted: true,
			},
			include: {
				dishes: {
					select: {
						dish: true,
						quantity: true,
					},
				},
			},
		});
		res.json(completeOrder);
	} catch (err) {
		res.status(401);
		throw new Error('Incorrect Order');
	}
});
