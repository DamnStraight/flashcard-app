import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { createConnection } from 'typeorm';
import { createSchema } from './createSchema';

const startServer = async (): Promise<void> => {
  
  const connection = await createConnection();

  if (connection) {
    await connection.runMigrations();
    // TODO Load fixtures when running from dev
  }

  const server = new ApolloServer({
    schema: await createSchema(),
  });

  const app = express();

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
