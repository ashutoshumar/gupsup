import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import { BookMark } from "@/models/BookMark";
import { getServerSession } from "next-auth";
import { authOption } from "@/utility/auth";



export const GET = async (req: NextRequest) => {
  const session = await getServerSession(authOption);

  if (session && session.user) {
    const userId = session.user.id;

    // Connect to the database
    await connectToDatabase();

    try {
      // Fetch bookmarks for the user and populate the `postId` field
      const bookMarkedPosts = await BookMark.find({ userId })
        .populate("postId") // Populate the `postId` field with the actual Post document
        .exec();

      if (bookMarkedPosts.length > 0) {
        // Extract posts from the bookmarks
        const posts = bookMarkedPosts.map((bookmark) => bookmark.postId);

        console.log(posts); // Debugging: log the fetched posts
        return NextResponse.json({ posts, success: true }, { status: 200 });
      }

      return NextResponse.json({ message: "No bookmarks found", success: false }, { status: 404 });
    } catch (error) {
      console.error("Error fetching bookmarked posts:", error);
      return NextResponse.json(
        { success: false, message: "Internal Server Error" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
};
