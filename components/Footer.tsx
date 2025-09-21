import { Instagram, Facebook, Twitter } from 'lucide-react' // CHANGED: Pinterest -> Twitter

export default function Footer() {
  // This will dynamically set the copyright year.
  // As of this writing in September 2025, it will display "2025".
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Logo & Newsletter Section */}
          <div className="col-span-2 lg:col-span-2">
            <a href="/" className="text-3xl font-bold tracking-wider text-primary mb-4 block">
              L'AURA
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Discover your inner confidence with our exquisitely crafted lingerie.
            </p>
            <h3 className="font-semibold text-lg mb-3">Join Our Newsletter</h3>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-background border border-border rounded-l-md px-4 py-2 focus:ring-primary focus:border-primary"
              />
              <button 
                type="submit"
                className="bg-primary text-primary-foreground font-semibold px-6 py-2 rounded-r-md hover:bg-primary/90 transition-colors"
              >
                Sign Up
              </button>
            </form>
          </div>

          {/* Navigation Sections */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">New Arrivals</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Best Sellers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Bras</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Panties</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Sleepwear</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQs</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Size Guide</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><Instagram /></a>
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors"><Facebook /></a>
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter /></a> {/* CHANGED: Pinterest -> Twitter */}
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-border/50">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} L'aura Lingerie. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

                    
