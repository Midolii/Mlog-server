import Koa from "koa";
import bodyParser from "koa-bodyparser";
import KoaLogger from "koa-logger";
import initRouter from "./router";
import helmet from "koa-helmet";
import { AppDataSource } from "./mysql";

void AppDataSource.initialize().then(async () => {
    const app = new Koa();
    const port = 10001;

    app.use(bodyParser());
    app.use(KoaLogger());
    app.use(helmet());

    initRouter(app);

    app.listen(port);

    const output = `| Koa starting and listening port: ${port} |`;
    console.log("-".repeat(output.length));
    console.log(output);
    console.log("-".repeat(output.length));
});
