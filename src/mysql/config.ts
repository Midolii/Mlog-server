import { PoolConfig } from "mysql";
import dotenv from "dotenv";

const ENV = dotenv.config({
    path: ".env",
});

type ENV_TYPE = {
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_DB: string;
    DB_PORT: string;
};

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DB, DB_PORT } =
    ENV.parsed as ENV_TYPE;

export const mysqlConfig: PoolConfig = {
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DB,
    connectionLimit: 20,
};
