import Link from 'next/link';
import { createServerClient } from '../../lib/supabase/server';
import ProductGrid from '../../components/ProductGrid';
import { Button } from '../../components/ui/button';

export default async function HomePage() {
  const supabase = createServerClient();
  // We are keeping the product fetching logic for when you add products later.
  // const { data: products } = await supabase.from('products').select('*').limit(4);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center text-center text-white overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/7760438/pexels-photo-7760438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
          }}
        />
        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />

        {/* Content */}
        <div className="relative z-20 px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter uppercase text-shadow-lg animate-fade-in-down">
            Unleash Your Power
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80 animate-fade-in-up">
            Confidence, redefined. Discover pieces that celebrate every curve and empower every moment.
          </p>
          <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <Button asChild size="lg" className="bg-primary text-primary-foreground font-bold text-lg px-10 py-6 rounded-full shadow-lg shadow-primary/30 hover:scale-105 hover:shadow-primary/50 transition-all duration-300">
              <Link href="/collections/new-arrivals">Shop New Arrivals</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* New Arrivals Section - styled for the new theme */}
      <section className="w-full max-w-7xl mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">
          Discover What's New
        </h2>
        {/* The ProductGrid will show skeleton loaders, which will look great on the dark theme */}
        <ProductGrid products={[]} />
      </section>
    </main>
  );
}

        
