import Link from 'next/link';
import { AddToCartButton } from './AddToCartButton';

// Define the shape of a product object for TypeScript
interface Product {
  id: number;
  name: string;
  price: number | null;
  image_url: string | null;
  slug: string | null; 
}

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[3/4] bg-muted rounded-lg"></div>
            <div className="h-4 bg-muted rounded w-3/4 mt-2"></div>
            <div className="h-4 bg-muted rounded w-1/2 mt-1"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
      {products.map((product) => (
        // --- CHANGE START: The entire card is now a link ---
        <Link key={product.id} href={`/product/${product.slug || product.id}`} className="group relative">
          <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-muted">
            <img
              src={product.image_url || 'https://placehold.co/400x533/171717/f5f5f5?text=L%27AURA'}
              alt={product.name}
              className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
             <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <AddToCartButton product={product} />
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-foreground">
                {/* This span makes the link cover the whole card for better accessibility */}
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </h3>
            </div>
            <p className="text-sm font-medium text-foreground">${product.price?.toFixed(2)}</p>
          </div>
        </Link>
        // --- CHANGE END ---
      ))}
    </div>
  );
}

        
