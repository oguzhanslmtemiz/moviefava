import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  image!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ default: false })
  shareable!: boolean;

  @ManyToOne(() => User, (user) => user.movies, { nullable: false })
  user!: number;

  //   @ManyToOne(() => User)
  //   @JoinColumn({ name: "userId" })
  //   user!: User;

  @CreateDateColumn()
  createdAt!: Date;
}
