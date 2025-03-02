import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const options = {};

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const client = new MongoClient(uri, options);
const clientPromise: Promise<MongoClient> = global._mongoClientPromise || client.connect();

global._mongoClientPromise = clientPromise;

export default clientPromise;
