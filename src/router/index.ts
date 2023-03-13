import type Koa from "koa";
import Router from "koa-router";
import fs from "node:fs";

const initRouter = (app: Koa) => {
    const currentFile = __filename.split(__dirname + "/")[1];
    fs.readdirSync(__dirname).map(async (file) => {
        if (file === currentFile) {
            return;
        }

        //export 不要用default对象导出，会提示router.routes不是一个function
        const { router } = (await import(`./${file}`)) as { router: Router };
        try {
            app.use(router.routes()).use(router.allowedMethods());
        } catch (e) {
            console.log(e);
        }
    });
};

export default initRouter;
