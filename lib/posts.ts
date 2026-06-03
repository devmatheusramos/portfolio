import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { Post, PostMeta } from '@/types/post'

const POSTS_DIR = path.join(process.cwd(), 'content/posts')

export function getPostSlugs(): string[] {
  return fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md')).map(f => f.replace('.md', ''))
}

export function getPostBySlug(slug: string): Post {
  const file = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), 'utf8')
  const { data, content } = matter(file)
  const { text: readTime } = readingTime(content)

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    category: data.category,
    keywords: data.keywords ?? [],
    readingTime: readTime,
    published: data.published ?? true,
    content,
  }
}

export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map(slug => {
      const { content: _, ...meta } = getPostBySlug(slug)
      return meta
    })
    .filter(p => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
