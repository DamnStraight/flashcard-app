import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";
import Subject from "./Subject";
import { AddFlashCardInput } from "../resolver/input/flashcard.input";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity({ name: "flash_card" })
export default class FlashCard extends BaseEntity {
  constructor(data: AddFlashCardInput, subject?: Subject) {
    super();
    this.question = data?.question;
    this.solution = data?.solution;
    this.language = data?.language
    this.codeSolution = data?.codeSolution;
    if (subject) this.subject = subject;
  }

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  question: string = "";

  @Field({ nullable: false })
  @Column({ nullable: false })
  solution: string = "";

  @Field({ nullable: true })
  @Column({ nullable: true })
  language?: string;

  @Field({ nullable: true})
  @Column({ nullable: true })
  codeSolution?: string;

  @Field(() => Subject)
  @ManyToOne(
    () => Subject,
    subject => subject.flashCards
  )
  subject: Subject;
}
