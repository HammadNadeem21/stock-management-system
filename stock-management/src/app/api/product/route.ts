import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Replace the uri string with your connection string.
  const uri = process.env.MONGODB_URI as string;

  const client = new MongoClient(uri);

  try {
    const database = client.db("stock");
    const inventory = database.collection("inventory");

    // Query for a movie that has the title 'Back to the Future'
    const query = {};
    const products = await inventory.find(query).toArray();

    return NextResponse.json({success:true, products });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}




// POST
export async function POST(request: NextRequest) {


    let body = await request.json()


    // Replace the uri string with your connection string.
    const uri = process.env.MONGODB_URI as string;
  
    const client = new MongoClient(uri);
  
    try {
      const database = client.db("stock");
      const inventory = database.collection("inventory");
  
      const product = await inventory.insertOne(body);
  
      return NextResponse.json({ product, ok:true });
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
