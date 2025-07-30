'use client'

import CreatePost from "@/components/creatPost"

export default function AdminPage() {
  return (
    <main className="max-w-3xl mx-auto p-8">
        <h1 className="text-4xl mb-6">Espace Admin</h1>
        <div className="grid grid-cols-2 gap-6">
             <CreatePost />
        </div>
    </main>
  )
}
