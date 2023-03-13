import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { formatTimestamp } from "../utils";

@Entity()
export class UserProfile {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column("varchar", { length: 16 })
    account: string;

    @Column("varchar", { length: 16 })
    username: string;

    @Column("text", { nullable: true })
    avatar: string;

    @Column("datetime", { default: formatTimestamp(new Date().getTime()) })
    signintime: string;

    @Column("tinyint", { default: false })
    is_del: boolean;
}
