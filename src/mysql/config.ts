import { PoolConfig } from "mysql";
import dotenv from "dotenv";
import { ENV_TYPE } from "../koa-dev";

const ENV = dotenv.config({
    path: ".env",
});

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DB, DB_PORT } =
    ENV.parsed as ENV_TYPE;

const initQuery = {
    INIT_TABLE_LIST: ["user_infomation", "user_authorize"],
    SHOW_TABLES: `show tables;`,
    CREATE_TABLE_USER_INFOMATION: `create table if not exists user_infomation (
        uid varchar(16) primary key,
        user_name varchar(16) not null,
        user_signature varchar(128) default "这里什么都没有",
        user_avatar text default null,
        signin_time datetime not null default CURRENT_TIMESTAMP,
        is_del tinyint(1) not null default 0
    );`,
    CREATE_TABLE_USER_AUTHORIZE: `create table if not exists user_authorize (
        phone varchar(16) primary key,
        uid varchar(16),
        email varchar(255) default null,
        salt varchar(16) default null,
        password varchar(255) default null,
        foreign key(uid) references user_infomation(uid)
    );`,
};

const mysqlConfig: PoolConfig = {
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DB,
    connectionLimit: 20,
};

export { initQuery, mysqlConfig };
