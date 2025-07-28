//import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
//import { db } from "./firebase";

//export type Post = {
 // id: string;
 // title: string;
 // content: string;
 // createdAt: Date;
//};

//export async function getLatestPosts(limitNumber = 5): Promise<Post[]> {
 // const postsCol = collection(db, "posts");
  //const q = query(postsCol, orderBy("createdAt", "desc"), limit(limitNumber));
 // const querySnapshot = await getDocs(q);

 // const posts: Post[] = [];
 // querySnapshot.forEach((doc) => {
  //  const data = doc.data();
  //  posts.push({
  //    id: doc.id,
   //   title: data.title,
    //  content: data.content,
     // createdAt: data.createdAt.toDate(),
  //  });
 // });
  //return posts;
//}
