import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import FlashCard from "./FlashCard";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export default class Subject extends BaseEntity {

  constructor(subject: string) {
    super();
    this.subject = subject;
  }

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  subject: string = "";

  @Field(() => [FlashCard])
  @OneToMany(() => FlashCard, flashCard => flashCard.subject)
  flashCards: FlashCard[];
}