import { db } from "@/lib/firebase"; // ton instance Firebase
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(req: Request) {
  const data = await req.json();

  try {
    await addDoc(collection(db, "posts"), {
      ...data,
      createdAt: serverTimestamp(), // 🔥 ceci est crucial
    });

    return new Response(JSON.stringify({ message: "Post added" }), { status: 200 });
  } catch (error) {
    console.error("Error adding post:", error);
    return new Response(JSON.stringify({ error: "Error adding post" }), { status: 500 });
  }
}
