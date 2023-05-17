import asyncHandler from 'express-async-handler';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { prisma } from '../prisma.js';
import { DishFields } from '../utils/dish.utils.js';

const __dirname = path.resolve(path.dirname(''));

//@desc Get All Dishes
//@route GET /api/dishes
//@access Public

export const getDishes = asyncHandler(async (req, res) => {
	const dishes = await prisma.dish.findMany({
		select: DishFields,
	});
	if (!dishes) {
		res.status(404);
		throw new Error('Dishes not found!');
	}
	res.json(dishes);
});

//@desc Get Dish
//@route GET /api/dishes/:id
//@access Public

export const getDish = asyncHandler(async (req, res) => {
	const dish = await prisma.dish.findUnique({
		where: {
			id: +req.params.id,
		},
		select: DishFields,
	});
	res.json(dish);
	if (!dish) {
		res.status(404);
		throw new Error('Dish not found!');
	}
});

//@desc Get Category Dish
//@route GET /api/dishes/:id
//@access Public

export const getCategoryDish = asyncHandler(async (req, res) => {
	const dish = await prisma.dish.findUnique({
		where: {
			id: +req.params.id,
		},
		select: {
			category: true,
		},
	});
	res.json(dish);
	if (!dish) {
		res.status(404);
		throw new Error('Dish not found!');
	}
});

//@desc Create Dish
//@route POST /api/dishes
//@access Private Admin

export const createDish = asyncHandler(async (req, res) => {
	try {
		const { name, category, description, cost, weight, calories } = req.body;
		const { images } = req.files;
		const fileName = uuidv4() + '.png';
		images.mv(path.resolve(__dirname, '.', 'uploads/dishes', fileName));

		const dish = await prisma.dish.create({
			data: {
				name,
				category,
				description,
				calories: +calories,
				cost: +cost,
				weight: +weight,
				images: `/uploads/dishes/${fileName}`,
			},
		});
		res.json(dish);
	} catch (err) {
		// res.status(404);
		// throw new Error('Incorrect dish!');
		res.send(err.message);
	}
});

//@desc Update Dish
//@route PUT /api/dishes/:id
//@access Private Admin

export const updateDish = asyncHandler(async (req, res) => {
	try {
		const { name, category, description, cost, weight, calories } = req.body;
		const dish = await prisma.dish.update({
			where: {
				id: +req.params.id,
			},
			data: {
				name,
				category,
				description,
				calories,
				cost,
				weight,
			},
		});
		res.json(dish);
	} catch (err) {
		res.status(404);
		throw new Error('Dish not found!');
	}
});

//@desc Delete Dish
//@route DELETE /api/dishes/:id
//@access Private Admin

export const deleteDish = asyncHandler(async (req, res) => {
	try {
		const dish = await prisma.dish.delete({
			where: {
				id: +req.params.id,
			},
		});
		res.json('Dish deleted');
	} catch (err) {
		res.status(404);
		res.send(err.message);
		// throw new Error('Dish not found!');
	}
});
