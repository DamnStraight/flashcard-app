import { InputType, Field, Int } from "type-graphql";
import FlashCard from "../../entity/FlashCard";

@InputType({ description: "New Flash card data"})
export class AddFlashCardInput implements Partial<FlashCard>{
  @Field()
  question: string;

  @Field()
  solution: string;

  @Field({ nullable: true })
  codeSolution?: string;

  @Field({ nullable: true })
  language?: string;

  @Field(() => Int)
  subjectId: number;
}