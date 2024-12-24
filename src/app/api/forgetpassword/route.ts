import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';
import { User } from '@/models/User';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export const POST = async (req: Request) => {
  try {
    // Parse the request body
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    // Connect to the database
    await connectToDatabase();

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Generate reset token and expiry
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600 * 1000; // 1 hour from now

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // Send email with the reset link
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link is valid for 1 hour.</p>`,
    });

    return NextResponse.json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Error in Forgot Password API:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};
