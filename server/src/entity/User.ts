import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import { hashPassword } from "../utils/helper";
import { Actor } from "./Actor";
import { Movie } from "./Movie";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column({ default: false })
  isPassAutoGen!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Movie, (movie) => movie.user)
  movies!: Movie[];

  @OneToMany(() => Actor, (actor) => actor.user)
  actors!: Actor[];

  @BeforeInsert()
  async hashPass() {
    this.password = await hashPassword(this.password);
  }
}
