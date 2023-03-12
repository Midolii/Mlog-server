import type Koa from "koa";
import Router from "koa-router";
import fs from "node:fs";

const initRouter = (app: Koa) => {
    const currentFile = __filename.split(__dirname + "/")[1];
    fs.readdirSync(__dirname).map(async (file, index, array) => {
        if (file === currentFile) {
            return;
        }

        //export 不要用default对象导出，会提示router.routes不是一个function
        const { router } = (await import(`./${file}`)) as { router: Router };
        const output = `  ${index}. /${file.split(".")[0]} registed.  `;
        try {
            app.use(router.routes()).use(router.allowedMethods());
            // console.log(output);
        } catch (e) {
            console.log(e);
        }
        if (index === array.length - 1) {
            // console.log("-".repeat(output.length));
        }
    });
};

export default initRouter;
