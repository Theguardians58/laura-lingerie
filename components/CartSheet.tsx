"use client";

import { useCart } from "@/context/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// The CartSheet now accepts children, which will be the trigger button (the icon in the header)
export default function CartSheet({ children }: { children: React.ReactNode }) {
  const { items, removeItem, updateQuantity } = useCart();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col bg-background text-foreground">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <p className="text-sm text-muted-foreground/80">Add items to get started!</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto -mx-6 px-6">
            <ul className="divide-y divide-border">
              {items.map((item) => (
                <li key={item.id} className="flex py-4">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border">
                    <Image
                      src={item.image || "https://placehold.co/100x100/171717/FFF?text=L'AURA"}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-foreground">
                        <h3>{item.name}</h3>
                        <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center border border-border rounded-md">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 text-muted-foreground hover:bg-muted transition-colors"><Minus size={16}/></button>
                        <span className="px-3 py-1 text-foreground">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 text-muted-foreground hover:bg-muted transition-colors"><Plus size={16}/></button>
                      </div>
                      
                      <div className="flex">
                        <button onClick={() => removeItem(item.id)} type="button" className="font-medium text-primary hover:text-primary/80 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {items.length > 0 && (
           <div className="border-t border-border mt-auto -mx-6 px-6 py-6">
            <div className="flex justify-between text-base font-medium text-foreground">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">Shipping and taxes calculated at checkout.</p>
            <div className="mt-6">
              <Link href="/checkout" passHref>
                <Button className="w-full">Checkout</Button>
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

                                
