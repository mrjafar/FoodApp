import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://mrjafar:93039650@cluster0.mjxstxe.mongodb.net/foodApp"
    )
    .then(() => console.log("MongoDB connected..."));
};
