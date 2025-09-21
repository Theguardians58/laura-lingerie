import ProductGrid from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { createServerClient } from "@/lib/supabase/server";
import Link from "next/link"; // Import the Link component

export default async function HomePage() {
  const supabase = createServerClient();
  
  // Fetch the 4 newest products for the "New Arrivals" section
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(4);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img 
          src="https://images.pexels.com/photos/7760447/pexels-photo-7760447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Modern lingerie flatlay"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 p-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-md">
            Unleash Your Power
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl drop-shadow-sm">
            Luxury lingerie designed for the modern muse. Confidence, redefined.
          </p>
          <Link href="/shop"> {/* This is the link we added */}
            <Button size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 rounded-full shadow-lg transition-transform hover:scale-105">
              Shop New Arrivals
            </Button>
          </Link>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="w-full max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">New Arrivals</h2>
        <ProductGrid products={products || []} />
      </section>
    </main>
  );
}

            
