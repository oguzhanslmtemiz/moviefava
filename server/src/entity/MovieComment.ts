import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  Column,
} from "typeorm";
import { Movie } from "./Movie";
import { User } from "./User";

@Entity()
export class MovieComment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  comment!: string;

  @ManyToOne(() => User, { eager: true })
  commenter!: User;

  @ManyToOne(() => Movie, { onDelete: "CASCADE" })
  movie!: Movie;

  @CreateDateColumn()
  createdAt!: Date;
}
