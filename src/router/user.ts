import Router from "koa-router";
import { AppDataSource } from "../mysql";
import { UserProfile } from "../entity/UserProfile.entity";
import { InviteCode } from "../entity/InviteCode.entity";
import { UserAuthorize } from "../entity/UserAuthorize.entity";

const router = new Router({
    prefix: "/user",
});

router.post("/add", async (ctx) => {
    const data = ctx.request.body as {
        invite_code: string;
        username: string;
        phone: string;
    };

    // 获取邀请码数据
    const Ic = await AppDataSource.getRepository(InviteCode)
        .createQueryBuilder("ic")
        .where("invite_code = :invite_code")
        .setParameter("invite_code", data.invite_code)
        .getOne();
    if (Ic && !Ic?.phone) {
        // 为邀请码绑定phone
        Ic.phone = data.phone;
        await AppDataSource.manager.save(InviteCode, Ic);

        const newUser = new UserProfile();
        newUser.username = data.username;
        await AppDataSource.manager.save(UserProfile, newUser);

        Ic.user_profile = newUser;
        await AppDataSource.manager.save(InviteCode, Ic);

        const newAuth = new UserAuthorize();
        newAuth.user_profile = newUser;
        await AppDataSource.manager.save(UserAuthorize, newAuth);
        ctx.body = {
            uuid: newUser.uuid,
            msg: "注册成功",
        };
    } else {
        ctx.body = {
            msg: "邀请码已经使用过了",
        };
    }
});

export { router };
