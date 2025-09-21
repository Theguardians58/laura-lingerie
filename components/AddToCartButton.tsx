"use client"

import { useCart } from "../context/CartContext"
import { Button } from "./ui/button"
import { ShoppingBag } from "lucide-react"

// Define a type for the Product for better code safety
type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  // Assuming you'll have an image URL from your database
  image_url?: string;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    // This function creates the item object that will be added to the cart
    const itemToAdd = {
      id: `${product.id}`, // A unique ID for the cart item, based on the product ID
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1, // Add one item at a time
      image: product.image_url || 'https://placehold.co/100x120/f0f0f0/a0a0a0?text=L%27AURA',
    }
    addItem(itemToAdd)
  }

  return (
    <Button 
      onClick={handleAddToCart} 
      variant="secondary"
      className="w-full"
    >
      <ShoppingBag className="mr-2 h-4 w-4" />
      Add to Cart
    </Button>
  )
}

