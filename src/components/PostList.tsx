'use client'

import { useEffect, useState } from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import PostItem from './PostItem'

interface Post {
  id: string
  title: string
  content: string
  author: {
    name: string
    photoURL?: string
  }
  createdAt: {
    toDate: () => Date
  } | null // nullable car parfois timestamp peut manquer
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    if (!db) return

    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData: Post[] = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        postsData.push({
          id: doc.id,
          title: data.title,
          content: data.content,
          author: data.author,
          createdAt: data.createdAt || null,
        })
      })
      setPosts(postsData)
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="space-y-6">
      {posts.length === 0 ? (
        <p className="text-gray-500">Aucun article pour le moment...</p>
      ) : (
        posts.map((post) => <PostItem key={post.id} post={post} />)
      )}
    </div>
  )
}
