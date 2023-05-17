import asyncHandler from 'express-async-handler';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { prisma } from '../prisma.js';

const __dirname = path.resolve(path.dirname(''));

//@desc GET All News
//@route GET /api/news
//@access Public

export const getNews = asyncHandler(async (req, res) => {
	const news = await prisma.news.findMany({
		orderBy: {
			createAt: 'desc',
		},
	});
	if (!news) {
		res.status(401);
		throw new Error('news not found!');
	}
	res.json(news);
});

// @desc Get One News
// @route GET /api/news/:id
// @access Public

export const getOneNews = asyncHandler(async (req, res) => {
	const news = await prisma.news.findUnique({
		where: {
			id: +req.params.id,
		},
	});
	if (!news) {
		res.status(401);
		throw new Error('news not found!');
	}
	res.json(news);
});

// @desc Create News
// @route POST /api/news
// @access Private Admin

export const createNews = asyncHandler(async (req, res) => {
	try {
		const { name, description } = req.body;
		console.log(req.files);
		const { image } = req.files;
		const fileName = uuidv4() + '.png';
		image.mv(path.resolve(__dirname, '.', 'uploads/news', fileName));
		const news = await prisma.news.create({
			data: {
				name,
				description,
				image: `/uploads/news/${fileName}`,
			},
		});
		res.json(news);
	} catch (err) {
		res.send(err.message);
		// res.status(401);
		// throw new Error('Incorrect news');
	}
});

// @desc Update News
// @route PUT /api/news/:id
// @access Private Admin

export const updateNews = asyncHandler(async (req, res) => {
	console.log(req.body);
	const { name, description } = req.body;
	console.log(req.files);
	const { image } = req.files;
	const fileName = uuidv4() + '.png';
	image.mv(path.resolve(__dirname, '.', 'uploads/news', fileName));
	try {
		const news = await prisma.news.update({
			where: {
				id: +req.params.id,
			},
			data: {
				name,
				description,
				image: `/uploads/news/${fileName}`,
			},
		});
		res.json(news);
	} catch (err) {
		res.status(404);
		throw new Error('News not found!');
	}
});

// @desc Delete News
// @route DELETE /api/news/:id
// @access Private Admin

export const deleteNews = asyncHandler(async (req, res) => {
	try {
		const news = await prisma.news.delete({
			where: {
				id: +req.params.id,
			},
		});
		res.json('News deleted!');
	} catch (err) {
		res.status(404);
		throw new Error('News not found!');
	}
});
