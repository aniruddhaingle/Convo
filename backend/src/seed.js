import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import { connectDB } from "./lib/db.js";
import User from "./models/user.model.js";
import Message from "./models/message.model.js";

const users = [
  {
    fullName: "Alice Johnson",
    email: "alice@example.com",
    password: "Password123!",
  },
  {
    fullName: "Bob Williams",
    email: "bob@example.com",
    password: "Password123!",
  },
  {
    fullName: "Charlie Adams",
    email: "charlie@example.com",
    password: "Password123!",
  },
];

const messages = [
  {
    senderEmail: "alice@example.com",
    receiverEmail: "bob@example.com",
    text: "Hey Bob, welcome to the chat app!",
  },
  {
    senderEmail: "bob@example.com",
    receiverEmail: "alice@example.com",
    text: "Thanks Alice! This looks great.",
  },
  {
    senderEmail: "charlie@example.com",
    receiverEmail: "alice@example.com",
    text: "Hi Alice, how are you?",
  },
];

const seedDatabase = async () => {
  await connectDB();

  const userMap = {};

  for (const userData of users) {
    const existingUser = await User.findOne({ email: userData.email.toLowerCase() });
    if (existingUser) {
      userMap[userData.email] = existingUser;
      continue;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser = await User.create({
      fullName: userData.fullName,
      email: userData.email.toLowerCase(),
      password: hashedPassword,
    });

    userMap[userData.email] = newUser;
  }

  const savedMessages = [];
  for (const message of messages) {
    const sender = userMap[message.senderEmail];
    const receiver = userMap[message.receiverEmail];

    if (!sender || !receiver) {
      console.warn(`Skipping message because sender or receiver is missing: ${message.senderEmail} -> ${message.receiverEmail}`);
      continue;
    }

    const existing = await Message.findOne({
      senderId: sender._id,
      receiverId: receiver._id,
      text: message.text,
    });

    if (existing) {
      savedMessages.push(existing);
      continue;
    }

    const newMessage = await Message.create({
      senderId: sender._id,
      receiverId: receiver._id,
      text: message.text,
    });

    savedMessages.push(newMessage);
  }

  console.log(`Seeded ${Object.keys(userMap).length} users and ${savedMessages.length} messages.`);
  process.exit(0);
};

seedDatabase().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
