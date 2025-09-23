// --- FIX: Import ProductGrid as a named export using curly braces ---
import { ProductGrid } from '../../components/ProductGrid';
import { createServerClient } from '../../lib/supabase/server';

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const query = searchParams?.query as string || '';
  const supabase = createServerClient();

  let products = [];
  if (query) {
    // Using textSearch for a more robust search against product names and descriptions
    const { data } = await supabase
      .from('products')
      .select('*')
      .textSearch('name', `'${query}'`); // Using textSearch is often better for user queries
    products = data || [];
  }

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">
        {query ? `Search results for "${query}"` : 'Begin your search'}
      </h1>
      
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <p className="text-muted-foreground">
          {query ? 'No products were found matching your search.' : 'Please type a term into the search bar to find products.'}
        </p>
      )}
    </div>
  );
}

          
