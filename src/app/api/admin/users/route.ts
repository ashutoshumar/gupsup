import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/database";
import { User } from "@/models/User";
import mongoose from "mongoose";

// Define the interface for the PUT request body
interface UserData {
  id: string;
  title?: string;
  description?: string;
  username?: string;
  userId?: mongoose.Types.ObjectId;
  tags?: string[];
}



export const GET = async (req: NextRequest) => {
  try {
    await connectToDatabase();

    // Get page number from query parameters
    let page: string | null = req.nextUrl.searchParams.get("initial");
    const pageNumber = page ? parseInt(page, 10) : 0;

    console.log("Admin route, page:", pageNumber);

    // Use aggregation to fetch users with pagination
    const user = await User.aggregate([
      {
        $facet: {
          metadata: [{ $count: "totalCount" }],
          data: [
            { $sort: { dAt: -1 } },
            { $skip: pageNumber * 10 },
            { $limit: 10 },
          ],
        },
      },
    ]);

    if (user.length > 0 && user[0]?.metadata.length > 0) {
      console.log("Admin count:", user[0].metadata[0].totalCount);
      return NextResponse.json(
        {
          users: {
            user: user[0].data,
            metadata: user[0].metadata[0].totalCount,
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
    const data: UserData = await req.json();

    const newUserData = {
      title: data.title,
      description: data.description,
      username: data.username,
      userId: data.userId,
      tags: data.tags,
    };

    await connectToDatabase();

    //  the user document by ID
    const user = await User.findByIdAndUpdate(data.id, newUserData, {
      new: true,
      runValidators: true,
    });

    if (user) {
      return NextResponse.json({ user: user, success: true }, { status: 200 });
    } else {
      return NextResponse.json({ success: false }, { status: 500 });
    }
  } catch (error) {
    console.error("Error in PUT handler:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
};
