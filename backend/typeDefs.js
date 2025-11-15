import { gql } from "apollo-server";

const typeDefs = gql`
  type Task {
    title: String
    description: String
    dueDate: String
    createdDate: String
  }

  type User {
    id: ID!
    username: String!
    email: String!
    tasks: [Task]
    token: String
  }

  type Query {
    users: [User]
    me(token: String!): User
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Mutation {
    registerUser(input: RegisterInput!): User
    loginUser(input: LoginInput!): User
    addTask(userId: ID!, title: String!, description: String, dueDate: String): User
  }
`;

export default typeDefs;
