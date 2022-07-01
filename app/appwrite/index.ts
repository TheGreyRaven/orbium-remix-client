import { Appwrite, Query } from "appwrite";

const AppwriteSDK = new Appwrite();
const SDK = AppwriteSDK.setEndpoint('https://backend.orbium.xyz/v1').setProject('62a9f5e57a9c0246244e');

export { SDK, Query };
