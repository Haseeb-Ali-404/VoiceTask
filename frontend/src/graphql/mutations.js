import { gql } from "@apollo/client";


export const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterInput!) {
    registerUser(input: $input) {
      id
      username
      email
      token
    }
  }
`;


export const LOGIN_USER = gql`
  mutation LoginUser($input: LoginInput!) {
    loginUser(input: $input) {
      id
      username
      email
      token
    }
  }
`;
export const ADD_TASK = gql`
  mutation AddTask(
    $userId: ID!
    $title: String!
    $description: String
    $dueDate: String!
  ) {
    addTask(
      userId: $userId
      title: $title
      description: $description
      dueDate: $dueDate
    ) {
      id
      username
      tasks {
        id
        title
        description
        dueDate
        status
        createdDate
      }
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($userId: ID!, $taskId: ID!) {
    deleteTask(userId: $userId, taskId: $taskId) {
      id
      tasks {
        id
        title
        description
        status
        dueDate
      }
    }
  }
`;



export const GET_TASKS = gql`
  query GetTasks($userId: ID!) {
    tasks(userId: $userId) {
      id
      title
      description
      dueDate
      createdDate
      status
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTaskStatus($userId: ID!, $taskId: ID!, $status: String!) {
    updateTaskStatus(userId: $userId, taskId: $taskId, status: $status) {
      id
      username
      tasks {
        id
        title
        status
        dueDate
      }
    }
  }
`;
export const GET_USER = gql`
  query GetUser($userId: ID!) {
    user(userId: $userId) {
      id
      username
      email
    }
  }
`;