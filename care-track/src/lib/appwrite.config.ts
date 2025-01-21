import * as sdk from "node-appwrite";

export const {
    APPWRITE_PROJECT_ID: PROJECT_ID,
    APPWRITE_API_KEY: API_KEY,
    APPWRITE_DB_ID: DATABASE_ID,
    NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
    NEXT_PUBLIC_ENDPOINT: ENDPOINT,
    PATIENTS_COLLECTION_ID,
    APPOINTMENTS_COLLECTION_ID,
    DOCTORS_COLLECTION_ID
} = process.env;

const client = new sdk.Client()
    .setEndpoint(ENDPOINT!)
    .setProject(PROJECT_ID!)
    .setKey(API_KEY!);

export const users = new sdk.Users(client);
export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
