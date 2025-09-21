'use server';

import { createServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addProduct(formData: FormData) {
  const supabase = createServerClient();

  // 1. Get the current user and check if they are an admin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return redirect('/login');
  }
  // In a real app, you'd check for an admin role here, e.g.:
  // const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  // if (profile?.role !== 'admin') { throw new Error('Not authorized'); }


  // 2. Parse the form data
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = parseFloat(formData.get('price') as string);
  const category_id = parseInt(formData.get('category_id') as string, 10);
  const image_url = formData.get('image_url') as string; // This will come from our client-side upload

  if (!name || !description || isNaN(price) || isNaN(category_id) || !image_url) {
    return { error: 'All fields are required.' };
  }

  // 3. Insert the new product into the database
  const { error } = await supabase.from('products').insert({
    name,
    description,
    price,
    category_id,
    image_url,
  });

  if (error) {
    console.error('Error adding product:', error);
    return { error: 'Failed to add product.' };
  }

  // 4. Revalidate paths to show the new product immediately
  revalidatePath('/');
  revalidatePath('/shop');
  revalidatePath(`/shop/all`);
  
  // 5. Redirect back to the main admin page
  redirect('/admin');
      }
