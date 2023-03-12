import mysql from "mysql";
import { mysqlConfig, initQuery } from "./config";
import { TABLE_TYPE } from "../koa-dev";

class CreateMysql {
    private pool: mysql.Pool;
    constructor() {
        this.pool = mysql.createPool(mysqlConfig);
        void this.initConnection();
        void this.initTables();
    }
    async queryOnce<T>(sql: string, values?: unknown[], mysqlPool = this.pool) {
        return new Promise<T>((resolve, reject) => {
            mysqlPool.getConnection((err, conn) => {
                if (err) {
                    reject(err);
                }
                conn.query(
                    {
                        sql,
                        values,
                    },
                    (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(result as T);
                        conn.release();
                    }
                );
            });
        });
    }
    private async initConnection() {
        void this.queryOnce("show tables;")
            .then(() => {
                console.log("数据库连接成功");
            })
            .catch((err) => {
                console.log(err);
            });
    }
    private async initTables() {
        try {
            await this.queryOnce(initQuery.CREATE_TABLE_USER_INFOMATION);
            await this.queryOnce(initQuery.CREATE_TABLE_USER_AUTHORIZE);
            const result = await this.queryOnce<TABLE_TYPE[]>(
                initQuery.SHOW_TABLES
            );
            const tables = result.map((i) => {
                return Object.values(i)[0];
            });
            console.log(Object.keys(result[0])[0], tables);
        } catch (e) {
            console.log(e);
        }
    }
}

export default new CreateMysql();
