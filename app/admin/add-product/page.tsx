import { createServerClient } from '@/lib/supabase/server';
import AddProductForm from './AddProductForm';

// This server component fetches the categories to pass to the form
export default async function AddProductPage() {
  const supabase = createServerClient();
  const { data: categories } = await supabase.from('categories').select('id, name');

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Add New Product</h1>
      <AddProductForm categories={categories || []} />
    </div>
  );
}
