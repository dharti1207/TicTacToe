import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATA_BASE_URI);

    console.log(`Database Connected: ${connection.connection.host}`);
  } catch (error) {
    process.exit(1);
  }
};
