export type ENV_TYPE = {
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_DB: string;
    DB_PORT: string;
};

/**
 * @desc 数据库queryOnce执行`show tables`的返回类型
 */
export type TABLE_TYPE = {
    [K in string]: string;
};
