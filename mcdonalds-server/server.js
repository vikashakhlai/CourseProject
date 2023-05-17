import 'colors';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import path from 'path';

import { errorHandler, notFound } from './app/middleware/error.middleware.js';

import authRoutes from './app/auth/auth.routes.js';
import dishRoutes from './app/dish/dish.routes.js';
import newsRoutes from './app/news/news.routes.js';
import orderRoutes from './app/order/order.routes.js';
import { prisma } from './app/prisma.js';
import promotionRoutes from './app/promotion/promotion.routes.js';
import userRoutes from './app/user/user.routes.js';

dotenv.config();

const app = express();

async function main() {
	if (process.env.NODE_ENV == 'development') app.use(morgan('dev'));
	app.use(cors());
	app.use(express.json());
	app.use(cookieParser());
	app.use(express.urlencoded({ extended: true }));

	const __dirname = path.resolve();
	app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
	app.use(fileUpload({}));
	app.use('/api/auth', authRoutes);
	app.use('/api/users', userRoutes);
	app.use('/api/news', newsRoutes);
	app.use('/api/promotions', promotionRoutes);
	app.use('/api/dishes', dishRoutes);
	app.use('/api/orders', orderRoutes);
	app.use(notFound);
	app.use(errorHandler);

	const PORT = process.env.PORT || 3000;
	app.listen(
		PORT,
		console.log(
			`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold
		)
	);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async e => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
