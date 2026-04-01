import { IKeys } from "../input/key.interface";
import { BaseEntity } from "@/global/common";
import { Column, Entity } from "typeorm";

@Entity("keys")
export class Keys extends BaseEntity implements IKeys {
  @Column()
  userId: string;

  @Column({ nullable: true })
  openai: string | null;

  @Column({ nullable: true })
  gemini: string | null;

  @Column()
  password: string;
}
