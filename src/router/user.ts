import Router from "koa-router";

const router = new Router({
    prefix: "/user",
});

router.get("/:id", async (ctx) => {
    ctx.body = {
        msg: 2,
    };
});

export { router };
