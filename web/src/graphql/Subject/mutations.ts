/**
 * Creates a new flash card
 * 
 * Possible fields:
 * subjectId: REQUIRED
 * question: REQUIRED
 * solution: REQUIRED
 * language: NOT REQUIRED
 * code: NOT REQUIRED
 */
export const addFlashCardMutation = /* GraphQL */ `
  mutation createFlashCard(
    $subjectId: Int!
    $question: String!
    $solution: String!
  ) {
    createFlashCard(
      data: { subjectId: $subjectId, question: $question, solution: $solution }
    ) {
      id
    }
  }
`;