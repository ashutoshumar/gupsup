import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/database";
import { Post } from "@/models/Post";

interface PostData {
  title: string;
  description: string;
  username: string;
  userId: string;
  tags: string[];
  id: string;
}

export const GET = async (req: NextRequest) => {
  try {
    await connectToDatabase();

    // Retrieve page number from query params and parse it as a number
    let page = req.nextUrl.searchParams.get("initial");
    const pageNumber = page ? parseInt(page, 10) : 0;

    console.log("Admin route, page:", pageNumber);

    // Use MongoDB aggregation pipeline to paginate posts
    const post = await Post.aggregate([
      {
        $facet: {
          metadata: [{ $count: "totalCount" }],
          data: [
            { $sort: { updatedAt: -1 } },
            { $skip: pageNumber * 5 },
            { $limit: 5 },
          ],
        },
      },
    ]);

    if (post && post[0]) {
      return NextResponse.json(
        {
          posts: {
            post: post[0].data,
            metadata: post[0].metadata.length > 0 ? post[0].metadata[0].totalCount : 0,
          },
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ success: false }, { status: 500 });
    }
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    // Parse request body as JSON
    const data: PostData = await req.json();

    // Prepare new post data
    const newPostData = {
      title: data.title,
      description: data.description,
      username: data.username,
      userId: data.userId,
      tags: data.tags,
    };

    await connectToDatabase();

    // Update the post by ID
    const post = await Post.findByIdAndUpdate(data.id, newPostData, {
      new: true,
      runValidators: true,
    });

    if (post) {
      return NextResponse.json({ post: post, success: true }, { status: 200 });
    } else {
      return NextResponse.json({ success: false }, { status: 500 });
    }
  } catch (error) {
    console.error("Error in PUT handler:", error);
    return NextResponse.json({ success: false }, { status:500 });
  }
};
