import { Service } from "typedi";
import { AddFlashCardInput } from "../resolver/input/flashcard.input";
import FlashCard from "../entity/FlashCard";
import { ApolloError } from "apollo-server-express";
import Subject from "../entity/Subject";

@Service()
export default class FlashCardService {
  async createFlashCard(data: AddFlashCardInput): Promise<FlashCard> {
    try {
      const subject = await Subject.findOne(data.subjectId);
      return await FlashCard.save(new FlashCard(data, subject));
    } catch {
      throw new ApolloError("Error creating entity");
    }
  }

  async getAllBySubject(subjectId: number) {
    const maybeSubject = await Subject.findOne(subjectId, { relations: ["flashCards"]});

    console.log(maybeSubject?.flashCards);

    return !!maybeSubject ? maybeSubject.flashCards : [];
  }
}
