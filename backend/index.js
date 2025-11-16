import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import connectDB from "./config/db.js";
import { typeDefs } from "./typeDefs.js";
import resolvers from "./resolver.js";
import geminiRoutes from "./routes/geminiRoutes.js";
import summaryRoutes from "./routes/summaryRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// AI Route
app.use("/ai", geminiRoutes);

app.use("/ai", summaryRoutes);


async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app }); // Attach GraphQL to Express

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`🚀 GraphQL available at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
