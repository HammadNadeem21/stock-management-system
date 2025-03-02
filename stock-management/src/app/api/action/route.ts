// import { MongoClient } from "mongodb";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//   const { action, slug, initialQuantity } = await request.json();
  

//   // Replace the uri string with your connection string.
//   const uri = process.env.MONGODB_URI as string;

//   const client = new MongoClient(uri);

//   try {
//     const database = client.db("stock");
//     const inventory = database.collection("inventory");
//     const filter = { slug: slug };

//     const newQuantity =
//       action == "plus"
//         ? parseInt(initialQuantity) + 1
//         : parseInt(initialQuantity) - 1;

//     const updateDoc = {
//       $set: {
//         quantity: newQuantity,
//       },
//     };
//     const result = await inventory.updateOne(filter, updateDoc);

//     return NextResponse.json({
//       success: true,
//       message: `${result.matchedCount} documents matched the filter, updated ${result.modifiedCount} documents`,
//     });
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }







import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const { action, slug, initialQuantity } = await request.json();
    const client = await clientPromise;
    const database = client.db("stock");
    const inventory = database.collection("inventory");

    const filter = { slug };
    const newQuantity = action === "plus" ? parseInt(initialQuantity) + 1 : parseInt(initialQuantity) - 1;

    const updateDoc = { $set: { quantity: newQuantity } };
    const result = await inventory.updateOne(filter, updateDoc);

    return NextResponse.json({
      success: true,
      message: `${result.matchedCount} documents matched, updated ${result.modifiedCount} documents`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Database error" }, { status: 500 });
  }
  
}
