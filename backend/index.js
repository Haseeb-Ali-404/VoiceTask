import { ApolloServer } from "apollo-server";
import connectDB from "./config/db.js";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolver.js";

// Connect Database
connectDB();

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start Server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
