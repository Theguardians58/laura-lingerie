const ProductCardPlaceholder = () => (
    <div className="bg-gray-200 rounded-lg animate-pulse">
        <div className="w-full h-64 md:h-80 bg-gray-300 rounded-t-lg"></div>
        <div className="p-4">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        </div>
    </div>
);

const ProductGrid = ({ title }: { title: string }) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {/* We'll just show placeholders for now */}
          <ProductCardPlaceholder />
          <ProductCardPlaceholder />
          <ProductCardPlaceholder />
          <ProductCardPlaceholder />
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
        
