import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

const MongoString = process.env.DATABASE_URL;
const HOSTNAME = process.env.HOSTNAME
const PORT = process.env.PORT

mongoose.connect(MongoString)
    .then(() => {
        console.log(chalk.yellowBright.bold("\t|              " + chalk.greenBright.bold("Connected to MongoDB😊") + "                 |"));
        console.log(chalk.yellowBright.bold(`\t|                                                     |`));
        console.log(chalk.yellowBright.bold(`\t-------------------------------------------------------`));
    })
    .catch(err => {
        const errorMessage = chalk.redBright.bold("MongoDB connection error: " + err);
        console.log(errorMessage);
    });

const app = express();

// Start server
app.listen(PORT, () => {
    console.log(chalk.yellowBright.bold(`\n\t-------------------------------------------------------`));
    console.log(chalk.yellowBright.bold(`\t|                                                     |`));
    console.log(chalk.yellowBright.bold(`\t|    🌐 Server is running on` + chalk.cyanBright.bold(` http://${HOSTNAME}:${PORT}`) + `    |`));
});

