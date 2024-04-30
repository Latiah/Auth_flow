import { APPWRITE_PROJECT_ID } from "@env";
import { Platform } from "react-native";
import { Client } from "react-native-appwrite/src";

const IOS_PLATFORM = "com.example.hoop";
const ANDROID_PLATFORM = "com.example.hoop";

function getPlatform() {
  switch (Platform.OS) {
    case "ios":
      return IOS_PLATFORM;
    case "android":
      return ANDROID_PLATFORM;
    default:
      return "com.example.hoop";
  }
}

let platform = getPlatform();

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(APPWRITE_PROJECT_ID)
  .setPlatform(platform)
  

export default client;
