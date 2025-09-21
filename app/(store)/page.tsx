import React from 'react';
import { createServerClient } from '../../lib/supabase/server';
import ProductGrid from '../../components/ProductGrid';
import { Button } from '../../components/ui/button';

export default async function HomePage() {
  const supabase = createServerClient();
  // We are keeping the product fetching logic commented out as we have no data yet.
  // const { data: products } = await supabase.from('products').select('*').limit(4);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1585254210029-9e8a5b285f20?q=80&w=2070&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-balance">
            Discover Your Inner Confidence
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-lg text-white/90 text-balance">
            Exquisite lingerie designed for the modern woman. Comfort, elegance, and sensuality in every piece.
          </p>
          <div className="mt-8">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Shop New Arrivals
            </Button>
          </div>
        </div>
      </section>
      
      

      {/* New Arrivals Section */}
      <section className="w-full max-w-7xl mx-auto px-4 py-16 sm:py-24">
        <h2 className="text-3xl font-bold text-center mb-12 tracking-tight">
          New Arrivals
        </h2>
        {/* We pass an empty array because we have no products yet. The component will handle this gracefully. */}
        <ProductGrid products={[]} />
      </section>

      {/* You can add more sections like "Best Sellers" or "Featured Collections" here */}
    </main>
  );
}

            
