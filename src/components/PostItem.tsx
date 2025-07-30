'use client'

import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
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

  return (
    <article className="relative h-80 rounded-xl overflow-hidden shadow-lg group">
      {/* Image en arrière-plan */}
      <img
        src={post.image}
        alt={post.title}
        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
      />

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
        <time className="text-xs text-gray-300 mt-2">
          {format(date, 'PPP', { locale: fr })}
        </time>
      </div>
    </article>
  )
}
