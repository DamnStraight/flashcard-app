/**
 * Fetches all possible flash card subjects
 * 
 * id
 * subject
 */
export const getSubjectsQuery = /* GraphQL */ `
  query {
    getAll {
      id
      subject
    }
  }
`;