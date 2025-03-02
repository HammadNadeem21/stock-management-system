// import { MongoClient } from "mongodb";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET() {
//   // Replace the uri string with your connection string.
//   const uri = process.env.MONGODB_URI as string;

//   const client = new MongoClient(uri);

//   try {
//     const database = client.db("stock");
//     const inventory = database.collection("inventory");

//     // Query for a movie that has the title 'Back to the Future'
//     const query = {};
//     const products = await inventory.find(query).toArray();

//     return NextResponse.json({success:true, products });
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }




// // POST
// export async function POST(request: NextRequest) {


//     const body = await request.json()


//     // Replace the uri string with your connection string.
//     const uri = process.env.MONGODB_URI as string;
  
//     const client = new MongoClient(uri);
  
//     try {
//       const database = client.db("stock");
//       const inventory = database.collection("inventory");
  
//       const product = await inventory.insertOne(body);
  
//       return NextResponse.json({ product, ok:true });
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
//   }







import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const database = client.db("stock");
    const inventory = database.collection("inventory");

    const products = await inventory.find({}).toArray();

    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error(error); // ✅ Error ko log karo taake debugging easy ho
    return NextResponse.json({ success: false, message: "Database error" }, { status: 500 });
  }
}




export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const database = client.db("stock");
    const inventory = database.collection("inventory");

    const product = await inventory.insertOne(body);

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error(error); // ✅ Error ko log karo taake debugging easy ho
    return NextResponse.json({ success: false, message: "Database error" }, { status: 500 });
  }
}
