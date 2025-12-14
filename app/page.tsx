import { getAllPosts, getAllCategories } from '@/lib/posts';
import HomePage from '@/components/HomePage';

export default function Home() {
  const allPosts = getAllPosts();
  const categories = getAllCategories();

  return <HomePage initialPosts={allPosts} categories={categories} />;
}
