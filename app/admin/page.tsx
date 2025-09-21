import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-muted-foreground mb-8">
        Welcome to the admin area. Here you can manage products, orders, and more.
      </p>
      <Link href="/admin/add-product">
        <span className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90">
          + Add New Product
        </span>
      </Link>
    </div>
  );
}
