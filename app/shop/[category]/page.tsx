// --- FIX: Import ProductGrid as a named export using curly braces ---
import { ProductGrid } from '@/components/ProductGrid';
import { createServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const supabase = createServerClient();
  
  // First, find the category ID from the slug (URL-friendly name)
  const { data: categoryData } = await supabase
    .from('categories')
    .select('id, name')
    .eq('slug', params.category)
    .single();

  // If no category matches the slug in the URL, show a 404 page
  if (!categoryData) {
    notFound();
  }
  
  // Then, fetch all products that belong to that category ID
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryData.id)
    .order('created_at', { ascending: false });
    
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">
        {categoryData.name}
      </h1>
      <ProductGrid products={products || []} />
    </div>
  );
}

  
