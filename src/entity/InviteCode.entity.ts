import { randomUUID } from "crypto";
import { AppDataSource } from "../mysql";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { UserProfile } from "./UserProfile.entity";

@Entity()
export class InviteCode {
    @Column("varchar", { length: 16, primary: true })
    invite_code: string;

    @Column("varchar", { length: 16, default: "" })
    phone: string;

    @OneToOne(() => UserProfile)
    @JoinColumn({ name: "uuid" })
    user_profile: UserProfile;

    async addInviteCode(number: number) {
        const inviteCodeList = new Array(number).fill(null).map(() => {
            return {
                invite_code: `ic-${randomUUID().slice(0, 13)}`,
            };
        });
        await AppDataSource.createQueryBuilder()
            .insert()
            .into(InviteCode)
            .values(inviteCodeList)
            .execute();
    }
}
