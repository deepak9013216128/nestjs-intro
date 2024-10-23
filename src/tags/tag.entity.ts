import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 256, unique: true, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 256, unique: true, nullable: false })
  slug: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "text", nullable: true })
  schema?: string;

  @Column({ type: "varchar", length: 1024, nullable: true })
  featuredImageUrl?: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  delete: Date;
}