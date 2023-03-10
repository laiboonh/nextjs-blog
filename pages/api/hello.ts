import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  console.log(session)

  if (session) {
    res.status(200).json({ text: "Hello" });
  } else {
    res.status(401).json({
      error: "You must be signed in to view the protected content on this page.",
    })
  }

}
