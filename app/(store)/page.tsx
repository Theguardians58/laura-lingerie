// --- FIX: Import ProductGrid as a named export using curly braces ---
import { ProductGrid } from "@/components/ProductGrid";
import { createServerClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const supabase = createServerClient();
  // Fetch the 4 most recently created products for the "New Arrivals" section
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(4);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white bg-background">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <img 
          src="https://images.pexels.com/photos/3682239/pexels-photo-3682239.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Modern lingerie flatlay"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 p-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter drop-shadow-md mb-4">
            Embrace Your Power
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl drop-shadow mb-8">
            Discover confidence in every stitch. Uncompromising comfort, unforgettable style.
          </p>
          <Link href="/shop">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3 px-8 rounded-full transition-transform transform hover:scale-105 relative group">
                Shop New Arrivals
                <span className="absolute inset-0 border-2 border-transparent rounded-full group-hover:border-primary-foreground animate-pulse"></span>
            </Button>
          </Link>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="w-full max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">New Arrivals</h2>
        <ProductGrid products={products || []} />
      </section>
    </main>
  );
}

        
