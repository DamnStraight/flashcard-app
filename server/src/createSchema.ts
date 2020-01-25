import { Container } from 'typedi';
import { useContainer } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { FlashCardResolver } from './resolver/flashcard.resolver';
import { SubjectResolver } from './resolver/subject.resolver';

useContainer(Container);

export const createSchema = async () => {
  return await buildSchema({
    resolvers: [FlashCardResolver, SubjectResolver],
    container: Container,
  })
};