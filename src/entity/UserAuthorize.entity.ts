import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { UserProfile } from "./UserProfile.entity";

@Entity()
export class UserAuthorize {
    @PrimaryGeneratedColumn("uuid")
    auth_column: string;

    @ManyToOne(() => UserProfile, (user) => user.uuid)
    @JoinColumn({ name: "user_uid" })
    user_profile: UserProfile;

    @Column("varchar", { length: 16, nullable: true })
    phone: string;

    @Column("varchar", { length: 255, nullable: true })
    email: string;

    @Column("varchar", { length: 32, nullable: true })
    salt: string;

    @Column("varchar", { length: 32, nullable: true })
    password: string;

    @Column("tinyint", { default: false })
    is_del: boolean;
}
