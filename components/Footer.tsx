import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t mt-12 py-8">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
        <div>
          <h3 className="font-bold mb-2">Shop</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link href="/products" className="hover:underline">New Arrivals</Link></li>
            <li><Link href="/products" className="hover:underline">Best Sellers</Link></li>
            <li><Link href="/products" className="hover:underline">All Products</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">About Us</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link href="/about" className="hover:underline">Our Story</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Support</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
            <li><Link href="/shipping" className="hover:underline">Shipping & Returns</Link></li>
            <li><Link href="/sizing" className="hover:underline">Size Guide</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <Link href="#" className="text-gray-500 hover:text-black">Instagram</Link>
            <Link href="#" className="text-gray-500 hover:text-black">Facebook</Link>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 mt-8 border-t pt-4">
        © {new Date().getFullYear()} L'Aura Lingerie. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
                  
