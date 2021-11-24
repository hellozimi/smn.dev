import { NextApiRequest, NextApiResponse } from 'next'
import { getAllTIL } from '../../lib/posts'

export default function API(_: NextApiRequest, res: NextApiResponse) {
  const posts = getAllTIL()
  res.status(200).json(posts)
}
