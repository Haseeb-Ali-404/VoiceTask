import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/User.js";

const SECRET_KEY = "your_secret_key"; // 🔒 Use env vars in production

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
  },

  Mutation: {
    registerUser: async (_, { input }) => {
      const { username, email, password } = input;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1d" });
      return { ...user._doc, id: user._id, token };
    },

    loginUser: async (_, { input }) => {
      const { email, password } = input;
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");
      const match = await bcrypt.compare(password, user.password);
      if (!match) throw new Error("Invalid password");

      const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1d" });
      return { ...user._doc, id: user._id, token };
    },

    addTask: async (_, { userId, title, description, dueDate }) => {
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");

      const newTask = { title, description, dueDate, createdDate: new Date() };
      user.tasks.push(newTask);
      await user.save();

      return user;
    },
  },
};

export default resolvers;
