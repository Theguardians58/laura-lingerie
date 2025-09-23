import { createServerClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { AddToCartButton } from '@/components/AddToCartButton'

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const supabase = createServerClient()
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!product) {
    notFound()
  }

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="rounded-lg bg-muted flex items-center justify-center aspect-square">
             {/* In a real app, you would use next/image here */}
            <img
              src={product.image_url || `https://placehold.co/600x600/171717/f5f5f5?text=${product.name.split(' ').join('+')}`}
              alt={product.name}
              className="object-cover rounded-lg w-full h-full"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">{product.name}</h1>
            <p className="text-3xl text-primary mb-6">${product.price?.toFixed(2)}</p>
            <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>
            
            <div className="flex flex-col space-y-4">
               {/* This button will eventually need size/color selections */}
              <AddToCartButton product={product} />
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Size Guide</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>L'AURA Size Guide</DialogTitle>
                  </DialogHeader>
                  <div className="prose prose-sm dark:prose-invert">
                    {/*  */}
                    <p>Find your perfect fit. Measurements are in inches.</p>
                    <table className="w-full text-left">
                      <thead>
                        <tr>
                          <th>Size</th>
                          <th>Bust</th>
                          <th>Waist</th>
                          <th>Hips</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>XS (0-2)</td>
                          <td>32-33</td>
                          <td>24-25</td>
                          <td>34-35</td>
                        </tr>
                        <tr>
                          <td>S (4-6)</td>
                          <td>34-35</td>
                          <td>26-27</td>
                          <td>36-37</td>
                        </tr>
                        <tr>
                          <td>M (8-10)</td>
                          <td>36-37</td>
                          <td>28-29</td>
                          <td>38-39</td>
                        </tr>
                        <tr>
                          <td>L (12-14)</td>
                          <td>38-40</td>
                          <td>30-32</td>
                          <td>40-42</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
