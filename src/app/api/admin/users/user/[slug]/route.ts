import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/database";
import { User } from "@/models/User";
import mongoose from "mongoose";

// Define TypeScript interface for the PUT request body
interface UserData {
  role?: string;
}

export const GET = async (req: NextRequest, { params }: { params: { slug: string } }) => {
  try {
    await connectToDatabase();

    const id = params.slug;

    // Validate the MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid ID format" }, { status: 400 });
    }

    const user = await User.findById(id);

    if (user) {
      return NextResponse.json({ user }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest, { params }: { params: { slug: string } }) => {
  try {
    const id = params.slug;

    // Validate the MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid ID format" }, { status: 400 });
    }

    const data: UserData = await req.json();

    const newUserData = {
      role: data.role,
    };

    await connectToDatabase();

    const user = await User.findByIdAndUpdate(id, newUserData, {
      new: true,
      runValidators: true,
    });

    if (user) {
      return NextResponse.json({ user, success: true }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error in PUT handler:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest, { params }: { params: { slug: string } }) => {
  try {
    const id = params.slug;

    // Validate the MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid ID format" }, { status: 400 });
    }

    await connectToDatabase();

    const user = await User.findByIdAndDelete(id);

    if (user) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error in DELETE handler:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
};
