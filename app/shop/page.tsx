import ProductGrid from "@/components/ProductGrid";
import { createServerClient } from "@/lib/supabase/server";

export default async function ShopPage() {
  const supabase = createServerClient();
  
  // Fetch all products, ordered by the newest first
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    // You could return a dedicated error component here
    return <p className="text-center text-destructive">Could not load products. Please try again later.</p>;
  }

  return (
    <main className="w-full max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Discover The Collection
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Explore our latest arrivals and timeless classics, designed with you in mind.
        </p>
      </div>
      
      <ProductGrid products={products || []} />
    </main>
  );
      }
    
