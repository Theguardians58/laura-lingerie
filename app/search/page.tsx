import { createServerClient } from '../../lib/supabase/server'
import ProductGrid from '../../components/ProductGrid'
import { Suspense } from 'react'

// This tells Next.js to re-render this page on every request.
// It's important for search results to be up-to-date.
export const dynamic = 'force-dynamic'

// Define the shape of the props, including searchParams
interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

// A simple loading component to show while searching
function SearchSkeleton() {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-16">
            <div className="h-8 w-1/3 bg-secondary rounded-md mb-8 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="h-96 bg-secondary rounded-lg animate-pulse"></div>
                <div className="h-96 bg-secondary rounded-lg animate-pulse"></div>
                <div className="h-96 bg-secondary rounded-lg animate-pulse"></div>
                <div className="h-96 bg-secondary rounded-lg animate-pulse"></div>
            </div>
        </div>
    )
}

// The main component that fetches and displays results
async function SearchResults({ query }: { query: string }) {
  const supabase = createServerClient()

  // Perform a case-insensitive search on 'name' and 'description' columns
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    
  if (error) {
    console.error('Search error:', error)
    return <p className="text-center text-destructive">Error loading products.</p>
  }
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      {products && products.length > 0 ? (
        <>
          <h1 className="text-3xl font-bold mb-8 text-foreground animate-fade-in-down">
            Search Results for "{query}"
          </h1>
          <ProductGrid products={products} />
        </>
      ) : (
        <div className="text-center animate-fade-in-up">
          <h1 className="text-3xl font-bold mb-4 text-foreground">No results found for "{query}"</h1>
          <p className="text-muted-foreground">Try a different search term or browse our categories.</p>
        </div>
      )}
    </div>
  )
}


// The main page component that Next.js will render
export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ''

  return (
    <main className="pt-20">
      <Suspense fallback={<SearchSkeleton />}>
        {query ? (
          <SearchResults query={query} />
        ) : (
          <div className="text-center py-16 animate-fade-in-up">
            <h1 className="text-3xl font-bold mb-4 text-foreground">Search our collection</h1>
            <p className="text-muted-foreground">Please enter a search term in the search bar above.</p>
          </div>
        )}
      </Suspense>
    </main>
  )
}

    
