//@desc GET User profile
//@route POST/api/users/profile
//@access Private
import asyncHandler from 'express-async-handler';

import { prisma } from '../prisma.js';

export const getUserProfile = asyncHandler(async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id,
		},
		include: {
			promotions: true,
		},
	});

	res.json({
		...user,
	});
});

//@desc GET Users
//@route POST/api/users
//@access Private Admin
export const getUsers = asyncHandler(async (req, res) => {
	const users = await prisma.user.findMany({
		include: {
			promotions: true,
		},
		where: {
			role: 'user',
		},
	});
	res.json(users);
	if (!users) {
		res.status(401);
		throw new Error('Users not found');
	}
});

//@desc GET User Orders
//@route GET /api/users/orders
//@access Private
export const getUserOrders = asyncHandler(async (req, res) => {
	const orders = await prisma.order.findMany({
		where: {
			userId: req.user.id,
		},
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

//@desc GET User Role
//@route POST/api/users/role
//@access Private
export const getUserRole = asyncHandler(async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id,
		},
		select: {
			role: true,
		},
	});
	res.json(user);
	if (!user) {
		res.status(401);
		throw new Error('Users not found');
	}
});

//@desc Create User Order
//@route GET /api/users/orders
//@access Private

export const createUserOrder = asyncHandler(async (req, res) => {
	try {
		const { items, totalPrice } = req.body;

		const order = await prisma.order.create({
			data: {
				dishes: {
					create: items,
				},
				totalPrice: +totalPrice,
				User: {
					connect: {
						id: req.user.id,
					},
				},
			},
		});
		res.json(order);
	} catch (err) {
		res.json(err.message);
		res.status(401);
		throw new Error('Incorrect order');
	}
});
