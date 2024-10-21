import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/auth-options"

export function auth() {
  return getServerSession(authOptions)
}
