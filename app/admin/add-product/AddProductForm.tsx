"use client"

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client'; // The BROWSER client
import { addProduct } from '@/app/auth/admin-actions';
import { useRouter } from 'next/navigation';

interface Category {
  id: number;
  name: string;
}

interface AddProductFormProps {
  categories: Category[];
}

export default function AddProductForm({ categories }: AddProductFormProps) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);
    
    const supabase = createClient();
    const filePath = `public/${Date.now()}_${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (uploadError) {
      setUploadError('Image upload failed. Please try again.');
      console.error('Upload Error:', uploadError);
      setIsUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    setImageUrl(data.publicUrl);
    setIsUploading(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    // Check if image is uploaded
    if (!imageUrl) {
      setFormError('Please upload an image before submitting.');
      return;
    }
    
    setFormError(null);
    const result = await addProduct(formData);

    if (result?.error) {
      setFormError(result.error);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formError && <p className="text-red-500">{formError}</p>}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">Product Name</label>
        <input type="text" name="name" id="name" required className="mt-1 block w-full bg-input rounded-md border-border shadow-sm p-2" />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-muted-foreground">Description</label>
        <textarea name="description" id="description" rows={4} required className="mt-1 block w-full bg-input rounded-md border-border shadow-sm p-2"></textarea>
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-muted-foreground">Price</label>
        <input type="number" name="price" id="price" step="0.01" required className="mt-1 block w-full bg-input rounded-md border-border shadow-sm p-2" />
      </div>
      
      <div>
        <label htmlFor="category_id" className="block text-sm font-medium text-muted-foreground">Category</label>
        <select name="category_id" id="category_id" required className="mt-1 block w-full bg-input rounded-md border-border shadow-sm p-2">
          <option value="">Select a category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-muted-foreground">Product Image</label>
        <input type="file" onChange={handleFileChange} accept="image/*" className="mt-1 block w-full text-sm" />
        {isUploading && <p className="text-sm text-muted-foreground mt-2">Uploading...</p>}
        {uploadError && <p className="text-sm text-red-500 mt-2">{uploadError}</p>}
        {imageUrl && (
          <div className="mt-4">
            <p className="text-sm text-green-500">Image uploaded successfully!</p>
            <img src={imageUrl} alt="Uploaded product" className="mt-2 h-32 w-32 object-cover rounded-md" />
            <input type="hidden" name="image_url" value={imageUrl} />
          </div>
        )}
      </div>

      <button 
        type="submit" 
        disabled={isUploading || !imageUrl}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed"
      >
        Add Product
      </button>
    </form>
  );
                                  }
      
