import { Button } from "@/components/ui/button";
import ProductGrid from "@/components/ProductGrid";
import { createClient } from "@/lib/supabase/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  const supabase = createClient();

  // Fetch a few new arrivals to display on the homepage
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images (
        image_url,
        alt_text
      )
    `)
    .limit(4)
    .order('created_at', { ascending: false });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center bg-highlight">
         <div className="absolute inset-0 bg-[url('https://placehold.co/1600x900/f4e9e7/333333?text=.')] bg-cover bg-center opacity-40"></div>
         <div className="relative z-10 p-4 text-primary">
            <h1 className="text-4xl md:text-6xl font-serif mb-4">Discover Your Inner Confidence</h1>
            <p className="max-w-xl mx-auto mb-8 text-lg">Elegance and comfort, designed for the way you live.</p>
            <Button asChild size="lg" className="bg-primary text-background hover:bg-primary/90">
                <Link href="/products">Shop New Arrivals</Link>
            </Button>
         </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-serif">New Arrivals</h2>
            <Link href="/products" className="flex items-center text-primary hover:text-accent transition-colors">
              <span>View All</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          {products && <ProductGrid products={products} />}
          {error && <p className="text-red-500">Could not fetch products.</p>}
        </div>
      </section>

      {/* Featured Collections Section */}
       <section className="py-16 md:py-24 bg-highlight">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif mb-8">Our Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Collection 1 */}
                <Link href="/products?category=sleepwear" className="group relative overflow-hidden rounded-lg">
                    <img src="https://placehold.co/600x800/EFE5E1/4B3F3F?text=Sleepwear" alt="Sleepwear Collection" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-6">
                        <h3 className="text-white text-2xl font-serif">Sleepwear</h3>
                    </div>
                </Link>
                 {/* Collection 2 */}
                <Link href="/products?category=bras" className="group relative overflow-hidden rounded-lg">
                    <img src="https://placehold.co/600x800/EFE5E1/4B3F3F?text=Bras" alt="Bras Collection" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-6">
                        <h3 className="text-white text-2xl font-serif">Bras</h3>
                    </div>
                </Link>
                 {/* Collection 3 */}
                <Link href="/products?category=panties" className="group relative overflow-hidden rounded-lg">
                    <img src="https://placehold.co/600x800/EFE5E1/4B3F3F?text=Panties" alt="Panties Collection" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-6">
                        <h3 className="text-white text-2xl font-serif">Panties</h3>
                    </div>
                </Link>
            </div>
        </div>
      </section>
    </div>
  );
    }
        
