import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm";
import { Movie } from "./Movie";
import { User } from "./User";

@Entity()
export class MovieLike extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, { eager: true })
  liker!: User;

  @ManyToOne(() => Movie, { onDelete: "CASCADE" })
  movie!: Movie;
}
