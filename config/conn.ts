import mongoose from "mongoose";
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const main = async () => {
  await mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.28ywzlz.mongodb.net/?retryWrites=true&w=majority`
  );

  console.log("Connected successfully!");
};

export default main;
