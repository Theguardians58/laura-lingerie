// --- FIX: Use relative paths instead of aliases ---
import { Button } from "../../components/ui/button";
import ProductGrid from "../../components/ProductGrid";
import { createClient } from "../../lib/supabase/server";

export default async function HomePage() {
  const supabase = createClient();
  // Example of fetching data in a Server Component
  // const { data: products } = await supabase.from('products').select('*').limit(4);

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full h-[60vh] md:h-[80vh] bg-gray-200 flex items-center justify-center relative">
        {/* Replace with a high-quality <Image /> component */}
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="z-10 text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Discover Your Inner Confidence
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">
            Exquisite lingerie designed to make you feel beautiful, powerful, and unapologetically you.
          </p>
          <Button size="lg" className="mt-8">
            Shop New Arrivals
          </Button>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="w-full max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">New Arrivals</h2>
        {/* Pass the fetched products to the grid */}
        <ProductGrid products={[]} />
      </section>

       {/* Best Sellers */}
       <section className="w-full bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-8">Best Sellers</h2>
          <ProductGrid products={[]} />
        </div>
       </section>
    </div>
  );
}

          
