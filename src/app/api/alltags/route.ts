import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import { Tags } from "@/models/Tags";



export const GET = async () => {
  try {
    await connectToDatabase();

    // Fetch tags from the database excluding "editor_choice" and sorting by count
    const tags = await Tags.find({ label: { $ne: "editor_choice" } }).sort({ count: -1 });

    if (tags.length > 0) {
      return NextResponse.json({ tags }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: "No tags found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
};
