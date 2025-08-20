import { connect, disconnect } from "mongoose";

async function connectToDatabase() {
  try {
    const conn = await connect(process.env.MONGODB_URL);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    throw new Error("Cannot connect to MongoDB");
  }
}

async function disconnectFromDatabase() {
  try {
    await disconnect();
  } catch (error) {
    console.error(error);
    throw new Error("Could not disconnect from the database");
  }
}

export { connectToDatabase, disconnectFromDatabase };
