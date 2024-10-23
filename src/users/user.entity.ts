import { Post } from "src/posts/post.entity";
import {
  Column,
  PrimaryColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 96,
    nullable: false,
  })
  email: string;

  @Column({
    type: "varchar",
    length: 96,
    nullable: false,
  })
  password: string;

  @Column({ type: "varchar", length: 96, nullable: false })
  firstName: string;

  @Column({ type: "varchar", length: 96, nullable: true })
  lastName: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
