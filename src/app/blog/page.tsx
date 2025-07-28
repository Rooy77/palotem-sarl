//"use client";

//import { useEffect, useState } from "react";
//import { getLatestPosts, Post } from "@/lib/posts";

//export default function LatestNews() {
//  const [posts, setPosts] = useState<Post[]>([]);
  //const [loading, setLoading] = useState(true);

//  useEffect(() => {
//    getLatestPosts()
 //     .then((posts) => {
//        setPosts(posts);
 //       setLoading(false);
 //     })
  //    .catch(() => setLoading(false));
 // }, []);

  //if (loading) return <p>Chargement des actualités...</p>;
 // if (!posts.length) return <p>Aucune actualité disponible.</p>;

 // return (
  //  <section className="max-w-4xl mx-auto px-4 py-12">
   //   <h2 className="text-3xl font-bold mb-8">Latest News</h2>
    //  <ul className="space-y-6">
    //    {posts.map((post) => (
     //     <li key={post.id} className="border-b pb-4">
      //      <h3 className="text-xl font-semibold">{post.title}</h3>
     //       <p className="text-gray-700">{post.content}</p>
     //       <p className="text-gray-400 text-sm mt-1">
      //        Publié le {post.createdAt.toLocaleDateString()}
      //      </p>
    //      </li>
    //    ))}
  //    </ul>
  //  </section>
//  );
//}
