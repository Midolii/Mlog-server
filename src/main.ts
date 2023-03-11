import Koa from "koa";
import Router from "koa-router";

const router = new Router();

const app = new Koa();
const port = 10033;

app.use(async (ctx) => {
    console.log(ctx);
    ctx.body = {
        msg: "hello world",
    };
});

app.use(router.routes());

app.listen(port);
