import 'next-auth';
import mongoose from "mongoose";

declare module 'next-auth' {
  interface User {
    name: string;
  email: string;
  about: string|null;
  id: string;
  picture?: { url: string };
  role: string; }

  interface Session {
    user: User;
  }
}