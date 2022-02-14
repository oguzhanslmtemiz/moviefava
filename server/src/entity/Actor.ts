import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
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

  @ManyToOne(() => User, (user) => user.actors, { nullable: false })
  user!: number;

  //   @ManyToOne(() => User)
  //   @JoinColumn({ name: "userId" })
  //   user!: User;

  @CreateDateColumn()
  createdAt!: Date;
}
