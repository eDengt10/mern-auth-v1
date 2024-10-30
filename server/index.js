import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk";
import cors from 'cors';
import path from "path";
import nocache from "nocache";

import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

dotenv.config();

const MongoString = process.env.DATABASE_URL || null;
const HOSTNAME = process.env.HOSTNAME || "localhost";
const PORT = process.env.PORT || 5000;

const app = express();


app.use(cors({
    origin: 'http://localhost:5173',
	credentials: true
}));


mongoose
	.connect(MongoString)
	.then(() => {
		console.log(
			chalk.yellowBright.bold(
				"\t|              " +
					chalk.greenBright.bold("Connected to MongoDB😊") +
					"                 |"
			)
		);
		console.log(
			chalk.yellowBright.bold(
				`\t|                                                     |`
			)
		);
		console.log(
			chalk.yellowBright.bold(
				`\t-------------------------------------------------------`
			)
		);
	})
	.catch((err) => {
		const errorMessage = chalk.redBright.bold(
			"MongoDB connection error: " + err
		);
		console.log(errorMessage);
	});
app.use(express.json())

app.use('/user', userRoutes)
app.use('/auth', authRoutes)
app.use('/admin', adminRoutes)
app.use('/uploads/user-avatars', express.static(path.join( 'uploads/userAvatars')))

app.use(nocache());

app.listen(PORT, () => {
	console.log(
		chalk.yellowBright.bold(
			`\n\t-------------------------------------------------------`
		)
	);
	console.log(
		chalk.yellowBright.bold(
			`\t|                                                     |`
		)
	);
	console.log(
		chalk.yellowBright.bold(
			`\t|    🌐 Server is running on` +
				chalk.cyanBright.bold(` http://${HOSTNAME}:${PORT}`) +
				`    |`
		)
	);
});
