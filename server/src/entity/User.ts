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

  @Column({ select: false })
  password!: string;

  @Column({ default: false, select: false })
  isPassAutoGen!: boolean;

  @Column({ nullable: true })
  avatar!: string;

  @CreateDateColumn({ select: false })
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
