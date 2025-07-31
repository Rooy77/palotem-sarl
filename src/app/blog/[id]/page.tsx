import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import { notFound } from "next/navigation";
import RelativeTime from "@/components/RelativeTime";

export const dynamic = 'force-static';
export const revalidate = 3600; // ISR: revalidate every hour

interface Article {
  title: string;
  category: string;
  description: string;
  content: string;
  image: string;
  createdAt?: { toDate: () => Date };
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  if (!params?.id) return {};

  try {
    const docRef = doc(db, "articles", params.id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) return {};

    const article = docSnap.data() as Article;
    
    return {
      title: article.title,
      description: article.description,
      openGraph: {
        title: article.title,
        description: article.description,
        images: [{
          url: article.image,
          width: 800,
          height: 400,
          alt: article.title,
        }],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {};
  }
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  // Validate params first
  if (!params?.id) {
    return notFound();
  }

  try {
    const docRef = doc(db, "articles", params.id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return notFound();
    }

    const article = docSnap.data() as Article;
    const date = article.createdAt?.toDate?.() || new Date();

    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Image with proper aspect ratio */}
        <div className="mb-6 aspect-video relative">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="rounded-xl shadow object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>

        <div className="mb-4">
          {article.category && (
            <span className="text-sm bg-gray-200 text-gray-800 px-2 py-1 rounded">
              {article.category}
            </span>
          )}
          <p className="text-gray-500 text-sm mt-1">
            Publié <RelativeTime date={date} />
          </p>
        </div>

        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        
        {/* Safe HTML content rendering */}
        <article 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content || article.description }}
        />
      </div>
    );
  } catch (error) {
    console.error('Error fetching article:', error);
    return notFound();
  }
}