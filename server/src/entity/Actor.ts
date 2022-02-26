import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ActorComment } from "./ActorComment";
import { ActorLike } from "./ActorLike";
import { User } from "./User";

@Entity()
export class Actor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fullname!: string;

  @Column()
  image!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ default: false })
  shareable!: boolean;

  @ManyToOne(() => User, (user) => user.actors)
  user!: User;

  @OneToMany(() => ActorLike, (like) => like.actor, { eager: true })
  likes!: ActorLike[];

  @OneToMany(() => ActorComment, (comment) => comment.actor)
  comments!: ActorComment[];

  @CreateDateColumn()
  createdAt!: Date;
}
