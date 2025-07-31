'use client'

import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import Image from 'next/image'
import React from 'react'

interface PostItemProps {
  post: {
    id: string
    title: string
    content: string
    image?: string
    category?: string
    author: {
      name: string
      photoURL?: string
    }
    createdAt: { toDate: () => Date } | null
  }
}

export default function PostItem({ post }: PostItemProps) {
  const date = post.createdAt ? post.createdAt.toDate() : new Date()
  const imageUrl = post.image || '/default-post-image.jpg' // Fallback image

  return (
    <article className="relative h-80 rounded-xl overflow-hidden shadow-lg group">
      {/* Image en arrière-plan avec composant Next.js Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transform group-hover:scale-105 transition duration-500"
          priority={false}
          quality={80}
        />
      </div>

      {/* Overlay noir semi-transparent */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Contenu en overlay */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-end text-white">
        {/* Catégorie */}
        {post.category && (
          <span className="bg-white text-black text-xs px-2 py-1 rounded w-max mb-2">
            {post.category}
          </span>
        )}

        {/* Titre */}
        <h3 className="text-xl font-bold leading-tight">{post.title}</h3>

        {/* Courte description */}
        <p className="text-sm text-gray-200 mt-1 line-clamp-2">
          {post.content}
        </p>

        {/* Date */}
        <time className="text-xs text-gray-300 mt-2" dateTime={date.toISOString()}>
          {format(date, 'PPP', { locale: fr })}
        </time>
      </div>
    </article>
  )
}