import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import { configDotenv } from "dotenv";

configDotenv()

const SECRET_KEY = process.env.SECRET_JWT_KEY; // 🔒 Use env vars in production
const resolvers = {
  Query: {
    users: async () => await User.find(),

    me: async (_, { token }) => {
      try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return await User.findById(decoded.id);
      } catch (err) {
        throw new Error("Invalid token");
      }
    },

    tasks: async (_, { userId }) => {
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");

      return user.tasks;
    },
  },

  Mutation: {
    registerUser: async (_, { input }) => {
      const { username, email, password } = input;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();

      const token = jwt.sign(
        { id: user._id, userName: user.username },
        SECRET_KEY,
        { expiresIn: "1d" }
      );
      return { ...user._doc, id: user._id, token };
    },

    loginUser: async (_, { input }) => {
      const { email, password } = input;
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");

      const match = await bcrypt.compare(password, user.password);
      if (!match) throw new Error("Invalid password");

      const token = jwt.sign(
        { id: user._id, userName: user.username },
        SECRET_KEY,
        { expiresIn: "1d" }
      );
      return { ...user._doc, id: user._id, token };
    },
    deleteTask: async (_, { userId, taskId }) => {
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");

      user.tasks = user.tasks.filter((task) => task.id !== taskId);

      await user.save();
      return user;
    },
    updateTaskStatus: async (_, { userId, taskId, status, title }) => {
      try {
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");

        const task = user.tasks.id(taskId); // find task inside array

        if (!task) throw new Error("Task not found");

        // Update only what is provided
        if (status) task.status = status;
        if (title) task.title = title;

        await user.save(); // important!

        return user;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    addTask: async (_, { userId, title, description, dueDate }) => {
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");

      const newTask = {
        title,
        description,
        dueDate,
        status: "pending", // ⭐ ADD THIS
        createdDate: new Date().toISOString(), // ⭐ automatic timestamp
      };

      user.tasks.push(newTask);
      await user.save();

      return user;
    },
  },
};

export default resolvers;
