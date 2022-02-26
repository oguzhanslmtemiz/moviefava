import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm";
import { Actor } from "./Actor";
import { User } from "./User";

@Entity()
export class ActorLike extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, { eager: true })
  liker!: User;

  @ManyToOne(() => Actor, { onDelete: "CASCADE" })
  actor!: Actor;
}
