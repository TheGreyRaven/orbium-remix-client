import { Appwrite, Query } from "appwrite";

const AppwriteSDK = new Appwrite();
const SDK = AppwriteSDK.setEndpoint(process.env.APPWRITE_DOMAIN).setProject(
	process.env.APPWRITE_ID
);

export { SDK, Query };
