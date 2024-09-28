import { NextApiRequest, NextApiResponse } from "next";
import { Query } from "appwrite";
import { databases  } from '../../app/appwrite'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


let promise = await databases.listDocuments(
  process.env.NEXT_PUBLIC_DATABASE_ID || '',
  "66f68154000403cdc373",
  [
      Query.limit(25)
  ]
);

  console.log(promise);
  res.status(200).json(promise);

}
