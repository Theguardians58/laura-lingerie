import React from 'react';

// Define a type for our product data for type safety
interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  // If there are no products, show a placeholder skeleton grid
  if (!products || products.length === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-secondary aspect-[3/4] rounded-lg"></div>
            <div className="mt-2 h-4 w-3/4 bg-secondary rounded"></div>
            <div className="mt-1 h-4 w-1/4 bg-secondary rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  // If there are products, map over them and display them (this part will work later)
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
      {products.map((product) => (
        <div key={product.id} className="group relative">
          <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-200">
            {/* We will use next/image here later for optimization */}
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-cover object-center transition-transform group-hover:scale-105"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <a href={`/product/${product.id}`}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.name}
                </a>
              </h3>
            </div>
            <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;

                                        
