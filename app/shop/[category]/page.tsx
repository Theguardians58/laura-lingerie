import { createServerClient } from '@/lib/supabase/server';
import ProductGrid from '@/components/ProductGrid';
import { notFound } from 'next/navigation';

// This tells Next.js to show a 404 page if a category doesn't exist.
export const dynamicParams = false;

// This function tells Next.js which category pages to pre-build at deploy time.
export async function generateStaticParams() {
  // We can fetch our categories from the DB or define them statically.
  // For a small number of categories, static is fine.
  const categories = ['all', 'bras', 'panties', 'sleepwear'];
  return categories.map((category) => ({
    category,
  }));
}

// Capitalize first letter for display
function capitalize(str: string) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;
  
  // Decode URI component for safety (e.g., if a category has a space)
  const decodedCategory = decodeURIComponent(category);

  const supabase = createServerClient();
  let query = supabase.from('products').select('*');

  // If the category is not 'all', filter by it.
  if (decodedCategory !== 'all') {
    // Using .ilike for case-insensitive matching
    query = query.ilike('category', decodedCategory);
  }

  const { data: products, error } = await query;

  if (error) {
    console.error('Error fetching products by category:', error);
    // You might want a more user-friendly error page here
    return <div>Error loading products. Please try again later.</div>
  }

  const pageTitle = decodedCategory === 'all' ? 'All Products' : `Shop: ${capitalize(decodedCategory)}`;

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
        {pageTitle}
      </h1>
      <ProductGrid products={products || []} />
    </div>
  );
}
