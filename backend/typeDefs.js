import { gql } from "apollo-server";

export const typeDefs = gql`
  type Task {
    id: ID
    title: String!
    description: String
    status: String!
    dueDate: String!
    createdDate: String! # FIXED (must match backend)
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    tasks: [Task]
    token: String
    createdAt: String
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

  type Query {
    users: [User!]!
    user(id: ID!): User
    me(token: String!): User
    tasks(userId: ID!): [Task!]!
  }

  type Mutation {
    registerUser(input: RegisterInput!): User
    loginUser(input: LoginInput!): User
    addTask(
      userId: ID!
      title: String!
      description: String
      dueDate: String!
    ): User
    updateTaskStatus(
    userId: ID!
    taskId: ID!
    status: String
    title: String
  ): User
    deleteTask(userId: ID!, taskId: ID!): User
  }
`;
