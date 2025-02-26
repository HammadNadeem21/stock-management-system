import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string; // .env se connection string
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Add MONGODB_URI in .env file");
}

if (process.env.NODE_ENV === "development") {
  // Global variable use karein taake multiple connections na bane
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // Production ke liye direct connect
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
