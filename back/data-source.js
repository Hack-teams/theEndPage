import { DataSource } from "typeorm";
import TemplatePage from './models/TemplatePage.js';
import User from "./models/User.js";
import 'dotenv/config';

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: [TemplatePage, User],
    migrations: [],
    subscribers: [],
});
