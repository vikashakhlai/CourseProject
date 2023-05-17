import asyncHandler from 'express-async-handler';

import { prisma } from '../prisma.js';

//@desc GET Promotions
//@route POST/api/promotions
//@access Private

export const getPromotions = asyncHandler(async (req, res) => {
	const promotions = await prisma.promotion.findMany({
		orderBy: {
			createAt: 'desc',
		},
		include: {
			users: true,
		},
	});
	if (!promotions) {
		res.status(401);
		throw new Error('Promotions not found!');
	}
	res.json(promotions);
});

// @desc Get Promotion
// @route GET /api/promotions/:id
// @access Private

export const getPromotion = asyncHandler(async (req, res) => {
	const promotion = await prisma.promotion.findUnique({
		where: {
			id: +req.params.id,
		},
		include: {
			users: true,
		},
	});
	if (!promotion) {
		res.status(401);
		throw new Error('Promotion not found!');
	}
	res.json(promotion);
});

// @desc Create Promotions
// @route Post /api/promotions
// @access Private Admin

export const createPromotions = asyncHandler(async (req, res) => {
	try {
		const { name, description, userIds } = req.body;
		const promotion = await prisma.promotion.create({
			data: {
				name,
				description,
				users: {
					connect: userIds.map(id => ({
						id: +id,
					})),
				},
			},
		});
		res.json(promotion);
	} catch (err) {
		//res.send(err.message);
		res.status(401);
		throw new Error('Incorrect promotion');
	}
});

// @desc Update Promotions
// @route Post /api/promotions/:id
// @access Private Admin

export const updatePromotions = asyncHandler(async (req, res) => {
	try {
		const { name, description, userIds } = req.body;
		const promotion = await prisma.promotion.update({
			where: {
				id: +req.params.id,
			},
			data: {
				name,
				description,

				users: {
					set: userIds.map(id => ({
						id: +id,
					})),
				},
			},
		});
		res.json(promotion);
	} catch (err) {
		res.status(404);
		throw new Error('Promotion not found!');
	}
});

// @desc Delete Promotions
// @route Post /api/promotions/:id
// @access Private Admin

export const deletePromotions = asyncHandler(async (req, res) => {
	try {
		const promotion = await prisma.promotion.delete({
			where: {
				id: +req.params.id,
			},
		});
		res.json('Promotion deleted!');
	} catch (err) {
		res.status(404);
		throw new Error('Promotion not found!');
	}
});
