import NextAuth from "next-auth";
import { authOption } from "@/utility/auth";
// Correctly define and export the handler for GET and POST methods
const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
