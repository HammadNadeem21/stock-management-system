// import {  MongoClient } from "mongodb";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   // Replace the uri string with your connection string.
//   const uri = process.env.MONGODB_URI as string;

//   const query = request.nextUrl.searchParams.get("query");
//   console.log(query, typeof query);
  

//   const client = new MongoClient(uri);

//   try {
//     const database = client.db("stock");
//     const inventory = database.collection("inventory");

//     const products = await inventory
//       .aggregate([
//         {
//           $match: {
//             $or: [
//                 { slug: { $regex: query, $options: "i" } },
//                 // { quantity: { $regex: query, $options: "i"}},
//                 // { price: { $regex: query, $options: "i"}}
//             ]
//           },
//         },
//       ])
//       .toArray();

//     return NextResponse.json({ success: true, products });
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }








import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("query");
    const client = await clientPromise;
    const database = client.db("stock");
    const inventory = database.collection("inventory");

    const products = await inventory
      .aggregate([
        {
          $match: {
            $or: [{ slug: { $regex: query, $options: "i" } }],
          },
        },
      ])
      .toArray();

    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Database error" }, { status: 500 });
  }
  
}
