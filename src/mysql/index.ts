import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { ENV_TYPE } from "../koa-dev";
// import { UserProfile } from "../entity/UserProfile";
// import { UserAuthorize } from "../entity/UserAuthorize";
const ENV = dotenv.config({
    path: ".env",
});

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DB, DB_PORT } =
    ENV.parsed as ENV_TYPE;

export const AppDataSource = new DataSource({
    type: "mysql",
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DB,
    synchronize: true,
    logging: false,
    entities: [`${__dirname}/../entity/*.entity.ts`],
    migrations: [],
    subscribers: [],
});
