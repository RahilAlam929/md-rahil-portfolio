import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");

    const collections = await db.listCollections().toArray();

    return NextResponse.json({
      ok: true,
      message: "MongoDB connected successfully",
      collections: collections.map((c) => c.name),
    });

  } catch (error: any) {
    console.error("DB TEST ERROR:", error);

    return NextResponse.json({
      ok: false,
      error: error.message,
    });
  }
}