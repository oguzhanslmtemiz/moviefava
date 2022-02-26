import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { MovieComment } from "./MovieComment";
import { MovieLike } from "./MovieLike";
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

  @ManyToOne(() => User, (user) => user.movies)
  user!: User;

  @OneToMany(() => MovieLike, (like) => like.movie, { eager: true })
  likes!: MovieLike[];

  @OneToMany(() => MovieComment, (comment) => comment.movie)
  comments!: MovieComment[];

  @CreateDateColumn()
  createdAt!: Date;
}
