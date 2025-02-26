import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";


export async function GET( request:NextRequest){

// Replace the uri string with your connection string.
const uri = process.env.MONGODB_URI as string;

const client = new MongoClient(uri);


  try {
    const database = client.db('hammad');
    const movies = database.collection('stock-management');

    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);

    console.log(movie);
return NextResponse.json({"username":"Hammad", movie});

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
