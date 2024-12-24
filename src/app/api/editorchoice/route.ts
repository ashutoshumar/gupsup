import { NextRequest, NextResponse } from "next/server";
import { Post } from "@/models/Post";
import { connectToDatabase } from "@/lib/database";


export const GET = async (req: NextRequest) => {
  try {
    await connectToDatabase();

    // Get the `limit` query parameter and parse it
    let limit = req.nextUrl.searchParams.get("limit");
    const parsedLimit: number = limit ? parseInt(limit, 10) : 10; // Default to 10 if limit is not provided

    // Perform aggregation
    const post = await Post.aggregate([
      {
        $facet: {
          metadata: [{ $count: "totalCount" }],
          data: [
            {
              $match: {
                tags: {
                  $elemMatch: { label: "editor_choice" },
                },
              },
            },
            { $sort: { updatedAt: -1 } },
            { $limit: parsedLimit },
          ],
        },
      },
    ]);

    // Check if data exists in the aggregation result
    if (post && post.length > 0 && post[0].data.length > 0) {
      return NextResponse.json({ data: post[0].data }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: "No posts found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
