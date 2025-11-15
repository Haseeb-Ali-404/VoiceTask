import { gql } from "apollo-server";

export const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String
    status: String!
    dueDate: String!
    createdAt: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    tasks: [Task]
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User
    addTask(userId: ID!, title: String!, description: String, dueDate: String!): User
    updateTaskStatus(userId: ID!, taskId: ID!, status: String!): User
    deleteTask(userId: ID!, taskId: ID!): User
  }
`;
