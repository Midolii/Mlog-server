import Router from "koa-router";

const router = new Router();

router.get("root", "/", (ctx) => {
    console.log(ctx);
});
export default router;
