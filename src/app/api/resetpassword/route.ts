import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';
import { User } from '@/models/User';
import bcrypt from 'bcryptjs';

export const POST = async (req: Request) => {
  try {
    // Parse request body
    const body = await req.json();
    const { token, password } = body;

    if (!token || !password) {
      return NextResponse.json({ message: 'Token and password are required' }, { status: 400 });
    }

    // Connect to the database
    await connectToDatabase();

    // Find the user by reset token
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gte: Date.now() }, // Ensure token has not expired
    });

    if (!user) {
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password and clear reset token fields
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    return NextResponse.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error in Reset Password API:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};
