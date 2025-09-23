// --- FIX: Import ProductGrid as a named export using curly braces ---
import { ProductGrid } from '@/components/ProductGrid';
import { createServerClient } from '@/lib/supabase/server';

export default async function ShopPage() {
  const supabase = createServerClient();
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">
        All Products
      </h1>
      <ProductGrid products={products || []} />
    </div>
  );
}

  
