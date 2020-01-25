import { Resolver, Query, Mutation, Arg, Int } from "type-graphql";
import { AddFlashCardInput } from "./input/flashcard.input";
import { Inject } from "typedi";
import FlashCardService from "../service/flashcard.service";
import FlashCard from "../entity/FlashCard";

@Resolver()
export class FlashCardResolver {
  @Inject()
  private readonly flashCardService: FlashCardService;

  @Query(() => [FlashCard])
  async getAllBySubject(@Arg("subjectId", () => Int) subjectId: number): Promise<FlashCard[]> {
    return await this.flashCardService.getAllBySubject(subjectId);
  }

  @Mutation(() => FlashCard)
  async createFlashCard(
    @Arg("data") newFlashCard: AddFlashCardInput
  ): Promise<FlashCard> {
    return await this.flashCardService.createFlashCard(newFlashCard);
  }
}
