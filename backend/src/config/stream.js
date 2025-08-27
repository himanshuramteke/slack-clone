import { StreamChat } from "stream-chat";
import { STREAM_API_KEY, STREAM_SECRET_KEY } from "./serverConfig.js";

const streamClient = StreamChat.getInstance(STREAM_API_KEY, STREAM_SECRET_KEY);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUser(userData);
    console.log("Stream user upserted successfully", userData.name);
    return userData;
  } catch (error) {
    console.log("Error upserting Stream user:", error);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await streamClient.deleteUser(userId);
    console.log("Stream user deleted successfully", userId);
  } catch (error) {
    console.log("Error deleting Stream user:", error);
  }
};

export const generateStreamToken = (userId) => {
  try {
    const userIdString = userId.toString();
    return streamClient.createToken(userIdString);
  } catch (error) {
    console.log("Error generating Stream Token", error);
    return null;
  }
};
