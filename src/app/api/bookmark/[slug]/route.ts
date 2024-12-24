import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import { BookMark } from "@/models/BookMark";
import { Post } from "@/models/Post";
import { getServerSession } from "next-auth";
import { authOption } from "../../auth/[...nextauth]/route";
import mongoose from "mongoose";


export const GET = async (
  req: NextRequest,
  { params }: { params: { slug: string } }
) => {
  const id = params.slug;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, message: "Invalid ID format" }, { status: 400 });
  }
  // Retrieve session
  const session = await getServerSession(authOption);

  if (session && session.user) {
    const userId = session.user.id;

    // Connect to the database
    await connectToDatabase();

    try {
      // Check if the user has already bookmarked the post
      const existingBookMark = await BookMark.findOne({
        userId: new mongoose.Types.ObjectId(userId),
        postId: new mongoose.Types.ObjectId(id),
      });

      if (existingBookMark) {
        return NextResponse.json(
          { message: "You bookmarked it", success: true },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { message: "Not found", success: false },
        { status: 404 }
      );
    } catch (error) {
      console.error("Error in GET handler:", error);
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

export const POST = async (
  req: NextRequest,
  { params }: { params: { slug: string } }
) => {
  const id = params.slug;

  // Retrieve session
  const session = await getServerSession(authOption);
  console.log("Session:", session);

  if (session && session.user) {
    const userId = session.user.id;

    // Connect to the database
    await connectToDatabase();

    try {
      // Check if the user has already bookmarked the post
      const existingBookMark = await BookMark.findOne({
        userId: new mongoose.Types.ObjectId(userId),
        postId: new mongoose.Types.ObjectId(id),
      });

      if (existingBookMark) {
        // Remove the bookmark
        await BookMark.findOneAndDelete({
          userId: new mongoose.Types.ObjectId(userId),
          postId: new mongoose.Types.ObjectId(id),
        });

        // Decrement the bookmarks count in the post
        await Post.findByIdAndUpdate(id, { $inc: { bookmarksCount: -1 } });

        return NextResponse.json(
          { message: "Bookmark removed", success: true },
          { status: 200 }
        );
      }

      // Create a new bookmark
      await BookMark.create({
        userId: new mongoose.Types.ObjectId(userId),
        postId: new mongoose.Types.ObjectId(id),
      });

      // Increment the bookmarks count in the post
      await Post.findByIdAndUpdate(id, { $inc: { bookmarksCount: 1 } });

      return NextResponse.json(
        { message: "Bookmarked", success: true },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error in POST handler:", error);
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
