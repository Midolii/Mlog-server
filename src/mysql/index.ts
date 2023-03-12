import mysql from "mysql";
import { mysqlConfig } from "./config";

const pool = mysql.createPool(mysqlConfig);

const queryOnce = async (sql: string, values?: unknown[], mysqlPool = pool) =>
    new Promise((resolve, reject) => {
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
                    resolve(result);
                    conn.release();
                }
            );
        });
    });

class CreateMysql {
    private pool: mysql.Pool = pool;
    constructor() {
        void queryOnce("show tables;")
            .then(() => {
                console.log("数据库连接成功");
            })
            .catch((err) => {
                console.log(err);
            });
    }
    queryOnce = queryOnce;
}

export default new CreateMysql();
