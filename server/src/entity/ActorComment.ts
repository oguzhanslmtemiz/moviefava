import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  Column,
} from "typeorm";
import { Actor } from "./Actor";
import { User } from "./User";

@Entity()
export class ActorComment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  comment!: string;

  @ManyToOne(() => User, { eager: true })
  commenter!: User;

  @ManyToOne(() => Actor, { onDelete: "CASCADE" })
  actor!: Actor;

  @CreateDateColumn()
  createdAt!: Date;
}
