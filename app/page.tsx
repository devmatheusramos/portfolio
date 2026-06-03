import HomeClient from '@/components/HomeClient'
import { getAllPosts } from '@/lib/posts'

export default function Home() {
  const posts = getAllPosts()
  return <HomeClient posts={posts} />
}
