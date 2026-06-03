export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  category: string
  keywords: string[]
  readingTime: string
  published: boolean
}

export interface Post extends PostMeta {
  content: string
}
