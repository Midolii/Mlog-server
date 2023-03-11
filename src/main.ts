import Koa from "koa";
import bodyParser from "koa-bodyparser";

const app = new Koa();
const port = 10001;

app.use(bodyParser());

app.use((ctx) => {
    ctx.body = {
        msg: 1,
    };
});

// app.use(router.routes()).use(router.allowedMethods());

try {
    app.listen(port);
    console.log(`Koa starting and listening port: ${port}`);
} catch {
    console.log(`Koa starting error`);
}
