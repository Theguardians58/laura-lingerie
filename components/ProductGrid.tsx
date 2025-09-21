import AddToCartButton from "./AddToCartButton";

// Define a type for your Product for type safety
type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  // This will be used for the product image
  image_url?: string;
};

export default function ProductGrid({ products }: { products: Product[] }) {
  // If there are no products, show the animated skeleton placeholders
  if (!products || products.length === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-secondary rounded-lg p-4 animate-pulse">
            <div className="w-full aspect-[3/4] bg-muted rounded-md mb-4"></div>
            <div className="h-4 w-3/4 bg-muted rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-muted rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  // If there are products, display them
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="group relative">
          <div className="w-full aspect-[3/4] bg-secondary rounded-lg overflow-hidden mb-2">
            <img
              src={product.image_url || 'https://placehold.co/400x533/1e1e1e/ffffff?text=L%27AURA'}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h3 className="font-semibold text-lg truncate">{product.name}</h3>
          <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
          
          {/* This div contains the button that appears on hover */}
          <div className="absolute bottom-20 left-0 right-0 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <AddToCartButton product={product} />
          </div>
        </div>
      ))}
    </div>
  );
}

            
