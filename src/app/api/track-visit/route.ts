import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc, increment, serverTimestamp } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { articleId } = await req.json();
    if (!articleId) {
      return NextResponse.json({ error: "Missing articleId" }, { status: 400 });
    }

    const viewRef = doc(db, "views", articleId);
    const snapshot = await getDoc(viewRef);

    if (snapshot.exists()) {
      await updateDoc(viewRef, {
        count: increment(1),
        lastVisited: serverTimestamp(),
      });
    } else {
      await setDoc(viewRef, {
        count: 1,
        createdAt: serverTimestamp(),
        lastVisited: serverTimestamp(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur dans /api/track-visit :", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
